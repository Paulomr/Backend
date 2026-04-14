import Competitor from "../models/competitor.js";

export async function getAllCompetitors() {
    try {
        return await Competitor.find({ activo: true }).sort({ orden: 1 });
    } catch (error) {
        throw new Error("Error al obtener los competidores: " + error.message);
    }
}

export async function getCompetitorById(id) {
    try {
        const competitor = await Competitor.findById(id);
        if (!competitor) {
            throw new Error("El competidor no existe");
        }
        return competitor;
    } catch (error) {
        throw new Error("Error al obtener el competidor: " + error.message);
    }
}

export async function createCompetitor(data) {
    try {
        const competitor = new Competitor(data);
        await competitor.save();
        return competitor;
    } catch (error) {
        throw new Error("Error al crear el competidor: " + error.message);
    }
}

export async function seedCompetitors() {
    try {
        const count = await Competitor.countDocuments();
        if (count > 0) {
            console.log("Los competidores ya están en la base de datos");
            return;
        }

        const competitors = [
            {
                nombre: "Crunchy Munch",
                whatsapp: "https://wa.me/message/XDO3QTQOPC3FM1",
                ubicacion: "https://maps.apple/p/YZkxiaYH_u3fvX",
                descripcion: "Galletería artesanal con los mejores sabores.",
                orden: 0
            },
            {
                nombre: "Dolcatto",
                whatsapp: "https://wa.link/829ioc",
                ubicacion: "https://maps.apple/p/dWWiJJzgkFFzZh",
                descripcion: "Dulces y galletas hechas con amor.",
                orden: 1
            },
            {
                nombre: "Fratelli Repostería",
                whatsapp: "https://api.whatsapp.com/send/?phone=573102763278&text&type=phone_number&app_absent=0&wame_ctl=1",
                ubicacion: "https://share.google/aWKUhso4LoT3nQiEw",
                descripcion: "Tradición italiana en cada galleta.",
                orden: 2
            },
            {
                nombre: "Koalas Bakery",
                whatsapp: "https://wa.me/573005162169",
                ubicacion: "https://maps.apple/p/SMS-7YMMze7n.x",
                descripcion: "Galletas inspiradas en la naturaleza.",
                orden: 3
            },
            {
                nombre: "Ancookies",
                whatsapp: "https://wa.me/c/573122280280",
                ubicacion: "https://maps.app.goo.gl/f8LgY8U6YuWTDHeg7",
                descripcion: "Galletería artesanal con recetas únicas.",
                orden: 4
            }
        ];

        await Competitor.insertMany(competitors);
        console.log("✅ Competidores creados exitosamente");
    } catch (error) {
        throw new Error("Error al sembrar competidores: " + error.message);
    }
}