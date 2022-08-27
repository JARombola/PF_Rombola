import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  formUser!: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private authService: AuthService) {
    this.fb = fb;
  }

  ngOnInit(): void {
    this.formUser = this.fb.group({
      user: this.fb.control("", [Validators.required, Validators.minLength(3)]),
      pass: this.fb.control("", [Validators.required, Validators.minLength(3)]),
      admin: this.fb.control("", [Validators.required]),
    });
  }

  submit() {
    if (this.formUser.valid) {
      var nuevoUser: Usuario;
      nuevoUser = {...this.formUser.value};
      this.authService.addUser(nuevoUser);
      this._snackBar.open('User registrado!', '✔️');
    }
  }

}
