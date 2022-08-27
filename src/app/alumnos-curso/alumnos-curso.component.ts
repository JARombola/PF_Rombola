import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from '../alumno';
import { AuthService } from '../services/auth.service';
import { CursosService } from '../services/cursos.service';

@Component({
  selector: 'app-alumnos-curso',
  templateUrl: './alumnos-curso.component.html',
  styleUrls: ['./alumnos-curso.component.scss']
})
export class AlumnosCursoComponent implements OnInit {

  columnas: String[] = [];
  indexCurso!: number;
  
  @ViewChild(MatTable)
    table!: MatTable<Alumno>;
  

  constructor(protected cursosService: CursosService, private authS: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.indexCurso = Number(this.route.snapshot.paramMap.get('index'));
    this.cursosService.getAlumnosCurso(this.indexCurso);
    this.columnas = ["NombreCompleto", "Email", "Activo"];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number): void {
    this.cursosService.eliminarAlumno(index);
    this.table.renderRows();
  }

}
