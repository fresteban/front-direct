import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';




@NgModule({
  declarations: [
    SidebarComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class CompartidoModule { }
