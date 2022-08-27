import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged = false;
  admin = false;
  user = '';
  LINK = environment.LINK_USERS;
  users: Usuario[] = [];

  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar) { 
    this.getUsers();
    //this.logAdmin();
  }

  getUsers() {
     this.httpClient
         // .get("assets/alumnos.json")
         .get(this.LINK)
         .subscribe(users =>{
             this.users = [];
             (<Usuario[]> users).forEach(user => this.users.push(user));
         });
 }

 addUser(nuevoUser: Usuario) {
  this.httpClient
    .post<Usuario>(this.LINK, nuevoUser)
    .subscribe(datos => {
      nuevoUser.id = datos.id;
      this._snackBar.open('Usuario registrado.✔')
      this.users.push(nuevoUser);
    });
 }

 eliminarUser(index: number) {
  if (this.users.length > 1) {
    var url = this.LINK + '/' + this.users[index].id;
    this.httpClient
    // .get("assets/alumnos.json")
    .delete(url)
    .subscribe(() => this._snackBar.open('Usuario eliminado ✔.'));
    this.users.splice(index, 1);
  } else {
    this._snackBar.open('No se puede eliminar el único usuario existente ❌.');
  }
}

  login(user: string, pass: string): string {
    var userLogueado = this.users.find(usuario => usuario.user == user && usuario.pass == pass);
    if (!!userLogueado) {
      this.logged = true;
      this.user = user;
      if (userLogueado.admin)
        return 'admin';
      else return 'user';
    }
  return 'invalid';
  }

  logout() {
    this.logged = false;
    this.admin = false;
    this.user = '';
    this.router.navigate(['/']);
  }

  logAdmin() {
    this.logged = !this.logged;
    this.admin = !this.admin;
  }
}
