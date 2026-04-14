import mongoose from "mongoose";

const competitorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true
    },
    whatsapp: {
        type: String,
        required: [true, "El link de WhatsApp es requerido"],
        trim: true
    },
    ubicacion: {
        type: String,
        required: [true, "El link de ubicación es requerido"],
        trim: true
    },
    imagen: {
        type: String,
        trim: true,
        default: ""
    },
    descripcion: {
        type: String,
        trim: true,
        default: ""
    },
    activo: {
        type: Boolean,
        default: true
    },
    orden: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Competitor = mongoose.model("Competitor", competitorSchema);
export default Competitor;