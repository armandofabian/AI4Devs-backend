import { Router } from 'express';
import { addCandidate, getCandidateById, updateCandidateStage } from '../presentation/controllers/candidateController';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // console.log(req.body); //Just in case you want to inspect the request body
    const result = await addCandidate(req.body);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ message: error.message });
    } else {
      res.status(500).send({ message: "An unexpected error occurred" });
    }
  }
});

router.get('/:id', getCandidateById);

/**
 * @route PUT /candidates/:id/stage
 * @description Actualiza la etapa del proceso de entrevista de un candidato
 * @param {string} id - ID del candidato
 * @param {number} stage - ID de la nueva etapa de entrevista
 */
router.put('/:id/stage', updateCandidateStage);

export default router;
