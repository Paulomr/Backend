# Crunchy Munch Backend

Backend de la aplicación Crunchy Munch construido con Node.js, Express y MongoDB. El proyecto expone una API para gestionar usuarios, productos, categorías, pedidos, toppings, helados, cookies, crookies, PQRS, votos y autenticación, además de servir `sitemap.xml` y `robots.txt`.

## Tecnologías principales

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (`jsonwebtoken`)
- bcryptjs
- CORS
- dotenv
- Multer + `multer-s3`
- AWS SDK para S3
- sitemap
- PM2 mediante `ecosystem.config.mjs`

## Punto de entrada

El archivo principal es [index.js](./index.js).

Ahí se hace lo siguiente:

1. Carga de variables de entorno con `dotenv`.
2. Creación del servidor Express.
3. Configuración de CORS y middlewares de JSON y URL-encoded.
4. Conexión a MongoDB mediante [config/mongoConnect.js](./config/mongoConnect.js).
5. Montaje de rutas de sitemap en `/` y de la API en `/api`.
6. Inicio del servidor en `PORT` o `3020`.

## Estructura del proyecto

```text
Backend/
├─ index.js
├─ package.json
├─ package-lock.json
├─ README.md
├─ .gitIgnore
├─ config/
│  ├─ ecosystem.config.mjs
│  ├─ mongoConnect.js
│  └─ multer.js
├─ controllers/
├─ middlewares/
├─ models/
├─ public/
│  └─ uploads/
├─ router/
└─ services/
```

### Raíz

- [index.js](./index.js): arranque del servidor.
- [package.json](./package.json): dependencias y metadatos.
- [package-lock.json](./package-lock.json): bloqueo de versiones.
- [.gitIgnore](./.gitIgnore): ignora `node_modules/` y `.env`.

### config/

- [config/mongoConnect.js](./config/mongoConnect.js): conexión a MongoDB con `DB_URI`.
- [config/multer.js](./config/multer.js): subida de imágenes a AWS S3.
- [config/ecosystem.config.mjs](./config/ecosystem.config.mjs): configuración de PM2.

### controllers/

Contiene la capa HTTP. Recibe requests, valida datos de entrada y llama a services.

Archivos principales:

- [controllers/authControllers.js](./controllers/authControllers.js)
- [controllers/categoryControllers.js](./controllers/categoryControllers.js)
- [controllers/cookiesControllers.js](./controllers/cookiesControllers.js)
- [controllers/crookiesControllers.js](./controllers/crookiesControllers.js)
- [controllers/iceCreamControllers.js](./controllers/iceCreamControllers.js)
- [controllers/pedidosControllers.js](./controllers/pedidosControllers.js)
- [controllers/pqrsControllers.js](./controllers/pqrsControllers.js)
- [controllers/productControllers.js](./controllers/productControllers.js)
- [controllers/superUserAuthController.js](./controllers/superUserAuthController.js)
- [controllers/superUserControllers.js](./controllers/superUserControllers.js)
- [controllers/toppingControllers.js](./controllers/toppingControllers.js)
- [controllers/userController.js](./controllers/userController.js)
- [controllers/voteController.js](./controllers/voteController.js)

### middlewares/

- [middlewares/jwt.js](./middlewares/jwt.js): verificación de JWT y control por roles.

### models/

Modelos de Mongoose. Aquí están definidas las colecciones y sus referencias.

- [models/category.js](./models/category.js)
- [models/cookies.js](./models/cookies.js)
- [models/crookies.js](./models/crookies.js)
- [models/iceCream.js](./models/iceCream.js)
- [models/pedido.js](./models/pedido.js)
- [models/pqrs.js](./models/pqrs.js)
- [models/product.js](./models/product.js)
- [models/superUser.js](./models/superUser.js)
- [models/topping.js](./models/topping.js)
- [models/Users.js](./models/Users.js)
- [models/vote.js](./models/vote.js)

### router/

Define las rutas HTTP y las monta por módulos.

- [router/apiRouter.js](./router/apiRouter.js): agrupa todas las rutas bajo `/api`.
- [router/authRouter.js](./router/authRouter.js)
- [router/categoryRouter.js](./router/categoryRouter.js)
- [router/cookieRouter.js](./router/cookieRouter.js)
- [router/crookieRouter.js](./router/crookieRouter.js)
- [router/iceCreamRouter.js](./router/iceCreamRouter.js)
- [router/pedidosRouter.js](./router/pedidosRouter.js)
- [router/pqrsRouter.js](./router/pqrsRouter.js)
- [router/productRouter.js](./router/productRouter.js)
- [router/sitemapRouter.js](./router/sitemapRouter.js)
- [router/superUserAuthRouter.js](./router/superUserAuthRouter.js)
- [router/superUserRouter.js](./router/superUserRouter.js)
- [router/toppingRouter.js](./router/toppingRouter.js)
- [router/userRouter.js](./router/userRouter.js)
- [router/voteRouter.js](./router/voteRouter.js)

### services/

Contiene la lógica de negocio y el acceso a datos.

- [services/authService.js](./services/authService.js)
- [services/categoryService.js](./services/categoryService.js)
- [services/cookieService.js](./services/cookieService.js)
- [services/crookieService.js](./services/crookieService.js)
- [services/pedidosServices.js](./services/pedidosServices.js)
- [services/pqrsService.js](./services/pqrsService.js)
- [services/productServices.js](./services/productServices.js)
- [services/sitemapServices.js](./services/sitemapServices.js)
- [services/superUserAuthServices.js](./services/superUserAuthServices.js)
- [services/superUserServices.js](./services/superUserServices.js)
- [services/userService.js](./services/userService.js)
- [services/voteService.js](./services/voteService.js)

### public/

- [public/uploads/](./public/uploads): archivos subidos o recursos generados.

## Base de datos

El proyecto usa **MongoDB** con **Mongoose**.

La conexión se hace en [config/mongoConnect.js](./config/mongoConnect.js) usando la variable de entorno `DB_URI`.

Los modelos están definidos en [models/](./models) y usan `Schema`, `model`, referencias con `ObjectId` y `populate` para relaciones entre documentos.

Ejemplos de relaciones visibles en el código:

- `Product` referencia `Category`, `topping` e `iceCream`.
- `User` maneja contraseña cifrada con `bcryptjs`.
- Varias entidades usan soft delete con `deletedAt`.

## Autenticación

La autenticación usa JWT.

- Login en [router/authRouter.js](./router/authRouter.js).
- Lógica en [controllers/authControllers.js](./controllers/authControllers.js).
- Firma y validación en [services/authService.js](./services/authService.js).
- Middleware de protección en [middlewares/jwt.js](./middlewares/jwt.js).

## Subida de archivos

Las imágenes se procesan con `multer` y se envían a AWS S3 desde [config/multer.js](./config/multer.js).

Variables relacionadas:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

## Variables de entorno

No hay un `.env` versionado en el repo, pero el código espera al menos estas variables:

- `DB_URI`
- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `S3_BUCKET_NAME`

Ejemplo orientativo:

```env
PORT=3020
DB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/crunchy-munch
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=2h

AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=tu-bucket
```

## Instalación y ejecución

```bash
npm install
node index.js
```

Si quieres usar PM2, puedes tomar como referencia [config/ecosystem.config.mjs](./config/ecosystem.config.mjs).

## Rutas principales

La API queda montada bajo `/api`.

Rutas conocidas:

- `/api/auth`
- `/api/user`
- `/api/product`
- `/api/category`
- `/api/cookie`
- `/api/crookie`
- `/api/iceCream`
- `/api/pedidos`
- `/api/pqrs`
- `/api/superUser`
- `/api/superUserAuth`
- `/api/topping`
- `/api/vote`

Rutas fuera de `/api`:

- `/sitemap.xml`
- `/robots.txt`

## Flujo general de una petición

1. El router recibe la petición.
2. El controller valida y transforma los datos si hace falta.
3. El service ejecuta la lógica de negocio o consulta MongoDB.
4. El modelo de Mongoose representa la colección y sus relaciones.
5. El controller devuelve la respuesta HTTP.

## Notas

- No se encontraron scripts de migraciones ni seeds en el repositorio.
- No hay tests definidos en `package.json`.
- El proyecto está orientado a una API backend, no a una interfaz web.
