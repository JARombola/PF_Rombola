import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS}  from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormAltaComponent } from './form-alta/form-alta.component';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import { ABMModule } from './modules/abm/abm.module';
import { LoginComponent } from './login/login.component';
import { AccesosGuard } from './accesos.guard';
import { AdminGuardGuard } from './admin-guard.guard';
import { ListadoCursosComponent } from './listado-cursos/listado-cursos.component';
import { AltaCursoComponent } from './alta-curso/alta-curso.component';
import { AlumnosCursoComponent } from './alumnos-curso/alumnos-curso.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ListadoUsersComponent } from './listado-users/listado-users.component';
import { FormAlumnosCursoComponent } from './form-alumnos-curso/form-alumnos-curso.component';
import { StoreModule } from '@ngrx/store';
import { alumnosReducer } from './state/alumnos/alumnos.reducer';
import { userLog, usuarioReducer } from './state/usuarios/usuarios.reducer';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'alumnos', children: [
    { path: 'listado', component: ListadoAlumnosComponent, canActivate: [AccesosGuard]},
    { path: 'nuevo', component: FormAltaComponent, canActivate: [AdminGuardGuard] },
    { path: 'editar/:index', component: FormAltaComponent, canActivate: [AdminGuardGuard] },
  ]
  },
  { path: 'cursos', children: [
    { path: 'listado', component: ListadoCursosComponent, canActivate: [AccesosGuard]},
    { path: 'nuevo', component: AltaCursoComponent, canActivate: [AdminGuardGuard] },
    { path: 'alumnos/:index', component: AlumnosCursoComponent, canActivate: [AdminGuardGuard] },
    { path: 'editar/:index', component: AltaCursoComponent, canActivate: [AdminGuardGuard] },
    { path: 'alumnos/agregar/:indexCurso', component: FormAlumnosCursoComponent, canActivate: [AdminGuardGuard] },
  ]
  },
  { path: 'usuarios', children: [
    { path: 'listado', component: ListadoUsersComponent, canActivate: [AccesosGuard]},
    { path: 'nuevo', component: FormUserComponent, canActivate: [AdminGuardGuard] },
  ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    FormAlumnosCursoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    CoreModule,
    ABMModule,
    OverlayModule,
    StoreModule.forRoot({alumnos: alumnosReducer, usuarios: usuarioReducer, user: userLog})
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
