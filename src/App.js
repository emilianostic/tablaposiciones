import React, { useState } from 'react';
import MatchInput from './componentes/MatchInput';
import StandingsTable from './componentes/StandingsTable';



const initialTeams = [
  { name: 'Ingenieros A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Contadores E', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Abogados A', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Contadores S', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Abogadoes E', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Ingenieros Arq', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Ingenieros O', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Ingenieros Z', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Ingenieros Bio', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Contadores J', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Contadores D', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Contadores V', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
  { name: 'Kinesiólogos', played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0, goalDifference: 0  },
];

const App = () => {
  const [teams, setTeams] = useState(initialTeams);
  const [headToHead, setHeadToHead] = useState({});

  const handleMatchResult = (team1, team2, goals1, goals2) => {
    const updatedTeams = teams.map(team => {
      if (team.name === team1 || team.name === team2) {
        const isTeam1 = team.name === team1;
        const goalsFor = isTeam1 ? goals1 : goals2;
        const goalsAgainst = isTeam1 ? goals2 : goals1;
        const won = goalsFor > goalsAgainst ? 1 : 0;
        const drawn = goalsFor === goalsAgainst ? 1 : 0;
        const lost = goalsFor < goalsAgainst ? 1 : 0;

        return {
          ...team,
          played: team.played + 1,
          won: team.won + won,
          drawn: team.drawn + drawn,
          lost: team.lost + lost,
          goalsFor: team.goalsFor + goalsFor,
          goalsAgainst: team.goalsAgainst + goalsAgainst,
          goalDifference: team.goalsFor + goalsFor - (team.goalsAgainst + goalsAgainst),
          points: team.points + (won * 3 + drawn * 1),
        };
      }
      return team;
    });

    const updatedHeadToHead = { ...headToHead };
    if (!updatedHeadToHead[team1]) updatedHeadToHead[team1] = {};
    if (!updatedHeadToHead[team2]) updatedHeadToHead[team2] = {};

    if (goals1 > goals2) {
      updatedHeadToHead[team1][team2] = (updatedHeadToHead[team1][team2] || 0) + 1;
      updatedHeadToHead[team2][team1] = (updatedHeadToHead[team2][team1] || 0) - 1;
    } else if (goals2 > goals1) {
      updatedHeadToHead[team2][team1] = (updatedHeadToHead[team2][team1] || 0) + 1;
      updatedHeadToHead[team1][team2] = (updatedHeadToHead[team1][team2] || 0) - 1;
    }

    setTeams(updatedTeams);
    setHeadToHead(updatedHeadToHead);
  };

  const sortTeams = (a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    if (headToHead[a.name] && headToHead[a.name][b.name] !== undefined) return headToHead[a.name][b.name];
    if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  };

  const sortedTeams = [...teams].sort(sortTeams);

  return (
    <div>
      <h1>Football Standings</h1>
      <MatchInput teams={teams} onMatchResult={handleMatchResult} />
      <StandingsTable teams={sortedTeams} />
    </div>
  );
};

export default App;