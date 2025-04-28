import { Router } from 'express';
import { getCandidatesByPositionId } from '../presentation/controllers/positionController';

const router = Router();

/**
 * @route GET /positions/:id/candidates
 * @description Get all candidates for a specific position
 * @param {string} id - Position ID
 * @returns {Array} - List of candidates with their current interview step and average score
 */
router.get('/:id/candidates', getCandidatesByPositionId);

export default router; 