import React, { useState } from 'react';
import Emparejamientos from './Emparejamientos';

const Fecha = ({ equipos, onActualizarResultados }) => {
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
    <form onSubmit={manejarEnvioResultados} className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Ingresar Resultados de la Fecha</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Emparejamientos
        partidos={partidos}
        equipos={equipos}
        manejarCambioPartido={manejarCambioPartido}
      />
      <select
        value={equipoDescansa}
        onChange={(e) => setEquipoDescansa(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="">Selecciona el equipo que descansa</option>
        {equipos.map((equipo, index) => (
          <option key={index} value={equipo.nombre}>{equipo.nombre}</option>
        ))}
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">Enviar Resultados</button>
    </form>
  );
};

export default Fecha;





