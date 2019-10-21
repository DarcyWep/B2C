import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareHeaderComponent } from './share-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShareHeaderComponent],
  exports: [ShareHeaderComponent]
})
export class ShareHeaderModule { }
