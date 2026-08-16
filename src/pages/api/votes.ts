import type { NextApiRequest, NextApiResponse } from 'next';

type VoteData = {
  candidates: string[];
  votes: Record<string, number>;
  voters: Array<{ voterId: string; candidate: string; timestamp: string }>;
};

// In-memory store
const db: VoteData = {
  candidates: ['Lillian', 'Victor', 'Ifeanyi'],
  votes: { Lillian: 0, Victor: 0, Ifeanyi: 0 },
  voters: [],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(db);
  }

  if (req.method === 'POST') {
    const { voterId, candidate } = req.body;

    if (!voterId || !candidate) {
      return res.status(400).json({ message: 'Voter ID and Candidate are required.' });
    }

    if (!db.candidates.includes(candidate)) {
      return res.status(400).json({ message: 'Invalid candidate selection.' });
    }

    const existingVoter = db.voters.find((v) => v.voterId.toLowerCase() === voterId.toLowerCase());
    if (existingVoter) {
      return res.status(409).json({ message: `Voter ID "${voterId}" has already cast a vote.` });
    }

    db.votes[candidate] = (db.votes[candidate] || 0) + 1;
    db.voters.push({ voterId, candidate, timestamp: new Date().toISOString() });

    return res.status(201).json({ message: 'Vote recorded successfully!', votes: db.votes });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}