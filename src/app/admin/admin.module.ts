import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMainPageComponent } from './admin-main-page/admin-main-page.component';
import { ItemTableComponent } from './item-table/item-table.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    AdminMainPageComponent,
    ItemTableComponent,
    ModalComponent
  ],
  exports: [
    AdminMainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminModule { }
