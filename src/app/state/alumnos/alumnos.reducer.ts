import { createReducer, on } from '@ngrx/store';
import { Alumno } from 'src/app/alumno';
import {setStudentsList, addStudent, removeStudent, updateStudent} from './alumnos.actions'

export const initialState: Alumno[] = [];

export const alumnosReducer = createReducer(
  initialState,
  on(setStudentsList, (_, { alumnos }) => alumnos),
  on(addStudent, (state, {student}) => [...state, student]),
  on(removeStudent, (state, {index}) => {var alumnos = [...state]; alumnos.splice(index, 1); return alumnos;}),
  on(updateStudent, (state, {index, alumno}) => {var alumnos = [...state]; alumnos[index] = alumno; return alumnos;}),
);