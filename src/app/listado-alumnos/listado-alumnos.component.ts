import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Alumno } from '../alumno';
import { AlumnosService } from '../services/alumnos.service';
import { AuthService } from '../services/auth.service';
import { getAlumnos } from '../state/alumnos/alumnos.selector';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Activo"];
  alumnos$ = this.store.select(getAlumnos);

  @ViewChild(MatTable)
    table!: MatTable<Alumno>;
  
  constructor(public alumnosService: AlumnosService, private authS: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    this.columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Activo"];
    if (this.authS.admin)
      this.columnas.push('Actions');

  }

  eliminar(index: number){
    this.alumnosService.removeAlumno(index);
  }

}
