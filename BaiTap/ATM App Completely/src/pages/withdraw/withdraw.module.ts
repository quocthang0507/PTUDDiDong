import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WithdrawPage } from './withdraw';

@NgModule({
	declarations: [
		WithdrawPage,
	],
	imports: [
		IonicPageModule.forChild(WithdrawPage),
	],
})
export class WithdrawPageModule { }
