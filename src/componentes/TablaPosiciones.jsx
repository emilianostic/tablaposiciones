import React from 'react';

const TablaPosiciones = ({ equipos }) => {
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
    <table>
      <thead>
        <tr>
          <th>Equipo</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PE</th>
          <th>PP</th>
          <th>GF</th>
          <th>GC</th>
          <th>DG</th>
          <th>Puntos</th>
        </tr>
      </thead>
      <tbody>
        {equiposOrdenados.map((equipo, index) => (
          <tr key={index}>
            <td>{equipo.nombre}</td>
            <td>{equipo.jugados}</td>
            <td>{equipo.ganados}</td>
            <td>{equipo.empatados}</td>
            <td>{equipo.perdidos}</td>
            <td>{equipo.golesAFavor}</td>
            <td>{equipo.golesEnContra}</td>
            <td>{equipo.diferenciaGoles}</td>
            <td>{equipo.puntos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPosiciones;


