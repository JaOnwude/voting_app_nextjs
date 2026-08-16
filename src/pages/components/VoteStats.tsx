interface VoteStatsProps {
  votes: Record<string, number>;
}

export default function VoteStats({ votes }: VoteStatsProps) {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-amber-100 pt-6">
      {Object.entries(votes).map(([candidate, count]) => (
        <div key={candidate} className="flex flex-col items-center rounded-xl bg-amber-50 p-4 border border-amber-200">
          <span className="text-sm font-semibold text-amber-800">{candidate}</span>
          <span className="mt-1 text-2xl font-bold text-emerald-700">{count}</span>
        </div>
      ))}
    </div>
  );
}