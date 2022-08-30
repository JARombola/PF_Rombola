import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { Alumno } from '../alumno';
import { Curso } from '../curso';
import { addCourse, removeCourse, setCoursesList, updateCourse } from '../state/cursos/cursos.actions';
import { selectCurso } from '../state/cursos/cursos.selector';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  curso$!: Promise<boolean>;
  alumnosCurso: Alumno[] = [];
  LINK = environment.LINK_CURSOS;
  URLAlumnosCurso = '';

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store) { 
    this.loadCursos();
  }

  loadCursos() {
     this.curso$ = new Promise<boolean>((res, _) => {
      this.httpClient
          .get<Curso[]>(this.LINK)
          .subscribe(cursos =>{
              this.store.dispatch(setCoursesList({cursos}));
              //this.cursos = [];
              //(<Curso[]> cursos).forEach(alumno => this.cursos.push(alumno));
              res(true);
          });
    });
  }

   removeCurso(index: number) {
    this.store.select(selectCurso(index))
              .subscribe( curso => {
                this.httpClient.delete(this.LINK + '/' + curso.id)
                .subscribe(() => {
                this._snackBar.open('Curso eliminado.❌')
                this.store.dispatch(removeCourse({index}));
              });
    }).unsubscribe();
  }

  addCurso(nuevoCurso: Curso) {
    this.httpClient.post<Curso>(this.LINK, nuevoCurso).subscribe(datos => {
      nuevoCurso.id = datos.id;
      this._snackBar.open('Curso registrado.✔');
      this.store.dispatch(addCourse({curso: nuevoCurso}));
    });
  }
  
  updateCurso(index: number, cursoActualizado: Curso) {
    this.store.select(selectCurso(index))
              .subscribe(curso => {
                  this.httpClient.put<Curso>(this.LINK + '/' + curso.id, cursoActualizado)
                  .subscribe(() => {
                    cursoActualizado.id = curso.id;
                    this._snackBar.open('Curso actualizado.✔');
                    this.store.dispatch(updateCourse({index, curso: cursoActualizado}));
                  });
    })
    .unsubscribe();
  }

  // Guarda los alumnos del curso en la lista del servicio.
  async getAlumnosCurso (indexCurso: number):Promise<void> {
    return new Promise( (res, _) => {
      this.store.select(selectCurso(indexCurso))
      .subscribe(curso => {
      var idCurso = curso.id;
    this.URLAlumnosCurso = this.LINK + '/' + idCurso + '/alumnosCurso';
    this.alumnosCurso = [];
        this.httpClient
        // .get("assets/alumnos.json")
      .get(this.URLAlumnosCurso)
      .subscribe(alumnos =>{
            this.alumnosCurso = [];
            (<Alumno[]> alumnos).forEach(alumno => this.alumnosCurso.push(alumno));
            res();
            // this.listadoAlumnos.forEach((alumno, i) => alumno.index = i);
        });
    }).unsubscribe();
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
