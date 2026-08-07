---
title: "Cómo funciona Git"
description: "Los conceptos esenciales de Git explicados sin miedo: commits, ramas, merge y el flujo diario de trabajo."
category: "Programación"
tags:
  - git
  - control-de-versiones
  - colaboración
author: "Sofía Vargas"
publishedAt: 2026-07-18
featured: false
popular: true
---

Git es un sistema de **control de versiones**. Guarda la historia de tu código para que puedas experimentar, colaborar y volver atrás sin perder el trabajo.

## Tres áreas

1. **Working directory**: tus archivos actuales.
2. **Staging area**: lo que preparas para el próximo commit.
3. **Repositorio**: el historial guardado.

```bash
git status
git add README.md
git commit -m "Documentar instalación"
```

## Commits: fotos del proyecto

Un commit es una instantánea con mensaje. No es un “guardar archivo”: es un punto en la línea de tiempo del proyecto.

Buenos mensajes describen el *porqué*:

- `fix: corregir cálculo de IVA en checkout`
- `feat: agregar filtro por categoría`

## Ramas

Una rama es una línea de trabajo independiente. La rama `main` suele ser la estable. Creas ramas para features o correcciones:

```bash
git switch -c feature/busqueda
```

Cuando terminas, integras los cambios con un merge o pull request.

## Flujo diario típico

1. Actualizas tu rama base
2. Creas una rama nueva
3. Haces commits pequeños y claros
4. Publicas y abres un PR
5. Revisas, ajustas y fusionas

> Git se siente complejo al inicio porque modela colaboración real. Domina `status`, `diff`, `commit` y `switch` antes de memorizar comandos avanzados.

## Conflictos (sin drama)

Un conflicto aparece cuando dos cambios tocan la misma zona. Git te pide decidir. No es un error fatal: es una conversación entre versiones.

## Resumen

Git no es solo para “subir a GitHub”. Es tu red de seguridad creativa: prueba ideas, colabora y conserva historia. El resto de comandos se aprende sobre esa base.
