import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';

//componentes
import { AdminMainPageComponent } from './admin/admin-main-page/admin-main-page.component';

const routes: Routes = [
  {path: '', component: AdminMainPageComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
