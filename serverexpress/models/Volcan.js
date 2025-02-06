const mongoose = require('mongoose');

const VolcanSchema = new mongoose.Schema({
    nombre: String,
    ubicacion: String,
    altura: Number,
    descripcion: String,
    imagen: String,
    comentarios: [
        {
            comentario: String,
            autor: String,
            fecha: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Volcanes', VolcanSchema);
