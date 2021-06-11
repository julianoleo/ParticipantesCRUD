import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ListagemParticipante from "./components/ListagemParticipantes.js";
import NovoParticipante from "./components/NovoParticipante.js";
import DetalheParticipante from "./components/DetalheParticipante.js";

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
       
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/participante"} className="nav-link">Participantes</Link>
          </li>
          <li className="nav-item">
            <Link to={"/novo"} className="nav-link">Novo</Link>
          </li> 
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/participante"]} component={ListagemParticipante} />
          <Route exact path="/novo" component={NovoParticipante} />
          <Route path="/participante/:id" component={DetalheParticipante} />
        </Switch>
      </div>
    </div>
  );
}

export default App;