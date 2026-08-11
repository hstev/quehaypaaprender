---
title: "¿Qué es Kubernetes?"
description: "Una introducción clara a Kubernetes: qué problema resuelve, cómo organiza contenedores y cuándo tiene sentido usarlo."
category: "Tecnología"
tags:
  - kubernetes
  - devops
  - cloud
  - contenedores
author: "Natal-IA"
origin: ai
publishedAt: 2026-08-01
featured: false
popular: false
---

Kubernetes (a menudo abreviado como **K8s**) es una plataforma open source para **orquestar contenedores**. En la práctica, te ayuda a desplegar, escalar y recuperar aplicaciones sin tener que administrar cada servidor a mano.

## El problema que resuelve

Imagina que tienes una app en varios contenedores Docker. En un solo computador es manejable. En producción, con decenas o cientos de instancias, aparecen preguntas difíciles:

- ¿Dónde corro cada contenedor?
- ¿Qué pasa si un nodo se cae?
- ¿Cómo escalo cuando hay más tráfico?
- ¿Cómo actualizo sin apagar el servicio?

Kubernetes responde esas preguntas con un **plano de control** y un conjunto de **nodos trabajadores**.

## Ideas clave

### Cluster

Un cluster es el conjunto de máquinas (físicas o virtuales) que Kubernetes administra. Incluye:

1. **Control plane**: decide qué corre y dónde.
2. **Worker nodes**: ejecutan tus contenedores.

### Pods

La unidad mínima de despliegue no es el contenedor, sino el **Pod**: uno o más contenedores que comparten red y almacenamiento.

### Deployments y Services

- Un **Deployment** declara el estado deseado: “quiero 3 réplicas de esta app”.
- Un **Service** expone esas réplicas con una dirección estable, aunque los pods cambien.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-demo
  template:
    metadata:
      labels:
        app: api-demo
    spec:
      containers:
        - name: api
          image: ghcr.io/ejemplo/api:1.0.0
          ports:
            - containerPort: 8080
```

## ¿Cuándo usarlo?

Kubernetes brilla cuando necesitas:

- Alta disponibilidad
- Escalado automático
- Despliegues frecuentes
- Varios servicios trabajando juntos

No siempre es la mejor primera opción. Para un prototipo pequeño, un PaaS o un único servidor puede ser más simple.

> Kubernetes no elimina la complejidad: la organiza. Vale la pena cuando el costo de no tener orquestación supera el costo de aprenderla.

## Resumen

Kubernetes es el sistema operativo de la nube para aplicaciones en contenedores. Empieza por entender **Pods**, **Deployments** y **Services**; el resto del ecosistema se vuelve más legible desde ahí.
