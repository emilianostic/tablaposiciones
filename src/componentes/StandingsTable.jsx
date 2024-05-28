import React from 'react';

const StandingsTable = ({ teams }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Played</th>
          <th>Won</th>
          <th>Drawn</th>
          <th>Lost</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Goal Difference</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team) => (
          <tr key={team.name}>
            <td>{team.name}</td>
            <td>{team.played}</td>
            <td>{team.won}</td>
            <td>{team.drawn}</td>
            <td>{team.lost}</td>
            <td>{team.goalsFor}</td>
            <td>{team.goalsAgainst}</td>
            <td>{team.goalDifference}</td>
            <td>{team.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StandingsTable;

