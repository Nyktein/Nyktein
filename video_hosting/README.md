# Video Hosting (Private)

Esta es una aplicación web sencilla para subir y visualizar videos de forma privada utilizando Python y Flask. Incluye autenticación básica y una interfaz moderna en blanco y negro.

## Requisitos

- Python 3.11
- Flask (`pip install flask`)

## Uso

1. Instala las dependencias:
   ```bash
   pip install flask
   ```
2. Ejecuta el servidor:
   ```bash
   python3 -m flask --app app run
   ```
3. Abre tu navegador en `http://localhost:5000`.
   - Regístrate con un usuario y contraseña.
   - Pulsa el botón **Subir Video** y arrastra tu archivo a la ventana emergente para cargarlo.

Los archivos se almacenan en la carpeta `uploads` y las cuentas en `users.json`.
