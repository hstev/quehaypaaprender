---
title: "IAM en AWS: cómo funciona y cómo leer un ARN"
description: "Qué es IAM, cómo decide quién puede hacer qué, y una descomposición clara del ARN pieza por pieza."
category: "Tecnología"
tags:
  - aws
  - iam
  - cloud
  - seguridad
author: "Natal-IA"
origin: ai
publishedAt: 2026-08-11
featured: false
popular: false
---

**IAM** (Identity and Access Management) es el sistema de AWS que responde siempre la misma pregunta: *¿quién eres y qué tienes permitido hacer?*

No es un firewall ni un antivirus. Es el **control de acceso** a la API de AWS: crear un bucket, leer un secreto, apagar una instancia, asumir un rol…

## El modelo mental en 4 piezas

1. **Principal** — quién pide la acción (usuario, rol, servicio, cuenta)
2. **Acción** — qué quiere hacer (`s3:GetObject`, `ec2:TerminateInstances`)
3. **Recurso** — sobre qué lo quiere hacer (un bucket, una cola, `*`)
4. **Política** — el documento JSON que dice Allow o Deny

IAM evalúa eso en cada llamada a la API. Si no hay un Allow explícito (y no hay un Deny que gane), la respuesta por defecto es **denegar**.

## Identidades: usuarios, grupos y roles

### Usuario IAM

Identidad humana o de aplicación de larga vida dentro de *tu* cuenta. Puede tener:

- Contraseña (consola)
- Access keys (CLI/SDK)
- Políticas pegadas (inline) o adjuntas (managed)

Úsalos con cuidado: las access keys fijas son un riesgo clásico.

### Grupo

Colección de usuarios. No se autentica solo: sirve para **asignar políticas en bloque** (“todos los del grupo `developers` pueden leer logs”).

### Rol IAM

Identidad **asumible**. No tiene contraseña permanente típica de usuario; alguien (o algo) pide credenciales temporales con `sts:AssumeRole`.

Ejemplos reales:

- Una función Lambda que necesita leer DynamoDB
- Un usuario de otra cuenta que administra tu cuenta de staging
- EC2 con un *instance profile* para subir archivos a S3 sin access keys en el disco

> Regla práctica: prefiere **roles + credenciales temporales** frente a access keys eternas.

## Políticas: dónde vive el “sí” y el “no”

Una política es JSON con `Statement`s. Cada statement suele tener:

- `Effect`: `Allow` o `Deny`
- `Action`: acciones de API
- `Resource`: ARNs (o `*`)
- `Condition` (opcional): IP, MFA, tags, hora, etc.

Hay dos “formas” de aplicarlas:

- **Identity-based**: van en el usuario/grupo/rol (“este rol puede…”).
- **Resource-based**: van en el recurso (“este bucket permite a…”), típico en S3, SQS, SNS, KMS, etc.

### Deny gana

Si cualquier Deny aplicable entra en juego, corta el Allow. Por eso existen políticas de guardrail (“nadie borra producción aunque tenga Admin”).

### Least privilege

Empieza estrecho: acciones mínimas + recursos concretos. Ampliar es fácil; descubrir una key con `*` demasiado tarde, no.

## Cómo IAM toma la decisión (versión útil)

Cuando llamas a AWS:

1. Autentica al principal (firma SigV4 con claves o sesión)
2. Junta políticas aplicables (identidad, recurso, SCP de Organizations, permisos de sesión, boundaries…)
3. Si hay **Deny explícito** → deniega
4. Si hay **Allow** que cubre acción + recurso + condiciones → permite
5. Si no → **deniega por defecto**

En organizaciones grandes, los **SCP** (Service Control Policies) pueden limitar incluso a Administrators de la cuenta.

---

## El ARN: el “DNI” de casi todo en AWS

**ARN** = *Amazon Resource Name*. Es un identificador único que apunta a un recurso (o a un tipo de recurso) en AWS.

IAM lo usa todo el tiempo en `Resource`, en trust policies, en logs y en la consola. Si aprendes a **leerlo en voz alta**, IAM deja de sentirse mágico.

### Anatomía general

Formato canónico:

```text
arn:partition:service:region:account-id:resource-id
```

A veces el `resource-id` trae un **tipo** y un **path**:

```text
arn:partition:service:region:account-id:resource-type/resource-id
arn:partition:service:region:account-id:resource-type:resource-id
```

(El separador después del tipo puede ser `/` o `:` según el servicio.)

### Descomposición pieza por pieza

Tomemos un ejemplo realista de S3:

```text
arn:aws:s3:::mi-bucket-prod/fotos/gatos.png
```

| Parte | En el ejemplo | Qué significa |
| --- | --- | --- |
| `arn` | `arn` | Prefijo fijo: “esto es un ARN” |
| `partition` | `aws` | Universo de AWS. Lo normal es `aws`. En China suele ser `aws-cn`; en GovCloud, `aws-us-gov` |
| `service` | `s3` | El servicio dueño del recurso (`s3`, `iam`, `ec2`, `lambda`, `dynamodb`…) |
| `region` | *(vacío)* | Región. **S3 buckets son globales en el ARN**: por eso va vacío (`::`). En Lambda/EC2 verás `us-east-1`, `eu-west-1`, etc. |
| `account-id` | *(vacío)* | ID de 12 dígitos de la cuenta. En buckets S3 también suele ir vacío en el ARN del objeto/bucket; en IAM roles, Lambda, etc., **sí aparece** |
| `resource` | `mi-bucket-prod/fotos/gatos.png` | Identifica el recurso. Aquí: bucket + key del objeto |

Lee el ejemplo así:

> “ARN en la partición comercial de AWS, servicio S3, sin región ni account en este formato, recurso: objeto `fotos/gatos.png` dentro de `mi-bucket-prod`.”

### Más ejemplos descompuestos

**Rol IAM**

```text
arn:aws:iam::123456789012:role/AppBackendRole
```

| Pieza | Valor |
| --- | --- |
| partition | `aws` |
| service | `iam` |
| region | vacío (IAM es global) |
| account-id | `123456789012` |
| resource | `role/AppBackendRole` (tipo `role` + nombre) |

**Función Lambda**

```text
arn:aws:lambda:us-east-1:123456789012:function:procesar-pagos
```

| Pieza | Valor |
| --- | --- |
| region | `us-east-1` |
| account-id | `123456789012` |
| resource | `function:procesar-pagos` |

**Cola SQS**

```text
arn:aws:sqs:eu-west-1:123456789012:cola-pedidos
```

**Usuario IAM**

```text
arn:aws:iam::123456789012:user/laura
```

**Secret en Secrets Manager**

```text
arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/db-a1b2c3
```

### Por qué a veces ves `*` dentro del ARN

En políticas es común:

```text
arn:aws:s3:::mi-bucket-prod/*
```

Eso no es “un objeto llamado `*`”. Es un **patrón**: cualquier objeto bajo ese bucket. También verás:

```text
arn:aws:s3:::mi-bucket-prod/fotos/*
arn:aws:logs:us-east-1:123456789012:log-group:/aws/lambda/*:*
```

IAM hace matching de patrones en `Resource` (y a veces en otras claves). Entender el ARN te permite acotar el blast radius.

### Detalle que confunde: S3 vs casi todo lo demás

Para **acciones sobre objetos**, el recurso suele ser el ARN del objeto:

```json
"Resource": "arn:aws:s3:::mi-bucket-prod/fotos/*"
```

Para **acciones sobre el bucket** (`s3:ListBucket`, `s3:GetBucketPolicy`…), el recurso es el bucket:

```json
"Resource": "arn:aws:s3:::mi-bucket-prod"
```

Si mezclas mal acción/recurso, obtienes denegaciones “raras” aunque creas tener permisos.

### IAM policy de ejemplo leyendo ARNs

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LeerObjetosDeFotos",
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::mi-bucket-prod/fotos/*"
    },
    {
      "Sid": "ListarSoloPrefijoFotos",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::mi-bucket-prod",
      "Condition": {
        "StringLike": {
          "s3:prefix": ["fotos/*"]
        }
      }
    }
  ]
}
```

Traducción:

- Puede **bajar objetos** solo bajo `fotos/`
- Puede **listar** el bucket, pero solo viendo ese prefijo

Sin leer el ARN, esa política parece “magia S3”. Con el ARN, es preciso.

### Trust policy: el ARN del *quién puede asumir el rol*

Un rol tiene permisos (qué puede hacer) y una **trust policy** (quién puede asumirlo). Ahí también hay ARNs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::111122223333:root"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Aquí el ARN identifica a la **cuenta** `111122223333` como quien puede pedir el rol (luego esa cuenta aún necesita permiso `sts:AssumeRole` hacia tu rol).

También es común confiar en un servicio:

```json
"Principal": { "Service": "lambda.amazonaws.com" }
```

(En ese caso no va un ARN de cuenta, sino el servicio como principal.)

---

## Cómo practicar lectura de ARNs

Cuando veas uno, pregúntate en orden:

1. ¿Qué **servicio** es?
2. ¿Tiene **región** o es global (IAM, S3 bucket)?
3. ¿De qué **cuenta** es?
4. ¿Cuál es el **tipo** de recurso (`role`, `function`, `user`, `secret`…)?
5. ¿El final es un nombre exacto o un patrón con `*`?

Si puedes responder eso en voz alta, ya estás usando IAM con criterio.

## Errores frecuentes

- Dar `Resource: "*"` “para que funcione” y olvidarlo
- Usar ARN de bucket en `GetObject` (o al revés)
- Confundir nombre del rol con su ARN completo al compartir entre cuentas
- Crear usuarios con access keys donde bastaba un rol
- No revisar el **Deny** de otra política o un SCP

> IAM no es memorizar servicios: es nombrar bien *quién*, *qué acción* y *qué ARN*.

## Resumen

IAM autoriza cada llamada a AWS con principales, acciones, recursos y políticas; por defecto deniega. El **ARN** es la dirección estable del recurso: `arn:partición:servicio:región:cuenta:recurso`. Aprende a descomponerlo (sobre todo región vacía, account-id y la cola del resource-type) y las políticas dejan de ser JSON opaco para volverse instrucciones legibles.
