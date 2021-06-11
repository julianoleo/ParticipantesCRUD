const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

//Rotas Válidas
router.get('/', (req, res) => res.json({ message: 'API Funcionando' }));
router.get('/participante', TaskController.ConsultaParticipante)
router.get('/participante/:id', TaskController.ConsultaParticipanteID)
router.put('/participante', TaskController.IncluiParticipante)
router.post('/participante/:id', TaskController.AtualizaParticipante)
router.delete('/participante/:id', TaskController.DeletaParticipante)

module.exports = router