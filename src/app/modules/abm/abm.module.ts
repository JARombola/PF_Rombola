import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAltaComponent } from 'src/app/form-alta/form-alta.component';
import { ListadoAlumnosComponent } from 'src/app/listado-alumnos/listado-alumnos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FormAltaComponent,
    ListadoAlumnosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ABMModule { }
