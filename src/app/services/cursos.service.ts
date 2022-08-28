import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Alumno } from '../alumno';
import { Curso } from '../curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Curso[] = [];
  curso$!: Promise<boolean>;
  alumnosCurso: Alumno[] = [];
  LINK = environment.LINK_CURSOS;
  URLAlumnosCurso = '';

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar ) { 
    this.loadCursos();
  }

  loadCursos() {
     this.curso$ = new Promise<boolean>((res, _) => {
      this.httpClient
          // .get("assets/alumnos.json")
          .get(this.LINK)
          .subscribe(cursos =>{
              this.cursos = [];
              (<Curso[]> cursos).forEach(alumno => this.cursos.push(alumno));
              // this.listadoAlumnos.forEach((alumno, i) => alumno.index = i);
              res(true);
          });
    });
  }

   removeCurso(index: number) {
    this.httpClient.delete(this.LINK + '/' + this.cursos[index].id).subscribe(() => this._snackBar.open('Curso eliminado.❌'));
    this.cursos.splice(index, 1);
  }

  addCurso(nuevoCurso: Curso) {
    this.httpClient.post<Curso>(this.LINK, nuevoCurso).subscribe(datos => {
      nuevoCurso.id = datos.id;
      this._snackBar.open('Curso registrado.✔')});
    this.cursos.push(nuevoCurso);
  }
  
  updateCurso(index: number, cursoActualizado: Curso) {
    this.httpClient.put(this.LINK + '/' + this.cursos[index].id, cursoActualizado).subscribe(() => this._snackBar.open('Curso actualizado.✔'));
    this.cursos[index] = cursoActualizado;
  }

  public async getCurso(index: number): Promise<Curso> {
    await this.curso$;
    return new Promise(r => r(this.cursos[index]));
  }

  // Guarda los alumnos del curso en la lista del servicio.
  async getAlumnosCurso (indexCurso: number):Promise<void> {
    var idCurso = this.cursos[indexCurso].id;
    this.URLAlumnosCurso = this.LINK + '/' + idCurso + '/alumnosCurso';
    this.alumnosCurso = [];
    return new Promise( (res, _) => {
        this.httpClient
        // .get("assets/alumnos.json")
      .get(this.URLAlumnosCurso)
      .subscribe(alumnos =>{
            this.alumnosCurso = [];
            (<Alumno[]> alumnos).forEach(alumno => this.alumnosCurso.push(alumno));
            res();
            // this.listadoAlumnos.forEach((alumno, i) => alumno.index = i);
        });
    });
  }

  addAlumnos(selected: Alumno[]) {
  var INTERVAL = 300;  

    var promise = Promise.resolve();
    selected.forEach(el => {
      var n = {...el};
      n.alumnoId = el.id;
      delete n.id;
    promise = promise.then( () => {
      this.httpClient
        .post<Alumno>(this.URLAlumnosCurso, n)
        .subscribe();
      return new Promise( res => {
      setTimeout(res, INTERVAL);
      });
    });
  });

  promise.then(() => {
    if (selected.length)
      this._snackBar.open('Alumnos agregados.✔'); 
  });
  }

  eliminarAlumno(index: number) {
    var url = this.URLAlumnosCurso + '/' + this.alumnosCurso[index].id;
    this.httpClient
   .delete(url)
   .subscribe(() =>{
      this._snackBar.open('Alumno quitado.✔'); });
      this.alumnosCurso.splice(index, 1);
    };


}
