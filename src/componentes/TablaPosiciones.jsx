import React from 'react';

const TablaPosiciones = ({ equipos }) => {
  const sortedEquipos = [...equipos].sort((a, b) => b.puntos - a.puntos || b.diferenciaGoles - a.diferenciaGoles);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Equipo</th>
          <th className="px-4 py-2">PJ</th>
          <th className="px-4 py-2">G</th>
          <th className="px-4 py-2">E</th>
          <th className="px-4 py-2">P</th>
          <th className="px-4 py-2">GF</th>
          <th className="px-4 py-2">GC</th>
          <th className="px-4 py-2">DG</th>
          <th className="px-4 py-2">Pts</th>
        </tr>
      </thead>
      <tbody>
        {sortedEquipos.map((equipo, index) => (
          <tr key={index} className="text-center">
            <td className="border px-4 py-2">{equipo.nombre}</td>
            <td className="border px-4 py-2">{equipo.jugados}</td>
            <td className="border px-4 py-2">{equipo.ganados}</td>
            <td className="border px-4 py-2">{equipo.empatados}</td>
            <td className="border px-4 py-2">{equipo.perdidos}</td>
            <td className="border px-4 py-2">{equipo.golesAFavor}</td>
            <td className="border px-4 py-2">{equipo.golesEnContra}</td>
            <td className="border px-4 py-2">{equipo.diferenciaGoles}</td>
            <td className="border px-4 py-2">{equipo.puntos}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaPosiciones;



