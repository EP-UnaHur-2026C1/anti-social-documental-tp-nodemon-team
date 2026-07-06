# Feedback del Trabajo Práctico (TP2 — MongoDB)

## Integrantes

A partir de los commits del repositorio:

- **Tobías Ramírez** (`tobiasramirez`)
- **Tomás** (`Toms200319`)
- **Agustín Santiago Frecha**

> Trabajo repartido entre los tres integrantes. 👏

---

## Resumen General

¡Buen trabajo! 🎉 La entrega cumple el MVP con un modelado documental **referenciado** ordenado, CRUD de cada entidad, endpoints para las relaciones, y la **regla de los comentarios antiguos aplicada** al ver el detalle de un post. La documentación incluye Swagger (YAML) y colección de Postman.

Los puntos a ajustar tienen que ver con hacer **configurable** esa regla (hoy no se puede) y con la validación del formato de los `ObjectId`.

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras (controllers / models / middlewares / routes). |
| Modelado        |   ✅   | Referenciado coherente; `nickname` único. |
| Validaciones    |   ⚠️   | Validación de Mongoose, pero el chequeo de `ObjectId` falla (Obs. 2). |
| Middlewares     |   ⚠️   | `validarId` genérico, pero con la lógica de `ObjectId` incorrecta. |
| API REST        |   ✅   | CRUD + relaciones (imágenes, tags) completos. |
| Configuración   |   ⚠️   | No se cargan variables de entorno (Obs. 1). |
| Documentación   |   ✅   | `swagger.yml` y colección de Postman. |

---

## Fortalezas

### 1. Regla de comentarios antiguos aplicada ⏳
**Ubicación:** `src/controllers/postController.js` (`getPostById`, `calcularLimiteVisibilidad`)

Al traer el detalle de un post, los comentarios se filtran por antigüedad en la consulta:

```js
const comments = await Comment.find({ post: post._id, createdAt: { $gte: calcularLimiteVisibilidad() } })
```

Se aplica donde se muestran los comentarios; falta solo que el umbral salga del entorno (ver Obs. 1). 🎯

### 2. Modelado referenciado y borrado consistente 🗃️
**Ubicación:** `src/models/`, `src/controllers/postController.js` (`deletePost`)

Entidades separadas con referencias (`user`, `post`, `tags`), `nickname` único, y al borrar un post también se borran sus comentarios e imágenes (evita documentos huérfanos). Los tags se resuelven con `findOneAndUpdate(..., { upsert: true })`, una buena forma de “buscar o crear”.

### 3. Documentación y colección de prueba 📚
**Ubicación:** `swagger.yml`, `UnaHur Anti-Social API.postman_collection.json`, `docker-compose.yml`

Incluyeron la documentación en formato Swagger YAML, una colección de Postman y `docker-compose`. Buen cumplimiento de los entregables de documentación.

---

## Observaciones

### 1. La regla no es configurable: no se cargan variables de entorno

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/main.js`, `src/config/db.js`, `src/controllers/postController.js` y `commentController.js`

**Descripción:**
El código lee la cantidad de meses desde `process.env`, pero:

- **No usan `dotenv`** (no está en las dependencias ni se llama a `require('dotenv').config()`), y no hay un `.env`, así que las variables nunca se cargan.
- Además, el nombre de la variable **no coincide** entre controladores: `postController` usa `COMMENT_VISIBILITY_MONTHS` y `commentController` usa `COMMENT_MES_LIMITE`.

**Impacto:**
La regla funciona, pero con el valor por defecto (6) fijo: no se puede configurar como pide el enunciado.

**Recomendación:**
Agregar `dotenv` y cargarlo al inicio (`require('dotenv').config()`), crear un `.env` (y `.env.example`), y unificar **un único** nombre de variable (por ejemplo `COMMENT_VISIBILITY_MONTHS`) en ambos controladores.

---

### 2. La validación del formato de `ObjectId` es incorrecta

**Estado:** ⚠️  **Severidad:** 🟠 Importante
**Ubicación:** `src/middlewares/validarId.middleware.js`

**Descripción:**
`validarId` valida el id con un regex **alfanumérico** (`/^[a-zA-Z0-9]+$/`) en lugar de `mongoose.Types.ObjectId.isValid`, y además ejecuta `modelo.findById(id)` **antes** de validar el formato. Si el id no es un `ObjectId` válido, `findById` lanza un `CastError` y la ruta responde **500** en vez de **400**.

**Impacto:**
Ids mal formados producen un error de servidor en lugar de un error de validación claro, y el regex deja pasar strings que no son `ObjectId`.

**Recomendación:**
Validar primero el formato y recién después consultar la base:

```js
if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID no válido' });
const instance = await modelo.findById(id);
if (!instance) return res.status(404).json({ message: 'No encontrado' });
```

---

### 3. La lista de posts no incluye comentarios

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/controllers/postController.js` (`getPost`)

**Descripción:**
`getPostById` incluye los comentarios (filtrados), pero `getPost` (lista) solo trae `user` y `tags`. No es un error —al no incluirlos, no se filtran de más—, pero es una inconsistencia entre ambas vistas.

**Recomendación:**
Si se espera ver comentarios también en la lista, aplicar el mismo filtro por antigüedad reutilizando `calcularLimiteVisibilidad`.

---

## Conclusión

Es una entrega correcta y ordenada: modelado referenciado coherente, la regla de negocio aplicada en el detalle, borrado consistente y buena documentación. 🌟

Los focos son hacer **configurable** la regla (cargar `dotenv` + unificar la variable) y **corregir la validación de `ObjectId`**. Son ajustes acotados y bien localizados. ¡Felicitaciones por el trabajo del equipo! 🚀
