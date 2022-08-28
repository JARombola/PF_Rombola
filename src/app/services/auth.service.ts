import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addUser, logout, removeUser, setLogued, setUsersList } from '../state/usuarios/usuarios.actions';
import { selectUsuariosList } from '../state/usuarios/usuarios.selector';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  LINK = environment.LINK_USERS;
  admin = false;

  constructor(private router: Router, private httpClient: HttpClient, private _snackBar: MatSnackBar, private store: Store) { 
    this.getUsers();
  }

  getUsers() {
     this.httpClient
         .get<Usuario[]>(this.LINK)
         .subscribe(users => {
          this.store.dispatch(setUsersList({users}));
          this.store.select(selectUsuariosList);
         });
 }

 addUser(nuevoUser: Usuario) {
  this.httpClient
    .post<Usuario>(this.LINK, nuevoUser)
    .subscribe(datos => {
      nuevoUser.id = datos.id;
      this._snackBar.open('Usuario registrado.✔')
      this.store.dispatch(addUser({user: nuevoUser}));
    });
 }

 eliminarUser(index: number) {
  this.store.select(selectUsuariosList)
            .subscribe(users => {
              if (users.length > 1) {
                var url = this.LINK + '/' + users[index].id;
                this.httpClient
                .delete(url)
                .subscribe(() =>{
                  this._snackBar.open('Usuario eliminado ✔.');
                  this.store.dispatch(removeUser({index}));
                });
              } else {
                this._snackBar.open('No se puede eliminar el único usuario existente ❌.');
              }
            })
            .unsubscribe();
  
}

  async login(user: string, pass: string): Promise<string> {
    var users = await firstValueFrom(this.store.select(selectUsuariosList));
    var userLogueado = users.find(usuario => usuario.user == user && usuario.pass == pass);
    this.admin = false;
    if (!!userLogueado) {
      this.store.dispatch(setLogued({user: userLogueado}));
      if (userLogueado.admin) {
        this.admin = true;
        return 'admin';
      }
      return 'user';
    }
  return 'invalid';
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }

  logAdmin() {
    this.admin = true;
  }

}
