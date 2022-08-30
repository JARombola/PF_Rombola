import { createReducer, on } from '@ngrx/store';
import { Curso } from 'src/app/curso';
import {setCoursesList, addCourse, removeCourse, updateCourse} from './cursos.actions'
/*export const initialState: AppState = {
    alumnos: [],
    usuarios: []
};*/

/*export const alumnosReducer = createReducer(
  initialState,
  on(setStudentsList, (state, { alumnos }) => { return {...state, alumnos: alumnos};}),
  on(addStudent, (state, {student}) => { return {...state, alumnos: state.alumnos.concat(student)}}),
  on(removeStudent, (state, {index}) => {var alumnos = [...state.alumnos]; alumnos.splice(index, 1); return {...state, alumnos}}),
  on(updateStudent, (state, {index, alumno}) => {var alumnos = [...state.alumnos]; alumnos[index] = alumno; return {...state, alumnos}}),
);*/

export const initialState: Curso[] = [];

export const cursosReducer = createReducer(
  initialState,
  on(setCoursesList, (_, { cursos }) => cursos),
  on(addCourse, (state, {curso}) => [...state, curso]),
  on(removeCourse, (state, {index}) => {var cursos = [...state]; cursos.splice(index, 1); return cursos;}),
  on(updateCourse, (state, {index, curso}) => {var cursos = [...state]; cursos[index] = curso; return cursos;}),
);