import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder) {
    this.crearFormulario();
    this.cargarDataAlFormulario();
  }

  ngOnInit(): void {}

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido').invalid && this.forma.get('apellido').touched
    );
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get distritoNoValido() {
    return (
      this.forma.get('direccion.distrito').invalid &&
      this.forma.get('direccion.distrito').touched
    );
  }

  get ciudadNoValida() {
    return (
      this.forma.get('direccion.ciudad').invalid &&
      this.forma.get('direccion.ciudad').touched
    );
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      // Así se declara un arreglo en los formularios
      pasatiempos: this.fb.array([]),
    });
  }

  cargarDataAlFormulario() {
    // this.forma.setValue({ CON ESTE SE DEBE TENER LOS VALORES DE LOS CAMPOS EN EL OBJETO
    // CON EL RESET IGNORA LOS QUE NO TIENE
    this.forma.reset({
      nombre: 'Nemecio',
      apellido: 'Carrillo',
      correo: 'carrillo618@hotmail.com',
      direccion: {
        distrito: 'capital',
        ciudad: 'caracas',
      },
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        // console.log(control);
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAllAsTouched();
        }

        control.markAsTouched();
      });
    }
    // Posteo de la información

    this.forma.reset({
      nombre: 'sin nombre',
    });
  }
}
