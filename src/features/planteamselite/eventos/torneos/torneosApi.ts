export interface Team {
  id: string;
  name: string;
}

export interface Match {
  id: string;
  round: number;
  team1: string; // Team ID
  team2: string; // Team ID
  winner: string | null; // Team ID of the winner, or null if not played
}

export interface Tournament {
  id: string;
  name: string;
  teams: Team[];
  matches: Match[];
  status: 'upcoming' | 'in-progress' | 'completed';
  startDate: string;
  endDate: string;
}

// Mock API client for tournament operations
let mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Torneo de Verano',
    teams: [
      { id: 't1', name: 'Equipo Alpha' },
      { id: 't2', name: 'Equipo Beta' },
      { id: 't3', name: 'Equipo Gamma' },
      { id: 't4', name: 'Equipo Delta' },
    ],
    matches: [
      { id: 'm1', round: 1, team1: 't1', team2: 't2', winner: null },
      { id: 'm2', round: 1, team1: 't3', team2: 't4', winner: null },
    ],
    status: 'upcoming',
    startDate: '2025-07-01',
    endDate: '2025-07-15',
  },
];

export const torneosApi = {
  getTournaments: async (): Promise<Tournament[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTournaments), 500);
    });
  },

  getTournamentById: async (id: string): Promise<Tournament | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTournaments.find(t => t.id === id)), 500);
    });
  },

  createTournament: async (newTournament: Omit<Tournament, 'id' | 'status'>): Promise<Tournament> => {
    return new Promise((resolve) => {
      const tournament: Tournament = { ...newTournament, id: String(mockTournaments.length + 1), status: 'upcoming' };
      mockTournaments.push(tournament);
      setTimeout(() => resolve(tournament), 500);
    });
  },

  updateTournament: async (updatedTournament: Tournament): Promise<Tournament> => {
    return new Promise((resolve, reject) => {
      const index = mockTournaments.findIndex(t => t.id === updatedTournament.id);
      if (index !== -1) {
        mockTournaments[index] = updatedTournament;
        setTimeout(() => resolve(updatedTournament), 500);
      } else {
        reject(new Error('Tournament not found'));
      }
    });
  },

  deleteTournament: async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const initialLength = mockTournaments.length;
      mockTournaments = mockTournaments.filter(t => t.id !== id);
      setTimeout(() => resolve(mockTournaments.length < initialLength), 500);
    });
  },

  // New endpoints for advanced tournament management
  generateBrackets: async (tournamentId: string, format: string): Promise<Match[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        if (tournament) {
          console.log(`Generating ${format} brackets for tournament ${tournamentId}`);
          // Placeholder for bracket generation logic
          const generatedMatches: Match[] = [
            { id: 'gm1', round: 1, team1: tournament.teams[0].id, team2: tournament.teams[1].id, winner: null },
            { id: 'gm2', round: 1, team1: tournament.teams[2].id, team2: tournament.teams[3].id, winner: null },
          ];
          tournament.matches = [...tournament.matches, ...generatedMatches];
          resolve(generatedMatches);
        } else {
          reject(new Error('Tournament not found'));
        }
      }, 500);
    });
  },

  applySeeding: async (tournamentId: string, method: string): Promise<Team[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        if (tournament) {
          console.log(`Applying ${method} seeding for tournament ${tournamentId}`);
          // Placeholder for seeding logic (e.g., reordering teams)
          const seededTeams = [...tournament.teams].sort((a, b) => a.name.localeCompare(b.name)); // Example seeding
          tournament.teams = seededTeams;
          resolve(seededTeams);
        } else {
          reject(new Error('Tournament not found'));
        }
      }, 500);
    });
  },

  startStreaming: async (matchId: string): Promise<{ streamUrl: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Starting stream for match ${matchId}`);
        resolve({ streamUrl: `https://mockstream.com/match/${matchId}` });
      }, 500);
    });
  },

  stopStreaming: async (matchId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Stopping stream for match ${matchId}`);
        resolve(true);
      }, 500);
    });
  },

  getTournamentAnalytics: async (tournamentId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        if (tournament) {
          console.log(`Fetching analytics for tournament ${tournamentId}`);
          resolve({
            totalMatches: tournament.matches.length,
            completedMatches: tournament.matches.filter(m => m.winner !== null).length,
            // More detailed analytics would go here
          });
        } else {
          reject(new Error('Tournament not found'));
        }
      }, 500);
    });
  },

  awardPrizes: async (tournamentId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        if (tournament) {
          console.log(`Awarding prizes for tournament ${tournamentId}`);
          // Placeholder for prize awarding logic
          resolve({ message: 'Prizes awarded successfully' });
        } else {
          reject(new Error('Tournament not found'));
        }
      }, 500);
    });
  },

  postToSocialMedia: async (tournamentId: string, message: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        if (tournament) {
          console.log(`Posting to social media for tournament ${tournamentId}: ${message}`);
          resolve(true);
        } else {
          reject(new Error('Tournament not found'));
        }
      }, 500);
    });
  },

  placeVirtualBet: async (tournamentId: string, teamId: string, amount: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        const team = tournament?.teams.find(t => t.id === teamId);
        if (tournament && team) {
          console.log(`Placing virtual bet on ${team.name} for ${amount} in tournament ${tournamentId}`);
          resolve({ success: true, message: `Bet placed on ${team.name}` });
        } else {
          reject(new Error('Tournament or Team not found'));
        }
      }, 500);
    });
  },

  manageRefereeSchedule: async (tournamentId: string, refereeId: string, matchId: string, time: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tournament = mockTournaments.find(t => t.id === tournamentId);
        const match = tournament?.matches.find(m => m.id === matchId);
        if (tournament && match) {
          console.log(`Assigning referee ${refereeId} to match ${matchId} at ${time} in tournament ${tournamentId}`);
          resolve({ success: true, message: `Referee ${refereeId} assigned to match ${matchId}` });
        } else {
          reject(new Error('Tournament or Match not found'));
        }
      }, 500);
    });
  },
};

