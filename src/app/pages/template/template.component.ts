import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  };

  constructor() {}

  ngOnInit(): void {}

  guardar(forma: NgForm) {
    console.log(forma);
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
