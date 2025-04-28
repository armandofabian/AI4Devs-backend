import { Candidate } from '../../domain/models/Candidate';
import { validateCandidateData } from '../validator';
import { Education } from '../../domain/models/Education';
import { WorkExperience } from '../../domain/models/WorkExperience';
import { Resume } from '../../domain/models/Resume';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addCandidate = async (candidateData: any) => {
    try {
        validateCandidateData(candidateData); // Validar los datos del candidato
    } catch (error: any) {
        throw new Error(error);
    }

    const candidate = new Candidate(candidateData); // Crear una instancia del modelo Candidate
    try {
        const savedCandidate = await candidate.save(); // Guardar el candidato en la base de datos
        const candidateId = savedCandidate.id; // Obtener el ID del candidato guardado

        // Guardar la educación del candidato
        if (candidateData.educations) {
            for (const education of candidateData.educations) {
                const educationModel = new Education(education);
                educationModel.candidateId = candidateId;
                await educationModel.save();
                candidate.education.push(educationModel);
            }
        }

        // Guardar la experiencia laboral del candidato
        if (candidateData.workExperiences) {
            for (const experience of candidateData.workExperiences) {
                const experienceModel = new WorkExperience(experience);
                experienceModel.candidateId = candidateId;
                await experienceModel.save();
                candidate.workExperience.push(experienceModel);
            }
        }

        // Guardar los archivos de CV
        if (candidateData.cv && Object.keys(candidateData.cv).length > 0) {
            const resumeModel = new Resume(candidateData.cv);
            resumeModel.candidateId = candidateId;
            await resumeModel.save();
            candidate.resumes.push(resumeModel);
        }
        return savedCandidate;
    } catch (error: any) {
        if (error.code === 'P2002') {
            // Unique constraint failed on the fields: (`email`)
            throw new Error('The email already exists in the database');
        } else {
            throw error;
        }
    }
};

export const findCandidateById = async (id: number): Promise<Candidate | null> => {
    try {
        const candidate = await Candidate.findOne(id); // Cambio aquí: pasar directamente el id
        return candidate;
    } catch (error) {
        console.error('Error al buscar el candidato:', error);
        throw new Error('Error al recuperar el candidato');
    }
};

/**
 * Actualiza la etapa de entrevista para un candidato específico
 * @param candidateId ID del candidato
 * @param stageId ID de la nueva etapa de entrevista
 * @returns true si la actualización fue exitosa, false si no se encontró el candidato o aplicación
 */
export const updateCandidateInterviewStage = async (candidateId: number, stageId: number): Promise<boolean> => {
    try {
        // Verificar si el candidato existe
        const candidate = await prisma.candidate.findUnique({
            where: { id: candidateId }
        });

        if (!candidate) {
            throw new Error(`Candidato con ID ${candidateId} no encontrado`);
        }

        // Verificar si la etapa de entrevista existe
        const interviewStep = await prisma.interviewStep.findUnique({
            where: { id: stageId }
        });

        if (!interviewStep) {
            throw new Error(`Etapa de entrevista con ID ${stageId} no encontrada`);
        }

        // Buscar aplicaciones activas del candidato
        const application = await prisma.application.findFirst({
            where: { candidateId }
        });

        if (!application) {
            return false; // El candidato no tiene aplicaciones
        }

        // Actualizar la etapa de entrevista en la aplicación
        await prisma.application.update({
            where: { id: application.id },
            data: { currentInterviewStep: stageId }
        });

        return true;
    } catch (error) {
        console.error('Error al actualizar la etapa de entrevista:', error);
        throw error;
    }
};
