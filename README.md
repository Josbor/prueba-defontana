# prueba-defontana
Este proyecto es una aplicación de procesamiento de ventas desarrollada en Node.js. Utiliza el siguiente comando para ejecutar el script principal:

```bash
npx ts-node src/procesarVentas.ts
```

## Requisitos

- Node.js
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Josbor/prueba-defontana.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd prueba-defontana
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

    ## Configuración del Entorno

    Para configurar las variables de entorno necesarias, crea un archivo `.env` en la raíz del proyecto y añade las siguientes líneas:

    ```plaintext
    DB_SERVER=lab-defontana-202310.caporvnn6sbh.us-east-1.rds.amazonaws.com
    DB_PORT=1433
    DB_DATABASE=Prueba
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    ```

    Asegúrate de reemplazar `your_db_user` y `your_db_password` con tus credenciales de base de datos reales.

    ## Uso

Para procesar las ventas, ejecuta el siguiente comando:

```bash
npx ts-node src/procesarVentas.ts
```

Este comando ejecutará el script `procesarVentas.ts` que se encuentra en el directorio `src`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request para discutir cualquier cambio que desees realizar.
