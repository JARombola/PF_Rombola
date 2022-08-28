import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
import {setUsersList, addUser, removeUser, updateUser, setLogued, logout} from './usuarios.actions'
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

export const initialState: Usuario[] = [];
export const user: Usuario = {
    user: '',
    pass: '',
    admin: false,
    id: 0
};

export const usuarioReducer = createReducer(
  initialState,
  on(setUsersList, (_, { users }) => users),
  on(addUser, (state, {user}) => [...state, user]),
  on(removeUser, (state, {index}) => {var users = [...state]; users.splice(index, 1); return users;}),
  on(updateUser, (state, {index, user}) => {var users = [...state]; users[index] = user; return users;}),
);

export const userLog = createReducer(
    user,
    on(setLogued, (_, {user}) => user),
    on(logout, (_) => new Usuario()),
)