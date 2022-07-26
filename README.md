# Proyecto final: Entrega 1 - Rombolá Julián.

# Funcionamiento
Para el desarrollo del proyecto se hace uso de tres componentes:
1) **Form-Alta:** Utilizado tanto para el alta de alumnos nuevos como para la modificación de los existentes.
2) **Listado-Alumnos:** Utilizado para mostrar los alumnos registrados.
3) **Main:** Utilizado como "orquestador" entre los dos componentes anteriores. Posee la lógica para la actualización (ABM) de los alumnos.

## Alta de alumno
Este módulo presenta un formulario con 5 campos, todos obligatorios y con las siguientes validaciones:
- Nombre: Mínimo 2 caracteres.
- Apellido: Mínimo 2 caracteres.
- Fecha de Nacimiento: Anterior al día en curso.
- Email: Formato válido.
- Materia: Campo seleccionado.

Cuando se **Registra** un alumno, este envía la información al componente _Main_ para que lo agregue a la lista.
Cuando se **Modifica** un alumno, este envía la información actualizada al componente _Main_ para que modifique el elemento correspondiente.
Ambas acciones se realizan a través de eventos (_EventEmitter_).

## Listado de Alumnos
Este módulo presenta una tabla con la información de los alumnos registrados, donde la última columna de cada fila posee dos botones que permiten:
- Editar la información del alumno correspondiente.
- Eliminar el alumno correspondiente.

Cuando se presiona alguno de esos botones, estos generan el evento correspondiente para que el componente _Main_ realice la lógica adecuada.

# Información
- El componente **Main** es el que funciona como "orquestador", ya que posee la lista de alumnos y la lógica para su manipulación (agregar elementos, modificarlos o eliminarlos).
Por lo tanto, la comunicación con los otros dos componentes (**Form-Alta** y **Listado-alumnos**) por el momento se hace a través de variables @Input y @Output.

- El **pipe personalizado** se utiliza en **Listado-alumnos**, en la primer columna de la tabla (Línea #6).

- La **directiva personalizada** se utiliza en los encabezados tanto de **form-alta** como de **listado-alumnos** (Línea #1).

- El listado inicial de alumnos se carga en el componente **Main**, y los datos se obtienen del archivo **alumnos.json** (Dentro de _assets_). (Si se eliminan todos los alumnos del listado, aparecerá un botón en la barra lateral para volver a cargarlos).
