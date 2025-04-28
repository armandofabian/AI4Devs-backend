import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Interface for the response data structure
 */
interface CandidatePositionResponse {
    candidateId: number;
    fullName: string;
    currentInterviewStep: string;
    averageScore: number | null;
    applicationId: number;
}

// Tipo para la aplicación con relaciones incluidas
interface ApplicationWithRelations {
    id: number;
    candidateId: number;
    positionId: number;
    applicationDate: Date;
    currentInterviewStep: number;
    notes: string | null;
    candidate: { firstName: string; lastName: string };
    interviewStep: { name: string };
    interviews: { score: number | null }[];
}

/**
 * Get all candidates for a specific position with their average interview score
 * @param positionId The ID of the position
 * @returns Array of candidates with their info
 */
export const getCandidatesByPosition = async (positionId: number): Promise<CandidatePositionResponse[]> => {
    try {
        // Verificar si la posición existe
        const position = await prisma.position.findUnique({
            where: { id: positionId }
        });

        if (!position) {
            throw new Error(`La posición con ID ${positionId} no existe`);
        }

        // Obtener todas las aplicaciones para esta posición incluyendo los datos necesarios
        const applications = await prisma.application.findMany({
            where: { positionId },
            include: {
                candidate: true,
                interviewStep: true,
                interviews: {
                    select: {
                        score: true
                    }
                }
            }
        });

        // Transformar los datos para el formato de respuesta requerido
        const candidatesData: CandidatePositionResponse[] = applications.map((application: ApplicationWithRelations) => {
            // Calcular la puntuación media de las entrevistas
            const validScores = application.interviews
                .filter((interview: { score: number | null }) => interview.score !== null)
                .map((interview: { score: number | null }) => interview.score as number);
            
            const averageScore = validScores.length > 0
                ? parseFloat((validScores.reduce((sum: number, score: number) => sum + score, 0) / validScores.length).toFixed(1))
                : null;

            return {
                candidateId: application.candidateId,
                fullName: `${application.candidate.firstName} ${application.candidate.lastName}`,
                currentInterviewStep: application.interviewStep.name,
                averageScore,
                applicationId: application.id
            };
        });

        return candidatesData;
    } catch (error) {
        console.error('Error en getCandidatesByPosition:', error);
        throw error;
    }
}; 