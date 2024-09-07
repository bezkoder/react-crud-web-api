import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  retrieveTutorials() {
    TutorialDataService.getParceiros()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteTodosParceiros()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Parceiros</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Dados do Parceiro</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentTutorial.name}
              </div>
              <div>
                <label>
                  <strong>Descrição:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Clientes:</strong>
                </label>{" "}
                {currentTutorial.clients && currentTutorial.clients.map((client, index) => (
                  <div key={index}>{client}</div>
                ))}
              </div>
              <div>
                <label>
                  <strong>Projetos:</strong>
                </label>{" "}
                {currentTutorial.projects && currentTutorial.projects.map((client, index) => (
                  <div key={index}>{client}</div>
                ))}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
