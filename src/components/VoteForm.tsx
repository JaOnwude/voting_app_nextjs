import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CandidateSelect from './CandidateSelect';
import VoteStats from './VoteStats';
import ResultModal from './ResultModal';

async function fetchVoteData() {
  const res = await fetch('/api/votes');
  if (!res.ok) throw new Error('Failed to fetch voting data');
  return res.json();
}

async function castVote(payload: { voterId: string; candidate: string }) {
  const res = await fetch('/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error submitting vote');
  return data;
}

export default function VoteForm() {
  const queryClient = useQueryClient();
  const [voterId, setVoterId] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
    queryKey: ['votes'],
    queryFn: fetchVoteData,
  });

    const mutation = useMutation({
    mutationFn: castVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['votes'] });
      setFeedback({ type: 'success', msg: 'Vote submitted successfully!' });
      setVoterId('');
      setSelectedCandidate('');
    },
    onError: (err: Error) => {
      setFeedback({ type: 'error', msg: err.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!voterId.trim() || !selectedCandidate) return;
    mutation.mutate({ voterId: voterId.trim(), candidate: selectedCandidate });
  };

  if (isLoading) return <p className="text-center py-10 text-amber-800">Loading voting system...</p>;
  if (isError) return <p className="text-center py-10 text-red-600">Failed to connect to voting server.</p>;

  return (
    <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-2xl border-2 border-amber-200">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="voterId" className="block text-sm font-semibold text-amber-900 mb-1">
            Voter Name or ID
          </label>
          <input
            id="voterId"
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            placeholder="e.g., James or voter-01"
            className="w-full rounded-lg border-2 border-amber-200 bg-amber-50/30 px-4 py-2.5 text-gray-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
        </div>

        <CandidateSelect
          candidates={data.candidates}
          selected={selectedCandidate}
          onChange={setSelectedCandidate}
        />

        {feedback && (
          <p
            className={`text-sm font-semibold ${
              feedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {feedback.msg}
          </p>
        )}

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {mutation.isPending ? 'Submitting...' : 'Submit Vote'}
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-amber-100 px-4 py-2.5 font-semibold text-amber-800 hover:bg-amber-200 transition"
          >
            View Logs
          </button>
        </div>
      </form>

      <VoteStats votes={data.votes} />
      <ResultModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} voters={data.voters} />
    </div>
  );
}