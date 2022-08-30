import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../services/cursos.service';
import { selectCurso } from '../state/cursos/cursos.selector';

@Component({
  selector: 'app-alta-curso',
  templateUrl: './alta-curso.component.html',
  styleUrls: ['./alta-curso.component.scss']
})
export class AltaCursoComponent implements OnInit {

  index = -1;
  formCurso!: FormGroup;
  curso: any;

  constructor(private fb: FormBuilder, private cursosService: CursosService, private route: ActivatedRoute, private store: Store ) { }

  ngOnInit(): void {
    this.curso = <Curso>{};
    this.setForm(this.curso);

    var i = this.route.snapshot.paramMap.get('index');
    if (i == null) this.index = -1;
    else this.index = Number(i);
    
    var curso = <Curso>{};
    if (this.index > -1 )
      firstValueFrom(this.store.select(selectCurso(this.index))).then( a => { curso = a; this.setForm(curso);});
    
      this.setForm(curso);
  }

  setForm(curso: Curso) {
    this.formCurso = this.fb.group({
      nombre: this.fb.control(curso.nombre, [Validators.required, Validators.minLength(3)]),
      horas: this.fb.control(curso.horas, [Validators.required, Validators.min(1), Validators.max(4)]),
      clases: this.fb.control(curso.clases, [Validators.required, Validators.min(1), Validators.max(20)]),
      profesor: this.fb.control(curso.profesor, [Validators.required, Validators.minLength(3)]),
    });
  }

  submit() {
    if (this.index == -1) this.addCurso()
    else this.editCurso();
  }

  addCurso() {
    if (this.formCurso.valid) {
      var nuevoCurso: Curso;
      nuevoCurso = {...this.formCurso.value};
      this.cursosService.addCurso(nuevoCurso);
      // this._snackBar.open('Alumno registrado!', '✔️');
    }
  }

  editCurso() {
    if (this.formCurso.valid) {
      var cursoActualizado: Curso;
      cursoActualizado = {...this.formCurso.value};
      this.cursosService.updateCurso(this.index, cursoActualizado);
      // this._snackBar.open('Alumno actualizado!', '✔️');
    }
  }

}
