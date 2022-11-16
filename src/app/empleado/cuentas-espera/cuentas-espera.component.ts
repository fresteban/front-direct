import { Component, OnInit } from '@angular/core';
import { Carro } from 'src/app/interfaces/carro';
import { CarroService } from 'src/app/services/carro.service';


@Component({
  selector: 'app-cuentas-espera',
  templateUrl: './cuentas-espera.component.html',
  styleUrls: ['./cuentas-espera.component.scss']
})
export class CuentasEsperaComponent implements OnInit {
  listaCarros: Carro[]=[];

  constructor(private _carroService: CarroService) { }

  ngOnInit(): void {
    this.obtenerCarros();

  }

  obtenerCarros() {
    this._carroService.getCarros().subscribe(data => {
      data.forEach(element => {
        if (element.estado==="espera"){
          this.listaCarros.push(element);
        }

      });
    }, error => {
      console.log(error);
    })
  }

}

