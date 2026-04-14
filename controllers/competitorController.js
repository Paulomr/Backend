import { 
    getAllCompetitors, 
    getCompetitorById,
    createCompetitor,
    seedCompetitors
} from '../services/competitorService.js';
import Competitor from '../models/competitor.js';

export async function updateCompetitor(req, res) {
    try {
        const { id } = req.params;
        const competitor = await Competitor.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!competitor) {
            return res.status(404).json({ message: "Competidor no encontrado" });
        }
        res.status(200).json(competitor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCompetitors(req, res) {
    try {
        const competitors = await getAllCompetitors();
        res.status(200).json(competitors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getCompetitor(req, res) {
    try {
        const { id } = req.params;
        const competitor = await getCompetitorById(id);
        res.status(200).json(competitor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export async function addCompetitor(req, res) {
    try {
        const competitor = await createCompetitor(req.body);
        res.status(201).json({
            message: "Competidor creado exitosamente",
            competitor
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function initCompetitors(req, res) {
    try {
        await seedCompetitors();
        res.status(200).json({ message: "Competidores inicializados exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}