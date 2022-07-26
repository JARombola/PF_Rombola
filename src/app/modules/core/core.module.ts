import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../layout/main/main.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { AlumnosService } from '../../alumnos.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MainComponent,
    TopbarComponent,
  ],
  providers: [
    AlumnosService
  ]
})
export class CoreModule { }
