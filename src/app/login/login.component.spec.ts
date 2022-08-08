import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { SharedModule } from '../modules/shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authS: AuthService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([{ path: '/funciones/listado'}]),
          // {path: '/funciones/listado'}
        OverlayModule,
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        AuthService,
        { provide: Router, useValue: routerSpy }
      ],
    })
    .compileComponents();

    routerSpy = {navigate: jasmine.createSpy('navigate')};
    authS = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NOT User Redirect', () => {
    component.formLogin.setValue({user: 'wrong', pass: 1111});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });

  it('User INVÁLIDO', () => {
    component.formLogin.setValue({user: 'wrong', pass: 1111});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();

  });

  it('Profile > COMUN', () => {
    component.formLogin.setValue({user: 'comun', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
    expect(!authS.admin).toBeTruthy();

  });

  it('Profile > ADMIN', () => {
    component.formLogin.setValue({user: 'admin', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
    expect(authS.admin).toBeTruthy();
  });

  it('User Redirect', () => {
    component.formLogin.setValue({user: 'admin', pass: 1234});
    component.submit();
    expect(authS.admin).toBeTruthy();
    expect(component.submited).toBeTruthy();
    expect(!component.wrongUser).toBeTruthy();
  });

  it('Invalid Form', () => {
    component.formLogin.setValue({user: 'a', pass: 1234});
    component.submit();
    expect(component.submited).toBeTruthy();
    expect(component.wrongUser).toBeTruthy();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });

});
