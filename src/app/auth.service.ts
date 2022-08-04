import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
  admin = false;

  constructor(private router: Router) { }

  login(user: string, pass: string): string {
  if (pass == '1234') {
    this.logged = true;
  
    if (user.toUpperCase() == 'ADMIN') {
      this.admin = true;
      return 'admin';
    }
      return 'user';
    }
  return 'invalid';
  }

  logout() {
    this.logged = false;
    this.admin = false;
    this.router.navigate(['/']);
  }
}
