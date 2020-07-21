import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {
  constructor() {}

  // VALIDACION PERSONALIZADA EN LOS FORMULARIOS

  noCegarra(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'cegarra') {
      return {
        noCegarra: true,
      };
    }
    return null;
  }
}
