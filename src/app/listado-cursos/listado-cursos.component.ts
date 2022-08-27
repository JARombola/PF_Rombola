import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Curso } from '../curso';
import { CursosService } from '../services/cursos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss']
})
export class ListadoCursosComponent implements OnInit {
  x!: string;
  columnas: String[] = [];

  @ViewChild(MatTable)
    table!: MatTable<Curso>;
  
  constructor(public cursosService: CursosService, private authS: AuthService) {
  }


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
