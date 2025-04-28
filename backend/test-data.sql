-- Insertar compañía
INSERT INTO "Company" (id, name) VALUES (1, 'Empresa Test');

-- Insertar flujo de entrevista
INSERT INTO "InterviewFlow" (id, description) VALUES (1, 'Flujo de entrevista estándar');

-- Insertar tipo de entrevista
INSERT INTO "InterviewType" (id, name, description) VALUES (1, 'Técnica', 'Entrevista técnica');

-- Insertar pasos de entrevista
INSERT INTO "InterviewStep" (id, "interviewFlowId", "interviewTypeId", name, "orderIndex") 
VALUES (1, 1, 1, 'Entrevista inicial', 1);

-- Insertar posición
INSERT INTO "Position" (id, "companyId", "interviewFlowId", title, description, status, location, "jobDescription")
VALUES (1, 1, 1, 'Desarrollador Web', 'Posición para desarrollador web frontend', 'Activa', 'Remoto', 'Desarrollo de aplicaciones web modernas');

-- Insertar candidatos
INSERT INTO "Candidate" (id, "firstName", "lastName", email, phone, address)
VALUES 
(1, 'Juan', 'Pérez', 'juan@example.com', '123456789', 'Calle Falsa 123'),
(2, 'María', 'López', 'maria@example.com', '987654321', 'Avenida Siempre Viva 742');

-- Insertar aplicaciones
INSERT INTO "Application" (id, "positionId", "candidateId", "applicationDate", "currentInterviewStep", notes)
VALUES 
(1, 1, 1, '2023-06-01', 1, 'Candidato prometedor'),
(2, 1, 2, '2023-06-02', 1, 'Buena experiencia técnica');

-- Insertar empleados para entrevistas
INSERT INTO "Employee" (id, "companyId", name, email, role, "isActive")
VALUES (1, 1, 'Ana Reclutadora', 'ana@empresa.com', 'RRHH', true);

-- Insertar entrevistas con puntuación
INSERT INTO "Interview" (id, "applicationId", "interviewStepId", "employeeId", "interviewDate", result, score, notes)
VALUES 
(1, 1, 1, 1, '2023-06-05', 'Aprobado', 85, 'Buen conocimiento técnico'),
(2, 2, 1, 1, '2023-06-06', 'Aprobado', 92, 'Excelente comunicación'); 