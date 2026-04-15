import mongoose from "mongoose";

const vote2026Schema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: [true, "El nombre completo es requerido"],
        trim: true,
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        maxlength: [100, "El nombre no puede exceder 100 caracteres"]
    },
    documento: {
        type: String,
        required: [true, "El documento es requerido"],
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: 'El documento debe contener solo números'
        }
    },
    edad: {
        type: Number,
        required: [true, "La edad es requerida"],
        min: [5, "La edad mínima es 5 años"],
        max: [100, "La edad máxima es 120 años"]
    },
    municipio: {
        type: String,
        required: [true, "El municipio es requerido"],
        trim: true,
        enum: {
            values: [
                'Abejorral', 'Alejandría', 'Bello', 'Carmen de Viboral',
                'Cocorná', 'Concepción', 'El Peñol', 'El Retiro',
                'El Santuario', 'Envigado', 'Guarne', 'Guatapé',
                'Itagui', 'La Ceja', 'La Unión', 'Medellin',
                'Rionegro', 'Sabaneta', 'Sonsón', 'Otro'
            ],
            message: 'Municipio no válido'
        }
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es requerido"],
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{7,15}$/.test(v);
            },
            message: 'El teléfono debe tener entre 7 y 15 dígitos'
        }
    },
    correo: {
        type: String,
        required: [true, "El correo electrónico es requerido"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Formato de correo electrónico inválido'
        }
    },
    selectedOption: {
        type: Number,
        required: [true, "La opción seleccionada es requerida"],
        min: [0, "La opción debe estar entre 0 y 5"],
        max: [5, "La opción debe estar entre 0 y 5"]
    },
    optionName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competitor',
        required: [true, "El nombre de la opción es requerido"]
    },
    bestFlavor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competitor',
        required: [true, "El mejor sabor es requerido"]
    },
    bestAtention: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competitor',
        required: [true, "La mejor atención es requerida"]
    },
    bestPackaging: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competitor',
        required: [true, "El mejor empaque es requerido"]
    },
    ipAddress: {
        type: String,
        required: [true, "La dirección IP es requerida"]
    },
    userAgent: {
        type: String,
        required: [true, "El user agent es requerido"]
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

const Vote2026 = mongoose.model("Vote2026", vote2026Schema);
export default Vote2026;
