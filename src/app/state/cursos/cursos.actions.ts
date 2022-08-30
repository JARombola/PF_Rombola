import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/curso';
 
export const addCourse = createAction(
  '[Courses Collection] Add Course',
  props<{ curso: Curso }>()
);

export const removeCourse = createAction(
  '[Courses Collection] Remove Course',
  props<{ index: number }>()
);
 
export const setCoursesList = createAction(
  '[Courses API] Retrieve Courses Success',
  props<{ cursos: Curso[] }>()
);

export const updateCourse = createAction(
  '[Courses API] Update Course Success',
  props<{ index:number, curso: Curso }>()
);
