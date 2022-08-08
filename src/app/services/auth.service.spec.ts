import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('Wrong User', () => {
    service.login('wrong', '1111');
    expect(service.logged).toBeFalsy();
    expect(service.admin).toBeFalsy();
  });
  
  it('User > Común', () => {
    service.login('asd', '1234');
    expect(service.logged).toBeTruthy();
    expect(service.admin).toBeFalsy();
  });
  
  it('User > Admin', () => {
    service.login('admin', '1234');
    expect(service.logged).toBeTruthy();
    expect(service.admin).toBeTruthy();
  });
});
