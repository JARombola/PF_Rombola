import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
 
export const selectUsuariosList = createFeatureSelector<Usuario[]>('usuarios');

export const getUsuarios = createSelector(
    selectUsuariosList,
  (usuarios: Usuario[]) => usuarios
)

export const selectUser = (index: number) => createSelector(
    getUsuarios,
  (usuarios) => usuarios[index]
);

export const getUser = createFeatureSelector<Usuario>('user');

export const userLogued = createSelector(
  getUser,
  (user) => !!user.user
);

export const userAdmin = createSelector(
  getUser,
  (user) => user.admin
);