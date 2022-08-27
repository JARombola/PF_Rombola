import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Alumno } from '../alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  listadoAlumnos: Alumno[] = [];
  alumnos$!: Promise<boolean>;
  LINK = environment.LINK_ALUMNOS;

  

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar ) { 
    this.loadAlumnos();
  }

  public loadAlumnos() {
    this.alumnos$ = new Promise<boolean>((res, _) => {
      this.httpClient
          // .get("assets/alumnos.json")
          .get(this.LINK)
          .subscribe(alumnos =>{
              this.listadoAlumnos = [];
              (<Alumno[]> alumnos).forEach(alumno => this.listadoAlumnos.push(alumno));
              // this.listadoAlumnos.forEach((alumno, i) => alumno.index = i);
              res(true);
          });
    });
  }

  public addAlumno(alumno: Alumno) {
    this.httpClient.post<Alumno>(this.LINK, alumno).subscribe((nuevo) => {
      alumno.id = nuevo.id;
      this._snackBar.open('Alumno registrado.')
    });
    this.listadoAlumnos.push(alumno);
  }

  public removeAlumno(index: number) {
    this.httpClient.delete(this.LINK + '/' + this.alumnos[index].id).subscribe(() => this._snackBar.open('Alumno eliminado.'));
    this.listadoAlumnos.splice(index, 1);
  }

  public updateAlumno(index: number, alumno: Alumno) {
    this.httpClient.put(this.LINK + '/' + this.alumnos[index].id, alumno).subscribe(() => this._snackBar.open('Alumno actualizado.'));
    this.listadoAlumnos[index] = alumno;
  }

  public async getAlumno(index: number): Promise<Alumno> {
    await this.alumnos$;
    return new Promise(r => r(this.listadoAlumnos[index]));
  }

  public get alumnos () : Alumno[] {
    return this.listadoAlumnos;
  }
  

}
