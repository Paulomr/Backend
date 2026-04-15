import Vote2026 from "../models/vote2026.js";
import Competitor from "../models/competitor.js";

async function resolveCompetitorByName(name, fieldLabel) {
    const competitor = await Competitor.findOne({ nombre: name.trim(), activo: true });
    if (!competitor) {
        throw new Error(`Competidor no encontrado para ${fieldLabel}: "${name}"`);
    }
    return competitor._id;
}

const populateFields = [
    { path: 'optionName', select: 'nombre imagen descripcion' },
    { path: 'bestFlavor', select: 'nombre imagen' },
    { path: 'bestAtention', select: 'nombre imagen' },
    { path: 'bestPackaging', select: 'nombre imagen' }
];

export async function getAllVotes2026() {
    try {
        return await Vote2026.find({ deletedAt: null })
            .populate(populateFields)
            .sort({ createdAt: -1 });
    } catch (error) {
        throw new Error("Error al obtener los votos: " + error.message);
    }
}

export async function createNewVote2026(data, ipAddress, userAgent) {
    try {
        const { nombreCompleto, documento, edad, municipio, telefono, correo, selectedOption, optionName, bestFlavor, bestAtention, bestPackaging } = data;

        const [existingVote, existingEmail, optionId, flavorId, atencionId, packagingId] = await Promise.all([
            Vote2026.findOne({ documento: documento.trim(), deletedAt: null }),
            Vote2026.findOne({ correo: correo.toLowerCase().trim(), deletedAt: null }),
            resolveCompetitorByName(optionName, 'optionName'),
            resolveCompetitorByName(bestFlavor, 'bestFlavor'),
            resolveCompetitorByName(bestAtention, 'bestAtention'),
            resolveCompetitorByName(bestPackaging, 'bestPackaging')
        ]);

        if (existingVote) {
            throw new Error("Ya existe un voto registrado con este documento");
        }

        if (existingEmail) {
            throw new Error("Ya existe un voto registrado con este correo electrónico");
        }

        const newVote = new Vote2026({
            nombreCompleto: nombreCompleto.trim(),
            documento: documento.trim(),
            edad: parseInt(edad),
            municipio: municipio.trim(),
            telefono: telefono.trim(),
            correo: correo.toLowerCase().trim(),
            selectedOption: parseInt(selectedOption),
            optionName: optionId,
            bestFlavor: flavorId,
            bestAtention: atencionId,
            bestPackaging: packagingId,
            ipAddress,
            userAgent
        });

        await newVote.save();
        return await Vote2026.findById(newVote._id).populate(populateFields);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getVoting2026Statistics() {
    try {
        const totalVotes = await Vote2026.countDocuments({ deletedAt: null });

        const byOptionName = await Vote2026.aggregate([
            { $match: { deletedAt: null } },
            {
                $group: {
                    _id: '$optionName',
                    votes: { $sum: 1 }
                }
            },
            { $sort: { votes: -1 } }
        ]);

        const byBestFlavor = await Vote2026.aggregate([
            { $match: { deletedAt: null } },
            {
                $group: {
                    _id: '$bestFlavor',
                    votes: { $sum: 1 }
                }
            },
            { $sort: { votes: -1 } }
        ]);

        const byBestAtention = await Vote2026.aggregate([
            { $match: { deletedAt: null } },
            {
                $group: {
                    _id: '$bestAtention',
                    votes: { $sum: 1 }
                }
            },
            { $sort: { votes: -1 } }
        ]);

        const byBestPackaging = await Vote2026.aggregate([
            { $match: { deletedAt: null } },
            {
                $group: {
                    _id: '$bestPackaging',
                    votes: { $sum: 1 }
                }
            },
            { $sort: { votes: -1 } }
        ]);

        // Populate competitor info for each aggregation result
        const populateIds = async (aggResult, field) => {
            return await Vote2026.populate(aggResult, { path: '_id', model: 'Competitor', select: 'nombre imagen descripcion' });
        };

        const [optionResults, flavorResults, atencionResults, packagingResults] = await Promise.all([
            populateIds(byOptionName),
            populateIds(byBestFlavor),
            populateIds(byBestAtention),
            populateIds(byBestPackaging)
        ]);

        const formatResults = (results) =>
            results.map(item => ({
                competitor: item._id,
                votes: item.votes,
                percentage: totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0
            }));

        return {
            totalVotes,
            ganadorGeneral: optionResults.length > 0 ? { competitor: optionResults[0]._id, votes: optionResults[0].votes } : null,
            porVotoGeneral: formatResults(optionResults),
            porMejorSabor: formatResults(flavorResults),
            porMejorAtencion: formatResults(atencionResults),
            porMejorEmpaque: formatResults(packagingResults),
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error(error);
        throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
}

export async function checkIfVoted2026(documento) {
    try {
        const existingVote = await Vote2026.findOne({
            documento: documento.trim(),
            deletedAt: null
        });

        return !!existingVote;
    } catch (error) {
        console.error(error);
        throw new Error(`Error al verificar voto: ${error.message}`);
    }
}

export async function checkIfVoted2026ByEmail(correo) {
    try {
        const existingVote = await Vote2026.findOne({
            correo: correo.toLowerCase().trim(),
            deletedAt: null
        });

        return !!existingVote;
    } catch (error) {
        console.error(error);
        throw new Error(`Error al verificar voto por correo: ${error.message}`);
    }
}

export async function getVote2026ById(voteId) {
    try {
        const vote = await Vote2026.findById(voteId).populate(populateFields);

        if (!vote) {
            throw new Error("El voto no existe");
        }

        return vote;
    } catch (error) {
        console.error(error);
        throw new Error(`Error al obtener el voto: ${error.message}`);
    }
}

export async function deleteVote2026(voteId) {
    try {
        const vote = await Vote2026.findById(voteId);

        if (!vote) {
            throw new Error("El voto no existe");
        }

        vote.deletedAt = new Date();
        await vote.save();

        return vote;
    } catch (error) {
        console.error(error);
        throw new Error(`Error al eliminar el voto: ${error.message}`);
    }
}
