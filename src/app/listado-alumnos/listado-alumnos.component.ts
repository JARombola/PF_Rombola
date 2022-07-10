import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Alumno } from '../alumno';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})
export class ListadoAlumnosComponent implements OnInit {

  @Input() alumnos: Alumno[] = [];
  columnas = ["NombreCompleto", "Nombre", "Apellido", "FechaNacimiento", "Email", "Materia", "Activo", "Actions"];
  @Output() alumnoEditar = new EventEmitter<number>();
  @Output() alumnoEliminar = new EventEmitter<number>();
  
  @ViewChild(MatTable)
  table!: MatTable<Alumno>;
  
  constructor() {
  }

  ngOnInit(): void {
 
  }

  eliminar(index: number){
    this.alumnoEliminar.emit(index);
    this.table.renderRows();
  }

  editar(index: number){
    this.alumnoEditar.emit(index);
  }

}
