import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Alumno } from '../alumno';
import { AlumnosService } from '../alumnos.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Materia", "Activo", "Actions"];

  @ViewChild(MatTable)
    table!: MatTable<Alumno>;
  
  constructor(public alumnosService: AlumnosService) {
  }

  ngOnInit(): void {
  }

  eliminar(index: number){
    this.alumnosService.removeAlumno(index);
    this.table.renderRows();
  }

}
