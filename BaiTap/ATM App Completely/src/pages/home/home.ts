import { Component, Output, EventEmitter, Injectable } from '@angular/core';
import { LoginPage } from '../login/login';
import { BalancePage } from '../balance/balance';
import { DepositPage } from '../deposit/deposit';
import { TransferPage } from '../transfer/transfer';
import { WithdrawPage } from '../withdraw/withdraw';
import { CapturePage } from '../capture/capture';
import { MapPage } from '../map/map';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { NavController, Platform } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
})

export class HomePage {
	loginPage = LoginPage;
	id = '';

	constructor(public nav: NavController, public platform: Platform, public storage: Storage) {
		console.log('Home: Home created');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
		this.storage.get('login').then((result) => {
			// Haven't logged in
			if (!result || result != 'on') {
				console.log('Home: You haven\'t logged in, so I move to Login page');
				this.nav.setRoot(LoginPage);
			}
			else {
				//Have logged in
				console.log('Home: Logged in');
				this.storage.get('user').then((r) => {
					if (r) {
						GlobalProvider.model.setCurrentAccount(r);
						this.id = r;
					}
				});
			}
		});
	}

	goToBalance() {
		this.nav.push(BalancePage);
	}

	backToLogin() {
		this.nav.setRoot(LoginPage);
	}

	exit() {
		this.storage.set('login', 'off');
		console.log('Home: Logged out');
		this.platform.exitApp();
	}

	goToWithdraw() {
		this.nav.push(WithdrawPage);
	}

	goToDeposit() {
		this.nav.push(DepositPage);
	}

	goToTransfer() {
		this.nav.push(TransferPage);
	}

	goToCapture() {
		this.nav.push(CapturePage);
	}

	goToMap() {
		this.nav.push(MapPage);
	}
}