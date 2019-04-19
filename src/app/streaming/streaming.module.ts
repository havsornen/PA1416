import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StreamingPage } from './streaming.page';
// import { Camera, CameraOriginal } from '@ionic-native/camera';
// class CameraMock extends CameraOriginal {
//   getPicture(options) {
//     return new Promise((resolve, reject) => {
//       resolve("BASE_64_ENCODED_DATA_GOES_HERE");
//     })
//   }
// }
const routes: Routes = [
  {
    path: '',
    component: StreamingPage
  }
];




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StreamingPage]
})
export class StreamingPageModule {}
