import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../layout/main/main.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { AlumnosService } from '../../alumnos.service';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from 'src/app/auth.service';

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
    AlumnosService,
    AuthService
  ]
})
export class CoreModule { }
