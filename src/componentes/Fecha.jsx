import React, { useState } from 'react';

const Fecha = ({ indiceFecha, equipos, onActualizarResultados }) => {
  const [partidos, setPartidos] = useState(
    Array(6).fill({ equipo1: '', goles1: '', equipo2: '', goles2: '' })
  );
  const [equipoDescansa, setEquipoDescansa] = useState('');

  const manejarCambioPartido = (indice, campo, valor) => {
    const nuevosPartidos = [...partidos];
    nuevosPartidos[indice] = { ...nuevosPartidos[indice], [campo]: valor };
    setPartidos(nuevosPartidos);
  };

  const manejarEnvioResultados = (e) => {
    e.preventDefault();
    onActualizarResultados(partidos, indiceFecha);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Fecha {indiceFecha + 1}</h2>
      <form onSubmit={manejarEnvioResultados}>
        {partidos.map((partido, indice) => (
          <div key={indice} className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <select
              value={partido.equipo1}
              onChange={(e) => manejarCambioPartido(indice, 'equipo1', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Equipo 1</option>
              {equipos.filter(e => e.nombre !== equipoDescansa).map((equipo, i) => (
                <option key={i} value={equipo.nombre}>{equipo.nombre}</option>
              ))}
            </select>
            <input
              type="number"
              value={partido.goles1}
              onChange={(e) => manejarCambioPartido(indice, 'goles1', e.target.value)}
              placeholder="Goles Equipo 1"
              className="p-2 border rounded"
            />
            <select
              value={partido.equipo2}
              onChange={(e) => manejarCambioPartido(indice, 'equipo2', e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Equipo 2</option>
              {equipos.filter(e => e.nombre !== equipoDescansa).map((equipo, i) => (
                <option key={i} value={equipo.nombre}>{equipo.nombre}</option>
              ))}
            </select>
            <input
              type="number"
              value={partido.goles2}
              onChange={(e) => manejarCambioPartido(indice, 'goles2', e.target.value)}
              placeholder="Goles Equipo 2"
              className="p-2 border rounded"
            />
          </div>
        ))}
        <div className="mb-4">
          <label>Equipo que descansa:</label>
          <select
            value={equipoDescansa}
            onChange={(e) => setEquipoDescansa(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="">Seleccionar Equipo</option>
            {equipos.map((equipo, i) => (
              <option key={i} value={equipo.nombre}>{equipo.nombre}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enviar Resultados</button>
      </form>
    </div>
  );
};

export default Fecha;



