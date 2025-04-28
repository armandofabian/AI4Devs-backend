CURSOR CLAUDE-3.7.SONNET

PROMPT 1

Analiza el backend para que tengas clara la estructura

PROMPT 2
No realices nada , primero dame el plan a seguir para lo siguiente Requiero crear 2 endpont para manipular la lista de candidatos, el primero es:

# GET /positions/:id/candidates

Este endpoint recogerá todos los candidatos en proceso para una determinada posición, es decir, todas las aplicaciones para un determinado `positionID`.

## Información proporcionada:

- **Nombre completo del candidato**  
  (obtenido de la tabla `candidate`).

- **current_interview_step**  
  Fase actual del proceso en la que se encuentra el candidato  
  (obtenido de la tabla `application`).

- **Puntuación media del candidato**  
  Calculada a partir de las puntuaciones (`score`) de cada `interview` realizada por el candidato.

---

Prompt 3
Procede con la implementacion

Prompt 4
vamos a probar el endpont generado

Respuesta de prueba

Hemos obtenido los dos candidatos que agregamos para la posición con ID 1, junto con la información requerida.
Para facilitar la lectura, aquí está la respuesta formateada:
[
{
"candidateId": 1,
"fullName": "Juan Pérez",
"currentInterviewStep": "Entrevista inicial",
"averageScore": 85,
"applicationId": 1
},
{
"candidateId": 2,
"fullName": "María López",
"currentInterviewStep": "Entrevista inicial",
"averageScore": 92,
"applicationId": 2
}
]

Prompt 5

Vamos a implementar el segundo end pont que es el siguiente: # PUT /candidates/:id/stage

Este endpoint actualizará la etapa del candidato movido.  
Permite modificar la fase actual del proceso de entrevista en la que se encuentra un candidato específico.

## Parámetros:

- `id`: ID del candidato que se desea actualizar.
- `stage`: Nueva etapa o fase del proceso de entrevista.

## Descripción:

Actualiza el campo `current_interview_step` en la aplicación (`application`) correspondiente al candidato.

---
