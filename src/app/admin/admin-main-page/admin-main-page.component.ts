import { Component, OnInit } from '@angular/core';
import { ItemTableComponent } from '../item-table/item-table.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-main-page',
  templateUrl: './admin-main-page.component.html',
  styleUrls: ['./admin-main-page.component.scss']
})
export class AdminMainPageComponent implements OnInit {

  constructor(public _authService: AuthService) { }


  ngOnInit() {
  }



}
