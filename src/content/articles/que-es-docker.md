---
title: "Qué es Docker"
description: "Entiende contenedores, imágenes y por qué Docker simplifica el desarrollo y el despliegue de aplicaciones."
category: "Tecnología"
tags:
  - docker
  - contenedores
  - devops
author: "Mateo Cárdenas"
publishedAt: 2026-07-12
featured: false
popular: false
---

Docker empaqueta una aplicación con sus dependencias en un **contenedor**: un entorno reproducible que corre igual en tu laptop y en producción.

## Imagen vs contenedor

- **Imagen**: plantilla inmutable (receta).
- **Contenedor**: instancia en ejecución de esa imagen.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

## ¿Por qué importa?

Antes era común oír: “en mi máquina sí funciona”. Docker reduce esa fricción al fijar:

- Sistema base
- Runtime
- Dependencias
- Comandos de arranque

## Comandos esenciales

```bash
docker build -t mi-app .
docker run --rm -p 3000:3000 mi-app
docker ps
```

## Contenedores y orquestación

Docker resuelve el empaquetado. Cuando tienes muchos contenedores, herramientas como Kubernetes ayudan a orquestarlos. Empieza por Docker; escala la complejidad solo cuando la necesites.

> Un contenedor no reemplaza buena arquitectura. Empaqueta lo que construyes; no corrige por arte de magia un diseño confuso.

## Resumen

Docker es una forma práctica de decir: “esta app se ejecuta así”. Si trabajas en equipos o despliegues frecuentes, esa predictibilidad vale oro.
