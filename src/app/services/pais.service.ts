import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  // petición al servicio proveido de la url
  getPaises() {
    // Se utiliza el map para trasnformar la respuesta que recibimos

    // console.log(this.http); Con esto observamos la data y verificamos que necesitamos

    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map((resp: any[]) => {
        // transformando la respuesta q es un arreglo
        // return 'Hola Mundo';
        return resp.map((pais) => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code,
          };
        });
      })
    );
  }
}
