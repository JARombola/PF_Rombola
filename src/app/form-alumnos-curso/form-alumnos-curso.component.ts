import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Alumno } from '../alumno';
import { AlumnosService } from '../services/alumnos.service';
import { CursosService } from '../services/cursos.service';
import { getAlumnos } from '../state/alumnos/alumnos.selector';

@Component({
  selector: 'app-form-alumnos-curso',
  templateUrl: './form-alumnos-curso.component.html',
  styleUrls: ['./form-alumnos-curso.component.scss']
})
export class FormAlumnosCursoComponent implements OnInit {

  selection = new SelectionModel<Alumno>(true, []);
  indexCurso!: number;
  columnas = ['select', 'NombreCompleto'];
  alumnosDisponibles: Alumno[] = [];

  constructor(protected cursosService: CursosService, protected alumnosService: AlumnosService, private route: ActivatedRoute, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.indexCurso = Number(this.route.snapshot.paramMap.get('indexCurso'));
    this.alumnosService.loadAlumnos()
    this.cursosService.getAlumnosCurso(this.indexCurso).then( _ => {
      this.store.select(getAlumnos).subscribe( alumnos => 
        this.alumnosDisponibles = alumnos.filter(alumno => !this.cursosService.alumnosCurso.find(enCurso => enCurso.alumnoId == alumno.id))
      );
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    var numRows;
    this.store.select(getAlumnos).subscribe(alumnos => numRows = alumnos.length);
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.store.select(getAlumnos).subscribe( alumnos => 
      this.selection.select(...alumnos)
    )
  }

  agregarAlumnos() {
    this.cursosService.addAlumnos(this.selection.selected);
    this.router.navigate(['/cursos/listado']);
  }

}
