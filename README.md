# Que hay pa' aprender?

Plataforma educativa **sin ánimo de lucro** para compartir conocimiento claro, visual y accesible.

> Conocimiento para todos. Gratis, abierto y sin humo.

## Stack

- [Astro](https://astro.build) + TypeScript
- Content Collections (Markdown / MDX)
- CSS moderno (design tokens)
- Generación 100% estática

## Desarrollo

Requiere Node.js 22+.

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Agregar un artículo

Crea un archivo Markdown en `src/content/articles/`:

```md
---
title: "Tu concepto claro"
description: "Qué aprenderá la persona lectora."
category: "Tecnología"
tags:
  - ejemplo
author: "Tu nombre"
publishedAt: 2026-08-07
featured: false
popular: false
---

Contenido en Markdown…
```

Las rutas se generan automáticamente en `/articulos/[slug]/`.

## Estructura

```text
src/
├── content/articles/   # Markdown de artículos
├── components/         # UI reutilizable
├── layouts/
├── pages/
├── styles/
└── lib/
```

## Licencia

Proyecto abierto y sin ánimo de lucro. Aprender es gratis. Compartir también.
