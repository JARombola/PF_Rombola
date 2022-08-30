import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  admin = false;
  constructor(protected authS: AuthService) { }

  ngOnInit(): void {
  }

  logAdmin() {
    if (!this.admin)
      this.authS.logAdmin();
    else this.authS.logout();
  }
  

  logout() {
    this.authS.logout();
  }
}
