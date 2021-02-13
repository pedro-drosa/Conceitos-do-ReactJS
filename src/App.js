import React from "react";
import api from "./services/api"
import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    })
  },[]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": `Respository ${Date.now()}`,
      "url": "http://github.com",
      "techs": [
        "nodeJS"
      ]
    });

    const newRepository = response.data;

    setRepositories([...repositories,newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
            repositories.map(repository => {
              return (
                <li key={repository.id}>{repository.title}
                  <button onClick={() => handleRemoveRepository(repository.id)}> 
                    Remover 
                  </button>
                </li>
              )
            })
          }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
