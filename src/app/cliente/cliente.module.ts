import { CarritoComponent } from './carrito/carrito.component';
import { CartaComponent } from './carta/carta.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: '',component:CartaComponent},
      {path: '**',redirectTo:'/',pathMatch:'full'},
    ])
  ]
})
export class ClienteModule { }
