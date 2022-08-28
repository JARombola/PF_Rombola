import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/usuario';
 
export const addUser = createAction(
  '[Users Collection] Add User',
  props<{ user: Usuario }>()
);

export const removeUser = createAction(
  '[Users Collection] Remove User',
  props<{ index: number }>()
);
 
export const setUsersList = createAction(
  '[Users API] Retrieve User Success',
  props<{ users: Usuario[] }>()
);

export const updateUser = createAction(
  '[User API] Update User Success',
  props<{ index:number, user: Usuario }>()
);


export const setLogued = createAction(
    '[Users Collection] Set logued',
   props<{ user: Usuario }>()
);
  
export const logout = createAction(
  '[Users Collection] Logout'
);

