import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CapturePage } from './capture';

@NgModule({
  declarations: [
    CapturePage,
  ],
  imports: [
    IonicPageModule.forChild(CapturePage),
  ],
})
export class CapturePageModule {}
