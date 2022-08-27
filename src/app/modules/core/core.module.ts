import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../../layout/main/main.component';
import { TopbarComponent } from '../../layout/topbar/topbar.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from 'src/app/services/auth.service';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { LoginComponent } from 'src/app/login/login.component';
import { FormUserComponent } from 'src/app/form-user/form-user.component';
import { ListadoUsersComponent } from 'src/app/listado-users/listado-users.component';

@NgModule({
  declarations: [
    MainComponent,
    TopbarComponent,
    LoginComponent,
    FormUserComponent,
    ListadoUsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MainComponent,
    TopbarComponent,
    LoginComponent
  ],
  providers: [
    AlumnosService,
    AuthService
  ]
})
export class CoreModule { }
