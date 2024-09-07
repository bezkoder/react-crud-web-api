import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeClient2 = this.onChangeClient2.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeProject2 = this.onChangeProject2.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      client: "",
      client2: "",
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  
  }

  onChangeClient(e) {
    this.setState({
      client: e.target.value
    });
  }

  onChangeClient2(e) {
    this.setState({
      client2: e.target.value
    });
  }

  onChangeProject(e) {
    this.setState({
      project: e.target.value
    });
  }

  onChangeProject2(e) {
    this.setState({
      project2: e.target.value
    });
  }
  
  saveTutorial() {
    var data = {
      name: this.state.name,
      description: this.state.description,
      clients: [this.state.client, this.state.client2],
      projects: [this.state.project, this.state.project2]
    };

    TutorialDataService.postParceiro(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          clients: response.data.clients,
          projects: response.data.projects,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      name: "",
      description: "",
      client: "",
      client2: "",
      project: "",
      project2: "",
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Parceiro cadastrado com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
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

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
