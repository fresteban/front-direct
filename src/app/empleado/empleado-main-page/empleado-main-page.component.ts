import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from 'src/app/compartido/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleado-main-page',
  templateUrl: './empleado-main-page.component.html',
  styleUrls: ['./empleado-main-page.component.scss']
})
export class EmpleadoMainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
