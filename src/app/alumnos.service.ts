import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from './alumno';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  listadoAlumnos: Alumno[] = [];
  alumnos$!: Promise<boolean>;
  
  constructor(private httpClient: HttpClient) { 
    this.loadAlumnos();
  }

  public loadAlumnos() {
    this.alumnos$ = new Promise<boolean>((res, _) => {
      this.httpClient
          .get("assets/alumnos.json")
          .subscribe(alumnos =>{
              this.listadoAlumnos = [];
              (<Alumno[]> alumnos).forEach(alumno => this.listadoAlumnos.push(alumno));
              this.listadoAlumnos.forEach((alumno, i) => alumno.index = i);
              res(true);
          });
    });
  }

  public addAlumno(alumno: Alumno) {
    this.listadoAlumnos.push(alumno);
  }

  public removeAlumno(index: number) {
    this.listadoAlumnos.splice(index, 1);
  }

  public updateAlumno(index: number, alumno: Alumno) {
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
