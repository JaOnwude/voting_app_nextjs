interface CandidateSelectProps {
  candidates: string[];
  selected: string;
  onChange: (value: string) => void;
}

export default function CandidateSelect({ candidates, selected, onChange }: CandidateSelectProps) {
  return (
    <div>
      <label htmlFor="candidate" className="block text-sm font-semibold text-amber-900 mb-1">
        Select Candidate
      </label>
      <select
        id="candidate"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-2 border-amber-200 bg-amber-50/30 px-4 py-2.5 text-gray-800 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
        required
      >
        <option value="" disabled>-- Select a candidate --</option>
        {candidates.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

// interface CandidateSelectProps {
//   candidates?: string[]; // Made optional for safety
//   selectedCandidate?: string;
//   onSelect: (candidate: string) => void;
// }

// export default function CandidateSelect({
//   candidates = [], 
//   selectedCandidate = '',
//   onSelect,
// }: CandidateSelectProps) {
//   return (
//     <select
//       value={selectedCandidate}
//       onChange={(e) => onSelect(e.target.value)}
//     >
//       <option value="" disabled>-- Select a candidate --</option>      
//       {candidates?.map((c) => (
//         <option key={c} value={c}>
//           {c}
//         </option>
//       ))}
//     </select>
//   );
// }