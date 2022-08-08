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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'funciones', children: [
    { path: 'listado', component: ListadoAlumnosComponent, canActivate: [AccesosGuard]},
    { path: 'nuevo', component: FormAltaComponent, canActivate: [AdminGuardGuard] },
    { path: 'editar/:index', component: FormAltaComponent, canActivate: [AdminGuardGuard] },
  ] },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule,
    CoreModule,
    ABMModule,
    OverlayModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
