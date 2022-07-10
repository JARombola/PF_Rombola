import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from './alumno';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreAlumnoPipe implements PipeTransform {

  transform(alumno: Alumno): string {
    return alumno.nombre + ' ' + alumno.apellido;
  }

}
