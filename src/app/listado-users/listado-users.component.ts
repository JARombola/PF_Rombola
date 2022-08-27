import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-listado-users',
  templateUrl: './listado-users.component.html',
  styleUrls: ['./listado-users.component.scss']
})
export class ListadoUsersComponent implements OnInit {

  columnas = ['User', 'Actions']
  @ViewChild(MatTable)
  table!: MatTable<Usuario>;
  
  constructor(protected authS: AuthService) { }

  ngOnInit(): void {
    this.columnas = ['User'];
    if (this.authS.admin)
      this.columnas.push('Actions');
  }

  eliminar(index: number) {
    this.authS.eliminarUser(index);
    this.table.renderRows();
  }

}
