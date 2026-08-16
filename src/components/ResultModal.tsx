interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  voters: Array<{ voterId: string; candidate: string }>;
}

export default function ResultModal({ isOpen, onClose, voters }: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border-2 border-amber-300">
        <h2 className="text-xl font-bold text-amber-900 mb-4">Audit Log ({voters.length} total votes)</h2>
        <div className="max-h-60 overflow-y-auto divide-y divide-amber-100">
          {voters.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">No votes recorded yet.</p>
          ) : (
            voters.map((v, i) => (
              <div key={i} className="flex justify-between py-2 text-sm">
                <span className="font-mono text-gray-600">{v.voterId}</span>
                <span className="font-semibold text-emerald-700">{v.candidate}</span>
              </div>
            ))
          )}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-emerald-600 py-2.5 font-semibold text-white hover:bg-emerald-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}