import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repository, setRepository] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [initialState, setInitialState] = useState(true);

  useEffect(() => {

    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
    

  }, []);

  async function handleAddRepository() {

    if (!repository) {
      return;
    }

    const { data } = await api.post('/repositories', {
      title: repository,
      url: null,
      techs: null
    });

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`/repositories/${id}`);

    const filteredRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(filteredRepositories);
    setInitialState(false);

  }

  async function handleRepositoryChange(event) {

    setRepository(event.target.value);

  }

  return (
    <div>     
      <ul data-testid="repository-list">
        {initialState === true &&
          <h1>Desafio ReactJS</h1>  
        }
        {
          repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
        }
      </ul>
      <input type="text" placeholder="Nome do Repositório" onChange={handleRepositoryChange}></input>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;