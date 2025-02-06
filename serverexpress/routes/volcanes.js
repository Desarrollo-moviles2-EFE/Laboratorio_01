var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Volcan = mongoose.model('Volcanes');

// Obtener todos los volcanes
router.get('/', function(req, res, next) {
    Volcan.find().then(volcanes => {
        res.json(volcanes);
    }).catch(next);
});

// Obtener un volcán por ID
router.get('/:id', function(req, res, next) {
    Volcan.findById(req.params.id).then(volcan => {
        if (!volcan) {
            return res.status(404).json({ message: "Volcán no encontrado" });
        }
        res.json(volcan);
    }).catch(next);
});

// Crear un nuevo volcán
router.post('/', function(req, res, next) {
    var nuevoVolcan = new Volcan(req.body);
    nuevoVolcan.save().then(() => {
        res.status(201).json({ message: "✅ Volcán agregado con éxito" });
    }).catch(next);
});

// Actualizar un volcán
router.put('/:id', function(req, res, next) {
    Volcan.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(volcan => {
            if (!volcan) {
                return res.status(404).json({ message: "Volcán no encontrado" });
            }
            res.json({ message: "✅ Volcán actualizado con éxito", volcan });
        })
        .catch(next);
});

// Eliminar un volcán
router.delete('/:id', function(req, res, next) {
    Volcan.findByIdAndDelete(req.params.id).then(volcan => {
        if (!volcan) {
            return res.status(404).json({ message: "Volcán no encontrado" });
        }
        res.json({ message: "✅ Volcán eliminado con éxito" });
    }).catch(next);
});

// Agregar comentario a un volcán (Similar a tu ejemplo de Articles)
router.post('/comentario', function(req, res, next) {
    Volcan.updateOne(
        { _id: req.body.id },
        { $push: { comentarios: { comentario: req.body.comentario, autor: req.body.autor } } }
    ).then(() => {
        res.status(201).json({
            status_code: 201,
            status_message: 'Comentario agregado',
            data: 'El comentario fue añadido al volcán'
        });
    }).catch(next);
});

module.exports = router;
