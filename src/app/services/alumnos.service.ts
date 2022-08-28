import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Alumno } from '../alumno';
import { Store } from '@ngrx/store';
import { addStudent, removeStudent, setStudentsList, updateStudent } from '../state/alumnos/alumnos.actions';
import { getAlumnos, selectAlumno, selectAlumnosList } from '../state/alumnos/alumnos.selector';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  LINK = environment.LINK_ALUMNOS;

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store ) { 
    this.loadAlumnos();
  }

  public loadAlumnos() {
      this.httpClient
          .get<Alumno[]>(this.LINK)
          .subscribe(alumnos =>{
              this.store.dispatch(setStudentsList( {alumnos} ));
    });
  }

  public addAlumno(alumno: Alumno) {
    this.httpClient.post<Alumno>(this.LINK, alumno)
                  .subscribe((nuevo) => {
                      alumno.id = nuevo.id;
                      this._snackBar.open('Alumno registrado ✅');
                      this.store.dispatch(addStudent({student: alumno}));
    });
  }

  public removeAlumno(index: number) {
    this.store.select(getAlumnos)
              .subscribe( alumnos => {
                  var alumno = alumnos[index];
                  this.httpClient
                  .delete(this.LINK + '/' + alumno.id)
                  .subscribe(() => { 
                    this._snackBar.open('Alumno eliminado ✅');
                    this.store.dispatch(removeStudent({index}));
                  });
              }).unsubscribe();
  }

  public updateAlumno(index: number, alumno: Alumno) {
    this.store.select(selectAlumno(index))
              .subscribe( selected => {
                  this.httpClient.put<Alumno>(this.LINK + '/' + selected.id, alumno)
                                .subscribe((data) => {
                                  alumno.id = data.id;
                                  this._snackBar.open('Alumno actualizado.');
                                  this.store.dispatch(updateStudent({index, alumno}));
                                });
                  })
                  .unsubscribe();
  }

  public async getAlumno(index: number): Promise<Alumno> {
    return new Promise(r => 
        this.store.select(selectAlumno(index))
        .subscribe(selected => r(selected))
        .unsubscribe()
    );
  }

}
