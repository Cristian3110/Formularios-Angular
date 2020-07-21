import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ControlContainer } from '@angular/forms';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { rejects } from 'assert';

interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  // VALIDACION PERSONALIZADA EN LOS FORMULARIOS

  existeUsuario(
    control: FormControl
  ): Promise<ErrorValidate> | Observable<ErrorValidate> {
    // validador para el campo
    if (!control.value) {
      return Promise.resolve(null);
    }
    // validador de usuarios ya registrados
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }

  noCegarra(control: FormControl): ErrorValidate {
    if (control.value?.toLowerCase() === 'cegarra') {
      return {
        noCegarra: true,
      };
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
