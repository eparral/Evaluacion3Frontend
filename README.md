# Biblioteca Viva

Aplicación web hecha en Angular para registrar solicitudes de libros desde el rol de lector. La idea es mantener un registro simple, claro y fácil de revisar, sin depender de planillas externas o anotaciones sueltas.

## Qué permite hacer

- Iniciar sesión como lector.
- Registrar una solicitud con nombre, libro y fecha.
- Ver todas las solicitudes guardadas en una tabla.
- Eliminar pedidos que ya no correspondan.
- Mantener los datos en `LocalStorage` del navegador.

## Credenciales de prueba

Para entrar a la aplicación se puede usar:

```txt
Usuario: lector
Contraseña: 1234
```

## Tecnologías usadas

- Angular 18
- TypeScript
- Bootstrap
- Formularios con `ngModel`
- Rutas con Angular Router
- Persistencia local con `LocalStorage`

## Cómo ejecutar el proyecto

Primero instala las dependencias:

```bash
npm install
```

Luego levanta el servidor de desarrollo:

```bash
npm start
```

Abre el navegador en:

```txt
http://localhost:4200/
```

Si ese puerto está ocupado, Angular puede usar otro puerto disponible.

## Comandos útiles

Compilar el proyecto:

```bash
npm run build
```

Ejecutar pruebas unitarias:

```bash
npm test
```

## Nota

Este proyecto fue desarrollado como evaluación frontend. Se priorizó una experiencia sencilla y ordenada para que cualquier lector pueda registrar sus pedidos sin pasos innecesarios.
