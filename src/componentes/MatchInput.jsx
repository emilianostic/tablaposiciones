import React, { useState } from 'react';

const MatchInput = ({ teams, onMatchResult }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [goals1, setGoals1] = useState('');
  const [goals2, setGoals2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (team1 && team2 && goals1 !== '' && goals2 !== '') {
      onMatchResult(team1, team2, parseInt(goals1), parseInt(goals2));
      setTeam1('');
      setTeam2('');
      setGoals1('');
      setGoals2('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={team1} onChange={(e) => setTeam1(e.target.value)}>
        <option value="">Select Team 1</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={goals1}
        onChange={(e) => setGoals1(e.target.value)}
        placeholder="Goals Team 1"
      />
      <select value={team2} onChange={(e) => setTeam2(e.target.value)}>
        <option value="">Select Team 2</option>
        {teams.map((team) => (
          <option key={team.name} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={goals2}
        onChange={(e) => setGoals2(e.target.value)}
        placeholder="Goals Team 2"
      />
      <button type="submit">Submit Result</button>
    </form>
  );
};

export default MatchInput;
