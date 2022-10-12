import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CarritoComponent } from './carrito/carrito.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    CarritoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '',component:HomeComponent},
      {path: 'cliente',component:ClienteComponent},
      {path: 'admin',component:AdminMainPageComponent},
      {path: 'carrito',component:CarritoComponent},
      {path: '**',redirectTo:'/',pathMatch:'full'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
