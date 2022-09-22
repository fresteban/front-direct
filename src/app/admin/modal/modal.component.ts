import { Component, OnInit } from '@angular/core';
import { bootstrapApplication} from '@angular/platform-browser';

declare var window:any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  title = 'ang13-bootstrap5-modal-demo';
  formModal: any;
  

  constructor() { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }
  

  openModal(){
    this.formModal.show();
  }
  save(){
    this.formModal.hide();
  }
 
}
