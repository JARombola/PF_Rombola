import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../alumno';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AlumnosService } from '../alumnos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss']
})
export class FormAltaComponent implements OnInit {
  today = new Date();
  formAlumno!: FormGroup;
  index!: number;

  materias = ['Computación', 'Inglés', 'Música'];

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private alumnosService: AlumnosService, private route: ActivatedRoute) {
    this.fb = fb;
  }
  

  ngOnInit() {
    var i = this.route.snapshot.paramMap.get('index');
    if (i == null) this.index = -1;
    else this.index = Number(i);
    
    var alumno = <Alumno>{};
    if (this.index > -1 )
      this.alumnosService.getAlumno(this.index).then( a => { alumno = a; this.setForm(alumno);});
    
      this.setForm(alumno);
  }

  setForm(alumno: Alumno) {
    this.formAlumno = this.fb.group({
      nombre: this.fb.control(alumno.nombre, [Validators.required, Validators.minLength(2)]),
      apellido: this.fb.control(alumno.apellido, [Validators.required, Validators.minLength(2)]),
      fechaNacimiento: this.fb.control(alumno.fechaNacimiento, [Validators.required]),
      email: this.fb.control(alumno.email, [Validators.required, Validators.email]),
      activo: this.fb.control(alumno.activo, []),
      materia: this.fb.control(alumno.materia, [Validators.required]),
      index: this.fb.control(alumno.index, [])
    });
  }

  submit() {
    if (this.index == -1) this.addAlumno()
    else this.editAlumno();
  }

  addAlumno() {
    if (this.formAlumno.valid) {
      var nuevoAlumno: Alumno;
      nuevoAlumno = {...this.formAlumno.value};
      this.alumnosService.addAlumno(nuevoAlumno);
      this._snackBar.open('Alumno registrado!', '✔️');
    }
  }

  editAlumno() {
    if (this.formAlumno.valid) {
      var alumnoActualizado: Alumno;
      alumnoActualizado = {...this.formAlumno.value};
      this.alumnosService.updateAlumno(this.index, alumnoActualizado);
      this._snackBar.open('Alumno actualizado!', '✔️');
    }
  }
}