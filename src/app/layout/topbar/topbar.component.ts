import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { getUser } from 'src/app/state/usuarios/usuarios.selector';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(private store: Store, private authS: AuthService) { }
  user$ = this.store.select(getUser);

  ngOnInit(): void {
  }

  logout() {
    this.authS.logout();
  }

}
