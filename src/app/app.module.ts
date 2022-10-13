import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './carta/cliente/cliente.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { CompartidoModule } from './compartido/compartido.module';
import { CartaModule } from './carta/carta.module';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    CarritoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CartaModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '',component:ClienteComponent},
      {path: 'admin',component:AdminMainPageComponent},
      {path: 'carrito',component:CarritoComponent},
      {path: '**',redirectTo:'/',pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
