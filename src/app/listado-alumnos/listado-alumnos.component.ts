import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Alumno } from '../alumno';
import { AlumnosService } from '../services/alumnos.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Materia", "Activo"];

  @ViewChild(MatTable)
    table!: MatTable<Alumno>;
  
  constructor(public alumnosService: AlumnosService, private authS: AuthService) {
  }

  ngOnInit(): void {
    this.columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Materia", "Activo"];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number){
    this.alumnosService.removeAlumno(index);
    this.table.renderRows();
  }

}
