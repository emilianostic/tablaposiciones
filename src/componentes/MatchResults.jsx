import React, { useState } from 'react';

const MatchResults = ({ teams, onMatchResult }) => {
  const [matchResults, setMatchResults] = useState(Array(6).fill({ team1: '', team2: '', goals1: '', goals2: '' }));
  const [teamNotPlaying, setTeamNotPlaying] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onMatchResult(matchResults);
    setMatchResults(Array(6).fill({ team1: '', team2: '', goals1: '', goals2: '' }));
    setTeamNotPlaying('');
  };

  const handleMatchChange = (index, field, value) => {
    const newMatchResults = [...matchResults];
    newMatchResults[index] = { ...newMatchResults[index], [field]: value };
    setMatchResults(newMatchResults);
  };

  return (
    <form onSubmit={handleSubmit}>
      {matchResults.map((match, index) => (
        <div key={index}>
          <select value={match.team1} onChange={(e) => handleMatchChange(index, 'team1', e.target.value)}>
            <option value="">Select Team 1</option>
            {teams.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={match.goals1}
            onChange={(e) => handleMatchChange(index, 'goals1', e.target.value)}
            placeholder="Goals Team 1"
          />
          <select value={match.team2} onChange={(e) => handleMatchChange(index, 'team2', e.target.value)}>
            <option value="">Select Team 2</option>
            {teams.map((team) => (
              <option key={team.name} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={match.goals2}
            onChange={(e) => handleMatchChange(index, 'goals2', e.target.value)}
            placeholder="Goals Team 2"
          />
        </div>
      ))}
      <select value={teamNotPlaying} onChange={(e) => setTeamNotPlaying(e.target.value)}>
        <option value="">Select Team Not Playing</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit Results</button>
    </form>
  );
};

export default MatchResults;
