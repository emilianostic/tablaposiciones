import React, { useState } from 'react';
import MatchResults from './componentes/MatchResults';
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
  const [matches, setMatches] = useState([]);
  const [headToHead, setHeadToHead] = useState({});

  const handleMatchResult = (matchResults) => {
    const updatedTeams = teams.map(team => {
      const result = matchResults.find(m => m.team1 === team.name || m.team2 === team.name);
      if (result) {
        const isTeam1 = result.team1 === team.name;
        const goalsFor = isTeam1 ? result.goals1 : result.goals2;
        const goalsAgainst = isTeam1 ? result.goals2 : result.goals1;
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
          goalDifference: team.goalDifference + (goalsFor - goalsAgainst),
          points: team.points + (won * 3 + drawn * 1),
        };
      }
      return team;
    });

    const updatedHeadToHead = { ...headToHead };
    matchResults.forEach(({ team1, team2, goals1, goals2 }) => {
      if (!updatedHeadToHead[team1]) updatedHeadToHead[team1] = {};
      if (!updatedHeadToHead[team2]) updatedHeadToHead[team2] = {};

      if (goals1 > goals2) {
        updatedHeadToHead[team1][team2] = (updatedHeadToHead[team1][team2] || 0) + 1;
        updatedHeadToHead[team2][team1] = (updatedHeadToHead[team2][team1] || 0) - 1;
      } else if (goals2 > goals1) {
        updatedHeadToHead[team2][team1] = (updatedHeadToHead[team2][team1] || 0) + 1;
        updatedHeadToHead[team1][team2] = (updatedHeadToHead[team1][team2] || 0) - 1;
      }
    });

    setTeams(updatedTeams);
    setHeadToHead(updatedHeadToHead);
    setMatches([...matches, ...matchResults]);
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
      <MatchResults teams={teams} onMatchResult={handleMatchResult} />
      <StandingsTable teams={sortedTeams} />
    </div>
  );
};

export default App;