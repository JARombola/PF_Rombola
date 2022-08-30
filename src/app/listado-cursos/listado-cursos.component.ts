import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Curso } from '../curso';
import { CursosService } from '../services/cursos.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectCursosList } from '../state/cursos/cursos.selector';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {
  constructor(public cursosService: CursosService, private authS: AuthService, private store: Store) {
  }

  x!: string;
  columnas: String[] = [];
  cursos$ = this.store.select(selectCursosList);

  @ViewChild(MatTable)
    table!: MatTable<Curso>;
  
  

  ngOnInit(): void {
    this.columnas = ["Curso", "Horas", "Clases", "Profesor"];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number){
    this.cursosService.removeCurso(index);
    this.table.renderRows();
  }

}
