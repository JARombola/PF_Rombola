import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
 
export const addStudent = createAction(
  '[Students Collection] Add Student',
  props<{ student: Alumno }>()
);

export const removeStudent = createAction(
  '[Student Collection] Remove Student',
  props<{ index: number }>()
);
 
export const setStudentsList = createAction(
  '[Student API] Retrieve Students Success',
  props<{ alumnos: Alumno[] }>()
);

export const updateStudent = createAction(
  '[Student API] Upodate Student Success',
  props<{ index:number, alumno: Alumno }>()
);