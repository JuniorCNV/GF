const express = require('express');
const router = express.Router();
//chama o aquivo aonde esta a logica 
const clientesController = require('../controllers/clientesController');


//envia todos os clientes
router.get('/', clientesController.get);
//edita um unico cliente 
router.get('/clientes/:id/edit', clientesController.edit);
router.get('/ordemCompra/:id/edit', clientesController.edit);
//sobe apenas um cliente 
// router.get('/clientes/:id/atualizar', clientesController.update);
router.post('/clientes/:id/atualizar', clientesController.update)

router.post('/pesquisa', clientesController.getCliente)

// router.get('/', clientesController.get); // vai mandar para a  pagina da Amanda 

module.exports = router