import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { selectUsuariosList } from '../state/usuarios/usuarios.selector';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-listado-users',
  templateUrl: './listado-users.component.html',
  styleUrls: ['./listado-users.component.scss']
})
export class ListadoUsersComponent implements OnInit {
  constructor(protected authS: AuthService, private store: Store) { }

  columnas = ['User', 'Actions']
  @ViewChild(MatTable)
  table!: MatTable<Usuario>;
  users$ = this.store.select(selectUsuariosList);

  ngOnInit(): void {
    this.columnas = ['User', 'Pass', 'Admin'];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number) {
    this.authS.eliminarUser(index);
    this.table.renderRows();
  }

}
