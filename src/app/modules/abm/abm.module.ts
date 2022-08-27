import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAltaComponent } from 'src/app/form-alta/form-alta.component';
import { ListadoAlumnosComponent } from 'src/app/listado-alumnos/listado-alumnos.component';
import { SharedModule } from '../shared/shared.module';
import { ListadoCursosComponent } from 'src/app/listado-cursos/listado-cursos.component';
import { AltaCursoComponent } from 'src/app/alta-curso/alta-curso.component';
import { AlumnosCursoComponent } from 'src/app/alumnos-curso/alumnos-curso.component';

@NgModule({
  declarations: [
    FormAltaComponent,
    ListadoAlumnosComponent,
    ListadoCursosComponent,
    AltaCursoComponent,
    AlumnosCursoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class ABMModule { }
