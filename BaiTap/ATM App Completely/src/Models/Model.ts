import { Account } from "./Account";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Platform } from "ionic-angular";
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
//Model: To communicate with storage and server
export class Model {
    private list: Account[] = [];
    private current: Account;
    private urlPHP: string = 'http://localhost:81/atmData.php';

    constructor(public storage: Storage, public platform: Platform, public http: Http) {
        console.log('Model: Model created');
        this.storage.get('user').then((r) => {
            if (r) {
                this.setCurrentAccount(r);
            }
        });
    }

    start() {
        this.getDataFromStorage().then(result => {
            if (result != null) {
                let temp = JSON.parse(result);
                this.list = [];
                temp.forEach(element => {
                    this.list.push(new Account(element.accountNo, element.password, element.amount));
                });
            }
        });
        this.getDataFromServer();
        this.add(new Account("laquocthang", "1234", 100000)); //Default account
    }

    public getDataFromStorage(): Promise<any> {
        console.log('Model: Read data from storage successfully');
        return this.storage.get('list');
    }

    public removeDataFromStorage(): Promise<any> {
        console.log('Model: Remove data from storage successfully');
        return this.storage.remove('list');
    }

    public saveDataToStorage() {
        this.storage.set('list', JSON.stringify(this.list));
        console.log('Model: Save data to storage successfully');
    }

    public getDataFromServer() {
        let url = this.urlPHP;
        this.http.get(url, {}).map(result => result.json()).subscribe(response => {
            //Response
            if (response.accounts != '') {
                let t = JSON.parse(response.accounts);
                t.forEach(element => {
                    this.add(new Account(element.accountNo, element.password, element.amount));
                });
            }
            console.log('Model: Get data from server successfully');
        },
            error => {
                console.log(error.message);
            });
    }

    public saveDataToServer() {
        let url = this.urlPHP;
        let params = "accounts=" + JSON.stringify(this.list);
        let header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
        this.http.post(url, params, { headers: header }).map(res => res.json()).subscribe(response => {
            console.log(response.message);
            console.log("Model: Save data to server successfully");
        },
            error => {
                console.log(error.message);
            }
        );
    }

    public login(accountNo: string, password: string) {
        console.log('Model: Checking login info...');
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].checkLogin(accountNo, password)) {
                this.current = this.list[i];
                this.storage.set('user', this.current.accountNo); //The user have logged in.
                return true;
            }
        }
        return false;
    }

    //Find and return a user account
    public find(accountNo: string) {
        console.log('Model: Looking for account...');
        for (let i = 0; i < this.list.length; i++) {
            if ((this.list[i] as Account).getAccountNo() == accountNo) {
                console.log('Model: Found user');
                return this.list[i];
            }
        }
        console.log('Model: Not found user');
        return null;
    }

    public getAccountNo() {
        return this.current.getAccountNo();
    }

    public getAmount() {
        return this.current.getAmount();
    }

    public setCurrentAccount(accountNo: string) {
        this.current = this.find(accountNo);
    }

    public getAllAccounts() {
        let result: string[] = [];
        console.log('Model: Getting all account names');
        this.list.forEach(account => {
            result.push(account.getAccountNo());
        });
        return result;
    }

    public add(account: Account) {
        let success: Boolean;
        if (this.find(account.getAccountNo()) == null) {
            this.list.push(account);
            console.log('Model: I will add new account because there are no existing same account');
            success = true;
        }
        else {
            console.log('Model: I won\'t add new account because there are existing account');
            success = false;
        }
        console.log('Model: # users: ' + this.list.length);
        this.saveDataToStorage();
        this.saveDataToServer();
        return success;
    }

    public removeAccount(accountNo: string) {
        let account: Account = this.find(accountNo);
        if (account == null) {
            console.log('Model: Not found customer so I don\'t remove it');
            return false;
        }
        let index: number = this.list.indexOf(account, 0);
        this.list.splice(index, 1);
        console.log('Model: Remove customer with accountNo = ' + accountNo);
        this.saveDataToStorage();
        this.saveDataToServer();
        return true;
    }

}
