import React, { useState } from 'react';

const Emparejamientos = ({ equipos, onActualizarResultados }) => {
  const [partidos, setPartidos] = useState(
    Array(6).fill({ equipo1: '', goles1: '', equipo2: '', goles2: '' })
  );
  const [equipoDescansa, setEquipoDescansa] = useState('');
  const [error, setError] = useState('');

  const manejarCambioPartido = (indice, campo, valor) => {
    const nuevosPartidos = [...partidos];
    nuevosPartidos[indice] = { ...nuevosPartidos[indice], [campo]: valor };
    setPartidos(nuevosPartidos);
  };

  const manejarEnvioResultados = (e) => {
    e.preventDefault();
    const equiposEnPartidos = partidos.flatMap(p => [p.equipo1, p.equipo2]);
    const equiposRepetidos = equiposEnPartidos.filter((equipo, index, self) => equipo && self.indexOf(equipo) !== index);

    if (equiposRepetidos.length > 0 || equiposEnPartidos.includes(equipoDescansa)) {
      setError('Hay equipos repetidos en más de un emparejamiento o el equipo que descansa está en un emparejamiento.');
      return;
    }

    const resultadosPartido = partidos.map((partido, indice) => ({
      ...partido,
      goles1: parseInt(partido.goles1, 10),
      goles2: parseInt(partido.goles2, 10),
    }));

    onActualizarResultados(resultadosPartido, equipoDescansa);
    setPartidos(Array(6).fill({ equipo1: '', goles1: '', equipo2: '', goles2: '' }));
    setEquipoDescansa('');
    setError('');
  };

  return (
    <form onSubmit={manejarEnvioResultados}>
      <h2>Ingresar Resultados</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {partidos.map((partido, indice) => (
        <div key={indice}>
          <select
            value={partido.equipo1}
            onChange={(e) => manejarCambioPartido(indice, 'equipo1', e.target.value)}
          >
            <option value="">Selecciona el equipo 1</option>
            {equipos.map((equipo, index) => (
              <option key={index} value={equipo.nombre}>{equipo.nombre}</option>
            ))}
          </select>
          <input
            type="number"
            value={partido.goles1}
            onChange={(e) => manejarCambioPartido(indice, 'goles1', e.target.value)}
            placeholder="Goles 1"
          />
          vs
          <select
            value={partido.equipo2}
            onChange={(e) => manejarCambioPartido(indice, 'equipo2', e.target.value)}
          >
            <option value="">Selecciona el equipo 2</option>
            {equipos.map((equipo, index) => (
              <option key={index} value={equipo.nombre}>{equipo.nombre}</option>
            ))}
          </select>
          <input
            type="number"
            value={partido.goles2}
            onChange={(e) => manejarCambioPartido(indice, 'goles2', e.target.value)}
            placeholder="Goles 2"
          />
        </div>
      ))}
      <select
        value={equipoDescansa}
        onChange={(e) => setEquipoDescansa(e.target.value)}
      >
        <option value="">Selecciona el equipo que descansa</option>
        {equipos.map((equipo, index) => (
          <option key={index} value={equipo.nombre}>{equipo.nombre}</option>
        ))}
      </select>
      <button type="submit">Enviar Resultados</button>
    </form>
  );
};

export default Emparejamientos;
