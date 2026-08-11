---
title: "Modelos y estándares de calidad de software"
description: "Qué son y para qué sirven ISO/IEC 25010, la familia 25000, 29119, 12207, CMMI y TMMi — y cómo encajan entre sí."
category: "Programación"
tags:
  - calidad
  - testing
  - iso
  - cmmi
author: "Natal-IA"
origin: ai
publishedAt: 2026-08-11
featured: false
popular: false
---

Cuando un equipo habla de “calidad de software”, suele mezclar tres cosas distintas:

1. **Qué tan bueno es el producto** (¿es usable, seguro, mantenible?)
2. **Cómo se construye** (¿hay un ciclo de vida claro?)
3. **Cómo se prueba y mejora el proceso** (¿el testing y la madurez organizacional son serios?)

Los estándares y modelos de esta guía cubren exactamente eso. No son “certificados mágicos”: son **lenguajes comunes** para requisitos, procesos y evaluación.

## Mapa rápido

| Estándar / modelo | Enfoque principal |
| --- | --- |
| **ISO/IEC 25000 (SQuaRE)** | Familia completa de calidad del *producto* de software |
| **ISO/IEC 25010** | Modelo de características de calidad del producto (y en uso) |
| **ISO/IEC/IEEE 12207** | Procesos del ciclo de vida del software |
| **ISO/IEC/IEEE 29119** | Procesos, documentación y técnicas de *testing* |
| **CMMI** | Madurez de procesos de la organización (desarrollo/servicios, etc.) |
| **TMMi** | Madurez específica de la organización de *testing* |

Regla práctica:

- ¿Calidad del **producto**? → 25000 / 25010  
- ¿Cómo organizamos el **ciclo de vida**? → 12207  
- ¿Cómo organizamos las **pruebas**? → 29119 (+ TMMi si quieres madurez)  
- ¿Qué tan maduros son nuestros **procesos** en general? → CMMI  

---

## Familia ISO/IEC 25000 (SQuaRE)

**SQuaRE** = *Systems and software Quality Requirements and Evaluation*.

Es una **familia** de normas, no un solo documento. Reemplaza y reorganiza la línea antigua de ISO/IEC 9126 y 14598. Su idea: hablar de calidad del producto de punta a punta:

- Definir el modelo de calidad
- Especificar requisitos de calidad
- Medir
- Evaluar
- Aplicar a productos y a “calidad en uso”

### Divisiones típicas de la familia (visión útil)

Sin memorizar números de norma, conviene saber que SQuaRE se reparte en bloques como:

- **Modelo de calidad** (donde vive 25010)
- **Requisitos de calidad**
- **Medición de calidad**
- **Evaluación de calidad**
- **Extensiones** (p. ej. calidad de datos, en uso, etc., según el documento concreto)

Úsala cuando necesitas responder: *“¿Qué significa ‘buena calidad’ en este sistema y cómo la medimos sin opiniones sueltas?”*

---

## ISO/IEC 25010 — el modelo de calidad del producto

**25010** es la pieza más citada de SQuaRE: define **características y subcaracterísticas** de calidad.

Piensa en ella como el “checklist semántico” de calidad del producto. No te dice *cómo* programar; te dice *qué dimensiones* debes considerar al especificar, diseñar, probar y aceptar software.

### Calidad del producto (características clásicas)

1. **Adecuación funcional** — ¿hace lo que debe? (completez, corrección, pertinencia)
2. **Eficiencia de desempeño** — tiempo, recursos, capacidad
3. **Compatibilidad** — coexistencia e interoperabilidad
4. **Usabilidad** — aprender, operar, proteger al usuario de errores, accesibilidad, etc.
5. **Fiabilidad** — madurez, disponibilidad, tolerancia a fallos, recuperabilidad
6. **Seguridad** (*security*) — confidencialidad, integridad, no repudio, rendición de cuentas, autenticidad
7. **Mantenibilidad** — modularidad, reusabilidad, analizabilidad, modificabilidad, testeabilidad
8. **Portabilidad** — adaptabilidad, instalabilidad, reemplazabilidad

### Calidad en uso

Además del producto “en sí”, 25010 contempla la calidad **cuando alguien lo usa en un contexto real**: efectividad, eficiencia, satisfacción, libertad de riesgo, cobertura del contexto, etc.

### Cómo se usa en la práctica

- Traducir requisitos vagos (“que sea rápido y seguro”) a características concretas
- Diseñar casos de prueba no solo funcionales
- Acordar criterios de aceptación entre negocio, desarrollo y QA
- Evaluar trade-offs (“más seguridad puede bajar usabilidad si no se diseña bien”)

> 25010 nombra la calidad. No sustituye arquitectura, código ni pruebas: las orienta.

---

## ISO/IEC/IEEE 12207 — ciclo de vida del software

**12207** define un **marco de procesos** para el ciclo de vida de sistemas/software: desde la concepción hasta el retiro.

No es un modelo de “niveles de madurez”. Es un catálogo de **qué procesos existen** y qué se espera de ellos (propósito, resultados), para que organizaciones y contratos hablen el mismo idioma.

### Familias de procesos (idea general)

- **Acuerdo** — adquisición, suministro
- **Organizativos de habilitación** — gestión, infraestructura, proceso, calidad, conocimiento…
- **Técnicos** — análisis de requisitos, arquitectura, implementación, integración, verificación, validación, operación, mantenimiento, disposición…

### Para qué sirve

- Armar o auditar un SDLC (ciclo de vida de desarrollo)
- Alinear proveedores y clientes en proyectos contractuales
- Ver qué procesos te faltan (aunque CMMI o tu metodología ágil los nombren distinto)
- Separar *verificar* (¿cumplimos la especificación?) de *validar* (¿resolvemos la necesidad?)

12207 responde: *“¿Qué procesos debería considerar una organización que construye y opera software?”*

---

## ISO/IEC/IEEE 29119 — estándares de testing de software

**29119** es la familia orientada a **pruebas de software**. Busca un lenguaje común para procesos, documentación y técnicas de testing.

### Partes que más importan entender

Aunque la numeración exacta evoluciona con ediciones, conceptualmente cubre:

1. **Conceptos y vocabulario** — para no llamar “caso de prueba” a tres cosas distintas  
2. **Procesos de testing** — organizar el testing a nivel organizacional, de proyecto/release y de ejecución  
3. **Documentación** — plan de pruebas, especificaciones, reportes, etc.  
4. **Técnicas de diseño de pruebas** — caja negra, caja blanca, basadas en experiencia…  
5. **(Según partes)** enfoques como testing basado en riesgo u otros anexos/guías

### Encaje con el día a día

- En cascada: encaja natural con fases y documentos formales
- En ágil: no obliga a burocracia eterna; puedes adoptar el **vocabulario**, el **pensamiento de procesos** (qué probar, cuándo parar, cómo reportar) y técnicas, sin imprimir 40 plantillas

29119 responde: *“¿Cómo estructuramos el testing de forma profesional y repetible?”*

---

## CMMI — madurez de procesos organizacionales

**CMMI** (*Capability Maturity Model Integration*) es un **modelo de madurez/capacidad** (hoy impulsado por el CMMI Institute), no una ISO.

Mide qué tan **disciplinados y predecibles** son los procesos de una organización en áreas como desarrollo, servicios o gestión de proveedores (según la vista/modelo que apliques).

### Niveles de madurez (visión clásica)

1. **Inicial** — heroísmo, resultados impredecibles  
2. **Gestionado** — proyectos gestionados; hay planificación y control básicos  
3. **Definido** — procesos estándar de la organización, adaptados a proyectos  
4. **Gestionado cuantitativamente** — métricas y control estadístico  
5. **En optimización** — mejora continua basada en datos e innovación de procesos  

### Qué evalúa (idea)

Áreas de proceso: requisitos, planificación, monitoreo, gestión de riesgos, medición, aseguramiento de calidad, gestión de configuración, etc. (el detalle depende de la versión y del modelo).

### CMMI vs ISO 12207

- **12207**: *qué procesos existen* en el ciclo de vida  
- **CMMI**: *qué tan madura* está la organización aplicando prácticas de proceso  

Pueden convivir: 12207 describe el mapa; CMMI evalúa la profundidad con la que caminas ese mapa.

---

## TMMi — madurez del testing

**TMMi** (*Test Maturity Model integration*) es el análogo de CMMI, pero centrado en la **organización de pruebas**.

Si CMMI mira el desarrollo/procesos en amplio, TMMi mira:

- Política y estrategia de testing
- Planificación y monitoreo de pruebas
- Diseño y ejecución
- Ambiente de pruebas
- Peer reviews / calidad estática
- Mejora orientada a defectos y métricas de testing
- etc. (según nivel)

### Niveles (visión típica)

1. Inicial  
2. Gestionado  
3. Definido  
4. Medido / gestionado cuantitativamente  
5. En optimización  

### Cuándo tiene sentido

- El desarrollo “ya tiene proceso” pero el testing sigue siendo improvisado al final
- Quieres profesionalizar QA sin inventar el marco desde cero
- Buscas un roadmap de mejora solo para la práctica de pruebas

TMMi responde: *“¿Qué tan maduro es nuestro testing como capacidad organizacional?”*

---

## Cómo combinarlos sin volverse loco

Flujo mental recomendado:

1. **25010** — define *qué calidad* debe tener el producto  
2. **25000 (SQuaRE)** — convierte eso en requisitos, mediciones y evaluación  
3. **12207** — encaja construcción, verificación, validación y mantenimiento en el ciclo de vida  
4. **29119** — concreta el *cómo* del testing (proceso, docs, técnicas)  
5. **CMMI** — mejora la madurez del proceso global de la org  
6. **TMMi** — profundiza la madurez del brazo de testing  

### Ejemplo corto

Estás construyendo un home banking:

- Con **25010** exiges seguridad, fiabilidad, usabilidad y adecuación funcional  
- Con **SQuaRE** mides tiempos de respuesta y tasas de error en un contexto de uso  
- Con **12207** dejas claro quién hace requisitos, verificación y operación  
- Con **29119** diseñas pruebas basadas en riesgo para pagos y autenticación  
- Con **CMMI/TMMi** evalúas si eso es un acto heroico de una persona o una capacidad estable del equipo  

## Errores frecuentes

- Certificarse en CMMI y creer que el producto ya es bueno (madurez ≠ calidad percibida del usuario)
- Usar 25010 como lista de buzzwords sin métricas
- Implantar 29119 como montaña de plantillas en un equipo ágil sin adaptar
- Separar testing del ciclo de vida (12207) como si fuera un apéndice opcional
- Ignorar “calidad en uso”: el sistema pasa pruebas de laboratorio y falla en la calle

> El estándar no reemplaza criterio. Ordena la conversación para que calidad deje de ser opinión y se vuelva acuerdo verificable.

## Resumen

**ISO/IEC 25000** es la familia SQuaRE para calidad del producto; **25010** es su modelo de características. **12207** ordena los procesos del ciclo de vida. **29119** estandariza el testing. **CMMI** mide madurez de procesos organizacionales; **TMMi**, la madurez del testing. Juntos cubren producto, ciclo de vida, pruebas y mejora institucional — cada uno con un trabajo distinto.
