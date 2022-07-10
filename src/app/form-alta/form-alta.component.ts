import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../alumno';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-alta',
  templateUrl: './form-alta.component.html',
  styleUrls: ['./form-alta.component.scss']
})
export class FormAltaComponent implements OnInit {
  today = new Date();
  formAlumno!: FormGroup;
  
  materias = ['Computación', 'Inglés', 'Música'];

  @Input() alumnoEditar!: Alumno;
  @Input() alumnos!: Alumno[];

  @Output() alumnoAgregar = new EventEmitter<Alumno>();
  @Output() alumnoActualizar = new EventEmitter<Alumno>();


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.fb = fb;
  }
  

  ngOnInit(): void {
    var alumno = this.alumnoEditar || <Alumno>{};
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
    if (this.alumnoEditar) this.editAlumno();
    else this.addAlumno();
  }

  addAlumno() {
    if (this.formAlumno.valid) {
      var nuevoAlumno: Alumno;
      nuevoAlumno = {...this.formAlumno.value};
      this.alumnoAgregar.emit(nuevoAlumno);
      this._snackBar.open('Alumno registrado!', '✔️');
    }
  }

  editAlumno() {
    if (this.formAlumno.valid) {
      var alumnoActualizado: Alumno;
      alumnoActualizado = {...this.formAlumno.value};
      this.alumnoActualizar.emit(alumnoActualizado);
      this._snackBar.open('Alumno actualizado!', '✔️');
    }
  }
}