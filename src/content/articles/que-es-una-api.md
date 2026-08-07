---
title: "¿Qué es una API?"
description: "Explicación sencilla de qué es una API, cómo se comunica el software y por qué aparece en casi todo lo digital."
category: "Programación"
tags:
  - api
  - http
  - backend
  - fundamentos
author: "Andrés Quintero"
publishedAt: 2026-07-22
featured: true
popular: true
---

Una **API** (Application Programming Interface) es un contrato que permite que dos sistemas se hablen sin conocer los detalles internos del otro.

Piensa en un menú de restaurante: no necesitas entrar a la cocina para pedir un plato. El menú te dice qué puedes pedir y qué recibirás.

## En la práctica

Cuando una app móvil muestra el clima, casi nunca calcula el clima ella misma. Llama a un servicio externo mediante una API:

1. La app envía una solicitud (`GET /weather?city=Bogota`)
2. El servidor responde con datos (JSON)
3. La app muestra temperatura y condiciones

```http
GET /v1/weather?city=Bogota HTTP/1.1
Host: api.ejemplo.com
Accept: application/json
```

```json
{
  "city": "Bogotá",
  "tempC": 17,
  "condition": "nublado"
}
```

## Tipos comunes

### REST

Usa HTTP y recursos con URLs claras. Es el estilo más extendido en la web.

### GraphQL

El cliente pide exactamente los campos que necesita en una sola consulta.

### APIs de librerías

También hay APIs dentro del código: funciones y clases que otros módulos pueden usar.

## Conceptos útiles

- **Endpoint**: la dirección de una operación.
- **Método HTTP**: `GET`, `POST`, `PUT`, `DELETE`…
- **Status code**: `200` ok, `404` no encontrado, `500` error del servidor.
- **Autenticación**: tokens o llaves para controlar el acceso.

> Una buena API es predecible, documentada y estable. El mejor diseño es el que otros pueden usar sin adivinar.

## Por qué importa

Las APIs permiten:

- Separar frontend y backend
- Integrar pagos, mapas, IA, correo…
- Escalar equipos que trabajan en paralelo
- Reutilizar la misma lógica en web, móvil y partners

## Resumen

Una API no es “magia de backend”: es una interfaz de comunicación. Si entiendes solicitudes, respuestas y contratos, ya tienes el mapa mental para casi cualquier integración moderna.
