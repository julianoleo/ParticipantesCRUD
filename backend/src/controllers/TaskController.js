const dbParticipante = require('../database/dbParticipante')
const { validationResult } = require('express-validator')

class TaskController {

    ConsultaParticipante(request, response) {
        const query = 'select * from participantes;'
        dbParticipante.query(query, request, (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error "})
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            }         
            else {
                response.status(404)
                response.json({ "message": "Nenhum Participante encontrado" })
            }
        })
    }

    ConsultaParticipanteID(request, response) {
        const id = request.params.id
        const query = 'select * from participantes where id = ' + id
        dbParticipante.query(query, request, (err, rows) => {
            if (err) {
                console.log(err)
                response.status(500)
                response.json({ "message": "Internal Server Error "})
            } else if (rows.length > 0) {
                response.status(200)
                response.json(rows)
            }         
            else {
                response.status(404)
                response.json({ "message": "Nenhum Participante encontrado com id " + id  })
            }
        })
    }

    IncluiParticipante(request, response) {
        const tarefa = {}
        tarefa.cpf = request.body.cpf
        tarefa.nome = request.body.nome
        const query = 'INSERT INTO participantes (cpf, nome) VALUES (?, ?)'
        dbParticipante.query(query, [tarefa.cpf, tarefa.nome], (err, rows) => {
            if (err) {                
                response.status(500)
                response.json({ "message": "Internal Server Error "})
            }         
            else {
                response.status(200)
                response.json({ "message": "Participante Incluido" })
            }
        })
    }

    AtualizaParticipante(request, response) {
        const id = request.params.id
        const tarefa = {}
        tarefa.cpf = request.body.cpf
        tarefa.nome = request.body.nome
        if (typeof tarefa.cpf === "undefined" || typeof tarefa.nome === "undefined" ) {
            response.status(404)
            response.json({ "message": "Parametro incorreto"})
        }
        else {
            const query = 'UPDATE participantes set cpf = ?, nome = ? WHERE id = ' + id
            dbParticipante.query(query, [tarefa.cpf, tarefa.nome], (err, rows) => {
                const result = rows.message
                const resultQtd = result.substring(16, 15);
                if (resultQtd === '0') {
                    response.status(404)
                    response.json({ "message": "Participante id " + id + " não encontrado" })
                }
                else {
                    if (err) {                
                        response.status(500)
                        response.json({ "message": "Internal Server Error "})
                    }         
                    else {
                        response.status(200)
                        response.json({ "message": "Participante Alterado" })
                    }    
                }
            })    
        }
    }

    DeletaParticipante(request, response) {
        const id = request.params.id
        const tipo = Number(id)
        if(isNaN(tipo)) {
            response.status(404)
            response.json({ "message": "O id não é de um tipo válido"})
        }
        else {
            const query = 'delete from participantes where id = ' + id
            dbParticipante.query(query, request, (err, rows) => {
                    const result = rows['affectedRows']
                    if (result === 0) {
                        response.status(404)
                        response.json({ "message": "Participante id " + id + " não encontrado" })
                    }
                    else {
                        if (err) {                
                            response.status(500)
                            response.json({ "message": "Internal Server Error "})
                        }         
                        else {
                            response.status(200)
                            response.json({ "message": "Participante Deletado" })
                        }    
                    }
            })
        }
    }
}

module.exports = new TaskController()