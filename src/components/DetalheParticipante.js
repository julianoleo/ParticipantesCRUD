import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"

const EditaParticipante = props => {
    const estadoInicial = {
        id: null,
        cpf: "",
        nome: "",
    };

    const [participante, setParticipante] = useState(estadoInicial);
    const [message, setMessage] = useState("");

    const getParticipante = (id) => {
        api.get(id)
            .then(response => {
                //setParticipante(response.data[0]);
                setParticipante(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getParticipante(props.match.params.id);
    }, [props.match.params.id]);

    const trataCampo = event => {
        const { name, value } = event.target;
        setParticipante({ ...participante, [name]: value });
    };

    const atualizarParticipante = () => {
        console.log(participante)
        console.log(participante.id)
        api.update(participante.id, participante)
            .then(response => {
                console.log(response.data);
                setMessage("Participante atualizado!");
            })
            .catch(e => { console.log(e); });
    };

    const excluirParticipante = () => {
        api.remove(participante.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/participante");
                setMessage("Participante Excluido!");
            })
            .catch(e => { console.log(e); });
    };

    return (        
        <div>
            {participante ? (
                <div className="edit-form">
                    <h4>Participante</h4>
                    <form>                        
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cpf"
                                name="cpf"
                                value={participante.cpf}
                                onChange={trataCampo}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="description">Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={participante.nome}
                                onChange={trataCampo}
                            />
                        </div>
                    </form>

                    <button className="btn btn-warning danger mt-3" onClick={excluirParticipante}>Excluir</button>
                    <button type="submit" className="btn btn-success mt-3 mx-3" onClick={atualizarParticipante}>
                        Atualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Selecione um participante ...</p>
                </div>
            )}
        </div>
    );
};

export default EditaParticipante;