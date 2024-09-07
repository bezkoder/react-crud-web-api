import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { withRouter } from '../common/with-router';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeClient2 = this.onChangeClient2.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeProject2 = this.onChangeProject2.bind(this);
    this.getParceiro = this.getParceiro.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteParceiro = this.deleteParceiro.bind(this);
    this.idParceiro = this.props.router.params.id;

    this.state = {
      currentParceiro: {
        id: this.idParceiro,
        name: "",
        description: "",
        client: "",
        client2: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getParceiro(this.idParceiro);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          description: description
        }
      };
    });

  }

  onChangeClient(e) {
    const client = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          client: client
        }
      };
    });
  }

  onChangeClient2(e) {
    const client2 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          client2: client2
        }
      };
    });
  }

  onChangeProject(e) {
    const project = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          project: project
        }
      };
    });
  }

  onChangeProject2(e) {
    const project2 = e.target.value;

    this.setState(function (prevState) {
      return {
        currentParceiro: {
          ...prevState.currentParceiro,
          project2: project2
        }
      };
    });
  }

  getParceiro(id) {
    TutorialDataService.getParceiroById(id)
      .then(response => {
        this.setState({
          currentParceiro: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    var data = {
      id: this.state.currentParceiro.id,
      name: this.state.currentParceiro.name,
      description: this.state.currentParceiro.description,
      clients: [this.state.currentParceiro.client, this.state.currentParceiro.client2],
      projects: [this.state.currentParceiro.project, this.state.currentParceiro.project2],
    };

    TutorialDataService.putParceiro(
      this.idParceiro, data
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O parceiro foi atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteParceiro() {
    TutorialDataService.deleteParceiroById(this.idParceiro)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/tutorials');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentParceiro } = this.state;

    return (
      <div>
        {currentParceiro ? (
          <div className="edit-form">
            <h4>Parceiro</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="client">Cliente</label>
                <input
                  type="text"
                  className="form-control"
                  id="client"
                  required
                  value={this.state.client}
                  onChange={this.onChangeClient}
                  name="client"
                />
              </div>

              <div className="form-group">
                <label htmlFor="client2">Cliente 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="client2"
                  required
                  value={this.state.client2}
                  onChange={this.onChangeClient2}
                  name="client2"
                />
              </div>

              <div className="form-group">
                <label htmlFor="project">Projeto</label>
                <input
                  type="text"
                  className="form-control"
                  id="project"
                  required
                  value={this.state.project}
                  onChange={this.onChangeProject}
                  name="project"
                />
              </div>

              <div className="form-group">
                <label htmlFor="project2">Projeto 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="project2"
                  required
                  value={this.state.project2}
                  onChange={this.onChangeProject2}
                  name="project2"
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteParceiro}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Tutorial);