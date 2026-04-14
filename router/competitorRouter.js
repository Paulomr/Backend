import express from 'express';
import {
    getCompetitors,
    getCompetitor,
    addCompetitor,
    initCompetitors
} from '../controllers/competitorController.js';

const router = express.Router();

// GET /api/competitors - Obtener todos los competidores
router.get('/getAll', getCompetitors);

// GET /api/competitors/:id - Obtener un competidor específico
router.get('/:id', getCompetitor);

// POST /api/competitors/create - Crear un competidor
router.post('/create', addCompetitor);

// POST /api/competitors/seed - Inicializar competidores
router.post('/seed', initCompetitors);

export default router;