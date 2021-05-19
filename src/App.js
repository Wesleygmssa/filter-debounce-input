import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";

function App() {
  const [busca, setBuscar] = useState("");
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/pessoas")
      .then((response) => response.json())
      .then((data) => {
        if (busca.length >= 3) {
          setValue(data);
        } else {
          setValue([]);
        }
      });
  }, [busca.length]);

  const lowerBusca = busca.toLowerCase();
  const pessoasFiltradas = value.filter((pessoa) =>
    pessoa?.name.toLowerCase().includes(lowerBusca)
  );

  return (
    <div className="App">
      <h1>Buscar por usuário</h1>
      {/* <input
        type="text"
        value={busca}
        onChange={(e) => setBuscar(e.target.value)}
      /> */}
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        onChange={(event) => setBuscar(event.target.value)}
      />
      <ul>
        {pessoasFiltradas.map((pessoa) => (
          <li key={pessoa.id}>
            {" "}
            <a href={pessoa.id}>{pessoa.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
