import React, { useState } from "react";
import * as api from "../services/Endpoints"

const NovoParticipante = () => {
    const estadoInicialParticipante = {
        id: null,
        cpf: "",
        nome: "",
    };
    const [participante, setParticipante] = useState(estadoInicialParticipante);
    const [submitted, setSubmitted] = useState(false);

    const trataCampo = (event) => {
        const { name, value } = event.target;
        setParticipante({ ...participante, [name]: value });
    };

    const novo = () => {
        setParticipante(estadoInicialParticipante);
        setSubmitted(false);
    };

    const enviarParticipante = () => {
        var data = {
            cpf: participante.cpf,
            nome: participante.nome
        };
        console.log(data)
        //api.create(data)
        api.createHeroku(data)
            .then(response => {
                setParticipante({
                    id: response.data.id,
                    cpf: response.data.cpf,
                    nome: response.data.nome,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => { console.log(e); });
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Participante cadastrado com sucesso!</h4>
                    <button className="btn btn-success" onClick={novo}>Novo</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nome"
                            required
                            value={participante.nome}
                            onChange={trataCampo}
                            name="nome"
                        />
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="description">CPF</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            required
                            value={participante.cpf}
                            onChange={trataCampo}
                            name="cpf"
                        />
                    </div>

                    <button onClick={enviarParticipante} className="btn btn-success mt-4">Cadastrar</button>
                </div>
            )}
        </div>
    );
}

export default NovoParticipante;