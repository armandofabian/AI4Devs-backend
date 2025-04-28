import { Request, Response } from 'express';
import { addCandidate, findCandidateById, updateCandidateInterviewStage } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * Controlador para actualizar la etapa de entrevista de un candidato
 * @param req Request - Incluye el ID del candidato y la nueva etapa
 * @param res Response
 */
export const updateCandidateStage = async (req: Request, res: Response) => {
    try {
        const candidateId = parseInt(req.params.id);
        const stageId = parseInt(req.body.stage);

        if (isNaN(candidateId)) {
            return res.status(400).json({ error: 'ID de candidato inválido' });
        }

        if (isNaN(stageId)) {
            return res.status(400).json({ error: 'ID de etapa inválido' });
        }

        const updated = await updateCandidateInterviewStage(candidateId, stageId);
        
        if (!updated) {
            return res.status(404).json({ 
                error: 'No se pudo actualizar la etapa', 
                message: 'Candidato no encontrado o no tiene una aplicación activa' 
            });
        }

        res.status(200).json({ 
            message: 'Etapa del candidato actualizada con éxito',
            candidateId,
            newStage: stageId
        });
    } catch (error) {
        console.error('Error al actualizar etapa del candidato:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: `Error al actualizar: ${error.message}` });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

export { addCandidate };