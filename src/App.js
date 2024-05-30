import React, { useState } from 'react';
import Fecha from './componentes/Fecha';
import TablaPosiciones from './componentes/TablaPosiciones';

const equiposIniciales = [
  { nombre: 'Ingenieros A', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Contadores E', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Abogados A', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Contadores S', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Abogadoes E', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Ingenieros Arq', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  },
  { nombre: 'Economistas', jugados: 0, ganados: 0, empatados: 0, perdidos: 0, golesAFavor: 0, golesEnContra: 0, puntos: 0, diferenciaGoles: 0  }
];

const App = () => {
  const [equipos, setEquipos] = useState(equiposIniciales);

  const manejarResultadoPartido = (partidos, equipoDescansa) => {
    const equiposActualizados = equipos.map(equipo => {
      const partido = partidos.find(p => p.equipo1 === equipo.nombre || p.equipo2 === equipo.nombre);
      
      if (partido) {
        const golesAFavor = partido.equipo1 === equipo.nombre ? partido.goles1 : partido.goles2;
        const golesEnContra = partido.equipo1 === equipo.nombre ? partido.goles2 : partido.goles1;
        const ganados = golesAFavor > golesEnContra ? 1 : 0;
        const empatados = golesAFavor === golesEnContra ? 1 : 0;
        const perdidos = golesAFavor < golesEnContra ? 1 : 0;

        return {
          ...equipo,
          jugados: equipo.jugados + 1,
          ganados: equipo.ganados + ganados,
          empatados: equipo.empatados + empatados,
          perdidos: equipo.perdidos + perdidos,
          golesAFavor: equipo.golesAFavor + golesAFavor,
          golesEnContra: equipo.golesEnContra + golesEnContra,
          puntos: equipo.puntos + (ganados * 3) + (empatados * 1),
          diferenciaGoles: equipo.diferenciaGoles + (golesAFavor - golesEnContra),
        };
      } else if (equipo.nombre === equipoDescansa) {
        return {
          ...equipo,
          jugados: equipo.jugados + 1,
          ganados: equipo.ganados,
          empatados: equipo.empatados,
          perdidos: equipo.perdidos,
          golesAFavor: equipo.golesAFavor,
          golesEnContra: equipo.golesEnContra,
          puntos: equipo.puntos,
          diferenciaGoles: equipo.diferenciaGoles,
        };
      }
      return equipo;
    });

    setEquipos(equiposActualizados);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Tabla de Posiciones</h1>
      <TablaPosiciones equipos={equipos} />
      <Fecha equipos={equipos} onActualizarResultados={manejarResultadoPartido} />
    </div>
  );
};

export default App;


