import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'cristian',
    apellido: 'carrillo',
    correo: 'cristiancarrillo311087@gmail.com',
    pais: '',
  };

  paises: any[];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {
    // Here is donde se dispara la petición http, para obetener la información de los paises

    this.paisService.getPaises().subscribe((paises) => {
      // console.log(paises);
      this.paises = paises;
      console.log(this.paises);

      this.paises.unshift({
        nombre: '[Selecciones un pais]',
        codigo: '',
      });
    });
  }

  guardar(forma: NgForm) {
    // console.log(forma);
    // señalar error en los campos a la hora de guardar sin completar los campos
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        // console.log(control);
        control.markAsTouched();
      });
      return;
    }

    console.log(forma.value);
  }
}
