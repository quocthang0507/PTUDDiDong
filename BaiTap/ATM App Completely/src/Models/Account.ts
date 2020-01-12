import { Injectable } from "@angular/core";

@Injectable()
//Model: Account class
export class Account {
    accountNo: string;
    password: string;
    amount: number;

    constructor(accountNo, password, amount) {
        this.accountNo = accountNo;
        this.password = password;
        this.amount = amount;
    }

    public checkLogin(accountNo: string, password: string) {
        return this.accountNo == accountNo && this.password == password;
    }

    public getAccountNo() {
        return this.accountNo;
    }

    public getAmount() {
        return this.amount;
    }

    public getPassword() {
        return this.password;
    }
}