const express = require('express');
const router = express.Router();
const multer = require('multer');

const clientesController = require('../controllers/clientesController');

router.get('/clientes', clientesController.get);
router.get('/clientes/:id/edit', clientesController.edit)
router.put('/clientes/:id/uptade', clientesController.update)

// router.get('/clientes/id/edit', clientesController.edit)
// router.get('/cliente', clientesController.get); // vai mandar para a  pagina da Amanda 

module.exports = router