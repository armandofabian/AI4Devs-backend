import { Request, Response } from 'express';
import { getCandidatesByPosition } from '../../application/services/positionService';


/**
 * Controller to get all candidates for a specific position
 * @param req Express request object
 * @param res Express response object
 */
export const getCandidatesByPositionId = async (req: Request, res: Response) => {
    try {
        const positionId = parseInt(req.params.id);
        
        if (isNaN(positionId)) {
            return res.status(400).json({ error: 'El ID de posición proporcionado no es válido' });
        }
        
        const candidates = await getCandidatesByPosition(positionId);
        
        if (candidates.length === 0) {
            return res.status(404).json({ message: 'No se encontraron candidatos para esta posición' });
        }
        
        res.status(200).json(candidates);
    } catch (error) {
        console.error('Error al obtener candidatos por posición:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: `Error al obtener candidatos: ${error.message}` });
        } else {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}; 