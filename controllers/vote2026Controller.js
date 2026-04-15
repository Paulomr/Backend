import {
    getAllVotes2026,
    createNewVote2026,
    getVoting2026Statistics,
    checkIfVoted2026,
    checkIfVoted2026ByEmail,
    getVote2026ById,
    deleteVote2026
} from '../services/vote2026Service.js';

export async function getVotes2026(req, res) {
    try {
        const votes = await getAllVotes2026();
        res.status(200).json(votes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function createVote2026(req, res) {
    try {
        const { nombreCompleto, documento, edad, municipio, telefono, correo, selectedOption, optionName, bestFlavor, bestAtention, bestPackaging } = req.body;

        if (!nombreCompleto || !documento || !edad || !municipio || !telefono || !correo || selectedOption === undefined || !optionName || !bestFlavor || !bestAtention || !bestPackaging) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        if (selectedOption < 0 || selectedOption > 5) {
            return res.status(400).json({
                message: "Opción seleccionada inválida"
            });
        }

        if (edad < 5 || edad > 120) {
            return res.status(400).json({
                message: "La edad debe estar entre 5 y 120 años"
            });
        }

        if (!/^\d+$/.test(documento.trim())) {
            return res.status(400).json({
                message: "El documento debe contener solo números"
            });
        }

        if (!/^\d{7,15}$/.test(telefono.trim())) {
            return res.status(400).json({
                message: "El teléfono debe tener entre 7 y 15 dígitos"
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo.trim())) {
            return res.status(400).json({
                message: "Formato de correo electrónico inválido"
            });
        }

        const municipiosValidos = [
            'Abejorral', 'Alejandría', 'Bello', 'Carmen de Viboral',
            'Cocorná', 'Concepción', 'El Peñol', 'El Retiro',
            'El Santuario', 'Envigado', 'Guarne', 'Guatapé',
            'Itagui', 'La Ceja', 'La Unión', 'Medellin',
            'Rionegro', 'Sabaneta', 'Sonsón', 'Otro'
        ];

        if (!municipiosValidos.includes(municipio)) {
            return res.status(400).json({
                message: "Municipio no válido"
            });
        }

        const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
        const userAgent = req.headers['user-agent'] || 'Unknown';

        const newVote = await createNewVote2026({
            nombreCompleto,
            documento,
            edad,
            municipio,
            telefono,
            correo,
            selectedOption,
            optionName,
            bestFlavor,
            bestAtention,
            bestPackaging
        }, ipAddress, userAgent);

        return res.status(201).json({
            message: "Voto registrado exitosamente",
            vote: newVote
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

export async function getStatistics2026(req, res) {
    try {
        const statistics = await getVoting2026Statistics();
        res.status(200).json(statistics);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function checkVote2026(req, res) {
    try {
        const { documento } = req.params;

        if (!documento) {
            return res.status(400).json({
                message: "Documento es requerido"
            });
        }

        const hasVoted = await checkIfVoted2026(documento);

        res.status(200).json({
            documento,
            hasVoted
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function checkVote2026ByEmail(req, res) {
    try {
        const { correo } = req.query;

        if (!correo) {
            return res.status(400).json({
                message: "Correo electrónico es requerido"
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo.trim())) {
            return res.status(400).json({
                message: "Formato de correo electrónico inválido"
            });
        }

        const hasVoted = await checkIfVoted2026ByEmail(correo);

        res.status(200).json({
            correo: correo.toLowerCase().trim(),
            hasVoted
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function getVote2026(req, res) {
    try {
        const { id } = req.params;
        const vote = await getVote2026ById(id);

        if (!vote) {
            return res.status(404).json({ message: "El voto no existe" });
        }

        return res.status(200).json(vote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

export async function removeVote2026(req, res) {
    const { id } = req.params;

    try {
        const voteEliminado = await deleteVote2026(id);

        if (!voteEliminado) {
            return res.status(404).json({ message: "Voto no encontrado" });
        }

        return res.status(200).json({
            message: "Voto eliminado",
            vote: voteEliminado
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar el voto",
            error: error.message
        });
    }
}
