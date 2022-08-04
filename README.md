# Proyecto final: Entrega 2 - Rombolá Julián.

## Cambios
### Módulos
Se crearon tres nuevos módulos:
1. **Core:** Incluye los componenes "comunes" (*TopBar* y *Main*)
2. **ABM:** Incluye los componentes específicos para las funcionalidades de Alta, baja y modificación de alumnos (*FormAlta* y *ListadoAlumnos*).
3. **Shared:** Incluye componentes genéricos reutilizados en distintos lugares (componentes de *Material*, pipes, directivas).

### Servicios
En la versión anterior la lógica para el ABM de los alumnos se encontraba en el componente *Main*. 
Ahora se creó el servicio **AlumnosService** que concentra esta lógica, siendo utilizado desde los demás componentes que requieren la modificación de datos.

### Routing
Ya no se utilizan variables para mostrar distintos componentes, sino que la navegación lateral hace cambio de rutas.
