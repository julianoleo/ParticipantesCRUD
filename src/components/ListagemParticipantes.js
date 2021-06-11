import React, { useState, useEffect } from "react";
import * as api from "../services/Endpoints"
import { Link } from "react-router-dom";

const ListagemParticipante = () => {
    const [Participante, setParticipante] = useState([]);
    const [ParticipanteSelecionado, setParticipanteSelecionado] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        buscaParticipante();
    }, []);

    const buscaParticipante = () => {
        api.getAll()
            .then(response => {                
                setParticipante(response.data);
                console.log("resultado:");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const setParticipanteAtivo = (Participante, index) => {
        setParticipanteSelecionado(Participante);
        setCurrentIndex(index);
    };

    return (
        <div className="container list row">
            <div className="col-md-6">
                <h4>Participantes</h4>
                <ul className="list-group py-1">
                    {Participante &&
                        Participante.map((Participante, index) => (
                            <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                 onClick={() => setParticipanteAtivo(Participante, index)}
                                 key={index}
                            >{Participante.nome}</li>
                        ))}
                </ul>
            </div>


            <div className="col-md-6">
                {ParticipanteSelecionado ? (
                    <div>
                        <h4>Detalhe</h4>
                        <div>
                            <label>
                                <strong>Nome:</strong>
                            </label>{" "}
                            {ParticipanteSelecionado.nome}
                        </div>
                        <div>
                            <label>
                                <strong>CPF:</strong>
                            </label>{" "}
                            {ParticipanteSelecionado.cpf}
                        </div>

                        <Link to={"/participante/" + ParticipanteSelecionado.id} className="btn btn-warning">Editar</Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Selecione um participante</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListagemParticipante;