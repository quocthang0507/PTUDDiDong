import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { BalancePage } from '../pages/balance/balance';
import { DepositPage } from '../pages/deposit/deposit';
import { TransferPage } from '../pages/transfer/transfer';
import { WithdrawPage } from '../pages/withdraw/withdraw';
import { CapturePage } from '../pages/capture/capture';
import { MapPage } from '../pages/map/map';
import { GlobalProvider } from '../providers/global/global';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		BalancePage,
		DepositPage,
		TransferPage,
		WithdrawPage,
		CapturePage,
		MapPage,
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot(),
		HttpModule,
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		BalancePage,
		DepositPage,
		TransferPage,
		WithdrawPage,
		CapturePage,
		MapPage,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		GlobalProvider,
		Camera,
		Geolocation,
	]
})
export class AppModule { }
