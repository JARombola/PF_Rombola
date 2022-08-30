# Proyecto final: Rombolá Julián.

##Funcionamiento
###Barra lateral.
En la barra lateral se ven todas las acciones disponibles, pero sólo se podrá acceder a ellas según los privilegios de usuario. (Se las dejo visibles para facilitar las pruebas de accesos de los Guards).
A las siguientes secciones sólo se podrá acceder con rol de administrador:
- Nuevo Alumno.
- Nuevo Curso.
- Nuevo Usuario.
A todas las demás se puede acceder tanto con admin como con usuario común.
No se podrá acceder a ninguna de ellas si no se ha logueado a la aplicación.

Abajo de todo se dejó un slide "Admin" que al presionarlo otorga permisos de Administrador. El motivo es principalmente por si se llegan a eliminar todos los usuarios de tipo admin y no se puede continuar probando la aplicación. De esta manera se podrá seguir accediendo a la aplicación. (Obviamente es para facilitar las pruebas).

###Login.
Actualmente hay creados dos usuarios.
- admin
- user
Ambos tienen la misma pass: 1234.

###User "común"
Este rol sólo tiene accesos de lectura a los distintos listados (Alumnos, usuarios y cursos).
Pero sí tiene la posibilidad de agregar alumnos a algún curso. Esto se hace en el listado de cursos:
![image](https://user-images.githubusercontent.com/11930260/187509509-7b04f4f8-11bb-4c01-b26d-cdda8cb1a308.png)

###Acciones
Todas las acciones de edición (ABM alumnos, cursos, usuarios) se realizan desde los listados, utilizando los botones de la columna "Acciones" de las respectivas listas.
Ej:
![image](https://user-images.githubusercontent.com/11930260/187510200-18781b09-a3dd-424f-88ec-6ba753ded96d.png)
* El "lápiz" para __editar__.
* El "tacho" para __eliminar__.

###Agregar alumnos a curso
La asignación de alumnos a un curso se hace desde la vista de alumnos del curso, con el ícono que se encuentra arriba a la derecha del listado de alumnos ya agregados:
![image](https://user-images.githubusercontent.com/11930260/187510616-3232f4b0-503f-4f11-a36f-a6bdf9c0a4d1.png)

##Detalles generales
- Para cada entidad (Alumnos, cursos, usuarios) existe su servicio específico que se encargan de las llamadas REST (mockAPI) -> Folder "__services__"
- Para cada entidad (Alumnos, cursos, usuarios) existen sus correspondientes módulos NgRx para el manejo de estados (Actions, reducers y selectors) -> Folder "__state__"
- Las distintas URLs y sus Guards de acceso están definidos directamente en __app.module__
- La aplicación se encuentra modularizada -> Folder "__modules__"
- 

