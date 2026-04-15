import express from 'express';
import {
    getVotes2026,
    createVote2026,
    getStatistics2026,
    checkVote2026,
    checkVote2026ByEmail,
    getVote2026,
    removeVote2026
} from '../controllers/vote2026Controller.js';

const router = express.Router();

router.get('/getAll', getVotes2026);
router.post('/create', createVote2026);
router.get('/statistics', getStatistics2026);
router.get('/check/:documento', checkVote2026);
router.get('/check-email', checkVote2026ByEmail);
router.get('/:id', getVote2026);
router.delete('/:id', removeVote2026);

export default router;
