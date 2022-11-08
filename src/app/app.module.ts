import { EmpleadoMainPageComponent } from './empleado/empleado-main-page/empleado-main-page.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartaComponent } from './cliente/carta/carta.component';
import { CarritoComponent } from './cliente/carrito/carrito.component';
import { NavbarComponent } from './compartido/navbar/navbar.component';

import { RouterModule } from '@angular/router';
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';
import { CompartidoModule } from './compartido/compartido.module';
import { ClienteModule } from './cliente/cliente.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CocinaModule } from './cocina/cocina.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { UsuarioModule } from './usuario/usuario.module';
import { LoginComponent } from './usuario/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    CarritoComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    CompartidoModule,
    ClienteModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: '',component:CartaComponent},
      {path: 'admin',component:AdminMainPageComponent},
      {path: 'empleado',component:EmpleadoMainPageComponent},
      {path: '**',redirectTo:'/',pathMatch:'full'},
    ]),
    NgbModule,
    CocinaModule,
    EmpleadoModule,
    UsuarioModule,
    CompartidoModule
  ],
  providers: [
    CookieService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
