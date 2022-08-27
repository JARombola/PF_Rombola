import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(protected authS: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authS.logout();
  }
}
