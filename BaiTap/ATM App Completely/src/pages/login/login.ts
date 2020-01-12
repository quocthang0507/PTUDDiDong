import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { Account } from '../../Models/Account';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	username: string;
	password: string;
	success: boolean;
	toast: Toast;

	constructor(public nav: NavController, public toastController: ToastController, public storage: Storage, public alertCtrl: AlertController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	login() {
		this.success = GlobalProvider.model.login(this.username, this.password);
		if (this.success) {
			console.log('Login: ' + this.username + " login successfully");
			this.storage.set('login', 'on');
			this.storage.set('user', this.username);
			GlobalProvider.model.setCurrentAccount(this.username);
			this.nav.setRoot(HomePage);
		}
		else {
			console.log("Login: Login failed");
			this.storage.set('login', 'off');
			this.toast = this.toastController.create({
				message: 'Login failed',
				duration: 2000,
				position: 'bottom'
			});
			this.toast.present();
		}
	}

	add() {
		let result = GlobalProvider.model.add(new Account(this.username, this.password, 1000000));
		if (result)
			this.showAlert('Đã thêm ' + this.username, 'Kết quả');
		else
			this.showAlert('Tài khoản ' + this.username + ' đã có sẵn', 'Kết quả');
	}

	delete() {
		let result = GlobalProvider.model.removeAccount(this.username);
		if (result)
			this.showAlert('Tài khoản ' + this.username + ' đã được xóa', 'Kết quả');
		else
			this.showAlert('Không thể xóa tài khoản ' + this.username + ' vì không tim thấy', 'Kết quả');
	}

	view() {
		let message: string = '<ol>';
		let result = GlobalProvider.model.getAllAccounts();
		result.forEach(name => {
			message += '<li>' + name + '</li>';
		});
		message += '</ol>';
		this.showAlert(message, 'Tất cả tài khoản');
	}

	showAlert(message: string, title: string) {
		let alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: [
				{
					text: 'OK',
					role: 'ok',
					handler: () => {
						console.log('Alert login: OK clicked');
					}
				}
			]
		});
		alert.present();
	}
}
