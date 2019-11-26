import React, { Component } from 'react';

import { FaGitAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, InputForm, SubmitButton, List, FaTrashButton, ErrorMessage } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    
    try {
    
      this.setState({ loading: true });
      
      const { newRepo, repositories } = this.state;
      
      const response = await api.get(`/repos/${newRepo}`)

      if (newRepo === '') throw new Error("Invalid Repository");

      const hasRepo = repositories.find(r => r.name === response.data.full_name);

      if (hasRepo) throw new Error('Duplicated Repository');
              
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });

    }catch (error) {
      this.setState({
        error: true,
        errorRepo: true,
        errMsg: error.response ? toast.error(error.response.data.message) : toast.error(error.message),
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = (repositories) => {
    this.setState({ repositories: this.state.repositories.filter(t => t !== repositories) })
  }

  render() {
    const { newRepo, repositories, loading, error, errMsg, errorRepo } = this.state;

    return (
      <Container>
        <h1>
          <FaGitAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <InputForm
            errorRepo={errorRepo}
            type="text"
            placeholder="Adicionar repositórios"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <ToastContainer />
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <span className="span">
              <Link to={`repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>              
              <FaTrashButton onClick={() => this.handleDelete(repository)}>
                <FaTrash/>
              </FaTrashButton >
              </span>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
