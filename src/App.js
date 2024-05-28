import React, { useState } from 'react';
import TablaPosiciones from './componentes/TablaPosiciones';
import Fecha from './componentes/Fecha';
import Emparejamientos from './componentes/Emparejamientos';
import 'tailwindcss/tailwind.css';

const equiposIniciales = [
  { nombre: 'Ingenieros A', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Contadores D', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Contadores S', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Contadores E', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Abogados A', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Abogados E', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Kinesiólogos', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Ingenieros Arq.', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Ingenieros O', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Ingenieros Z', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Ingenieros Bio.', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Contadores J', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
  { nombre: 'Contadores V', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0 },
];

const App = () => {
  const [equipos, setEquipos] = useState(equiposIniciales);
  const [partidosPorFecha, setPartidosPorFecha] = useState(Array(13).fill([]));

  const actualizarResultados = (resultados, indiceFecha) => {
    const nuevosEquipos = [...equipos];
    const nuevosPartidosPorFecha = [...partidosPorFecha];
    const partidosAnteriores = partidosPorFecha[indiceFecha];

    // Revertir los resultados anteriores
    partidosAnteriores.forEach(({ equipo1, equipo2, goles1, goles2 }) => {
      actualizarEstadisticas(nuevosEquipos, equipo1, equipo2, -goles1, -goles2);
    });

    // Aplicar los nuevos resultados
    resultados.forEach(({ equipo1, equipo2, goles1, goles2 }) => {
      actualizarEstadisticas(nuevosEquipos, equipo1, equipo2, goles1, goles2);
    });

    nuevosPartidosPorFecha[indiceFecha] = resultados;
    setEquipos(nuevosEquipos);
    setPartidosPorFecha(nuevosPartidosPorFecha);
  };

  const actualizarEstadisticas = (equipos, equipo1, equipo2, goles1, goles2) => {
    const eq1 = equipos.find(e => e.nombre === equipo1);
    const eq2 = equipos.find(e => e.nombre === equipo2);

    if (eq1 && eq2) {
      eq1.golesAFavor += goles1;
      eq1.golesEnContra += goles2;
      eq2.golesAFavor += goles2;
      eq2.golesEnContra += goles1;
      eq1.diferenciaGoles += (goles1 - goles2);
      eq2.diferenciaGoles += (goles2 - goles1);

      if (goles1 > goles2) {
        eq1.ganados++;
        eq1.puntos += 3;
        eq2.perdidos++;
      } else if (goles1 < goles2) {
        eq2.ganados++;
        eq2.puntos += 3;
        eq1.perdidos++;
      } else {
        eq1.empatados++;
        eq1.puntos++;
        eq2.empatados++;
        eq2.puntos++;
      }

      eq1.jugados++;
      eq2.jugados++;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4 text-center">Tabla de Posiciones</h1>
      <div className="flex justify-center">
        <TablaPosiciones equipos={equipos} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {Array.from({ length: 13 }, (_, i) => (
          <Fecha key={i} indiceFecha={i} equipos={equipos} onActualizarResultados={actualizarResultados} />
        ))}
      </div>
      <Emparejamientos equipos={equipos} />
    </div>
  );
};

export default App;

