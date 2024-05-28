import React, { useState } from 'react';

const Emparejamientos = ({ equipos }) => {
  const [resultadosCuartos, setResultadosCuartos] = useState({});
  const [resultadosSemis, setResultadosSemis] = useState({});
  const [resultadoFinal, setResultadoFinal] = useState({});

  const manejarCambioResultado = (fase, equipo1, equipo2, goles1, goles2, penales1 = null, penales2 = null) => {
    const resultados = fase === 'cuartos' ? { ...resultadosCuartos } : fase === 'semis' ? { ...resultadosSemis } : { ...resultadoFinal };
    resultados[equipo1 + 'vs' + equipo2] = { goles1, goles2, penales1, penales2 };
    if (fase === 'cuartos') setResultadosCuartos(resultados);
    else if (fase === 'semis') setResultadosSemis(resultados);
    else setResultadoFinal(resultados);
  };

  const renderPartido = (fase, equipo1, equipo2) => {
    const resultado = fase === 'cuartos' ? resultadosCuartos[equipo1 + 'vs' + equipo2] : fase === 'semis' ? resultadosSemis[equipo1 + 'vs' + equipo2] : resultadoFinal[equipo1 + 'vs' + equipo2];
    const { goles1 = '', goles2 = '', penales1 = '', penales2 = '' } = resultado || {};

    return (
      <div>
        <h4>{equipo1} vs {equipo2}</h4>
        <input
          type="number"
          value={goles1}
          onChange={(e) => manejarCambioResultado(fase, equipo1, equipo2, e.target.value, goles2)}
          placeholder="Goles Equipo 1"
        />
        <input
          type="number"
          value={goles2}
          onChange={(e) => manejarCambioResultado(fase, equipo1, equipo2, goles1, e.target.value)}
          placeholder="Goles Equipo 2"
        />
        {goles1 === goles2 && goles1 !== '' && goles2 !== '' && (
          <div>
            <h5>Penales</h5>
            <input
              type="number"
              value={penales1}
              onChange={(e) => manejarCambioResultado(fase, equipo1, equipo2, goles1, goles2, e.target.value, penales2)}
              placeholder="Penales Equipo 1"
            />
            <input
              type="number"
              value={penales2}
              onChange={(e) => manejarCambioResultado(fase, equipo1, equipo2, goles1, goles2, penales1, e.target.value)}
              placeholder="Penales Equipo 2"
            />
          </div>
        )}
      </div>
    );
  };

  const equiposOrdenados = [...equipos].sort((a, b) => {
    if (b.puntos === a.puntos) {
      if (b.diferenciaGoles === a.diferenciaGoles) {
        return b.golesAFavor - a.golesAFavor;
      }
      return b.diferenciaGoles - a.diferenciaGoles;
    }
    return b.puntos - a.puntos;
  });

  return (
    <div>
      <h2>Cuartos de Final</h2>
      {renderPartido('cuartos', equiposOrdenados[0].nombre, equiposOrdenados[7].nombre)}
      {renderPartido('cuartos', equiposOrdenados[1].nombre, equiposOrdenados[6].nombre)}
      {renderPartido('cuartos', equiposOrdenados[2].nombre, equiposOrdenados[5].nombre)}
      {renderPartido('cuartos', equiposOrdenados[3].nombre, equiposOrdenados[4].nombre)}

      <h2>Semifinales</h2>
      {renderPartido('semis', resultadosCuartos[equiposOrdenados[0].nombre + 'vs' + equiposOrdenados[7].nombre] ? equiposOrdenados[0].nombre : equiposOrdenados[7].nombre, resultadosCuartos[equiposOrdenados[3].nombre + 'vs' + equiposOrdenados[4].nombre] ? equiposOrdenados[3].nombre : equiposOrdenados[4].nombre)}
      {renderPartido('semis', resultadosCuartos[equiposOrdenados[1].nombre + 'vs' + equiposOrdenados[6].nombre] ? equiposOrdenados[1].nombre : equiposOrdenados[6].nombre, resultadosCuartos[equiposOrdenados[2].nombre + 'vs' + equiposOrdenados[5].nombre] ? equiposOrdenados[2].nombre : equiposOrdenados[5].nombre)}

      <h2>Final</h2>
      {renderPartido('final', resultadosSemis[equiposOrdenados[0].nombre + 'vs' + equiposOrdenados[7].nombre] ? equiposOrdenados[0].nombre : equiposOrdenados[7].nombre, resultadosSemis[equiposOrdenados[3].nombre + 'vs' + equiposOrdenados[4].nombre] ? equiposOrdenados[3].nombre : equiposOrdenados[4].nombre)}

      <h1>CAMPEÓN: {resultadoFinal[resultadosSemis[equiposOrdenados[0].nombre + 'vs' + equiposOrdenados[7].nombre] ? equiposOrdenados[0].nombre : equiposOrdenados[7].nombre + 'vs' + resultadosSemis[equiposOrdenados[3].nombre + 'vs' + equiposOrdenados[4].nombre] ? equiposOrdenados[3].nombre : equiposOrdenados[4].nombre]}</h1>
    </div>
  );
};

export default Emparejamientos;
