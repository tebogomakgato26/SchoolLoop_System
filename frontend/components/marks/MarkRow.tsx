interface MarkRowProps {
  learnerId: string;
  learnerName: string;
  score: number | null;
  total: number;
  onScoreChange: (id: string, score: number | null) => void;
}

export default function MarkRow({ learnerId, learnerName, score, total, onScoreChange }: MarkRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-3">
      <p className="text-sm font-medium text-slate-800">{learnerName}</p>

      <input
        type="number"
        min={0}
        max={total}
        value={score ?? ""}
        onChange={(e) =>
          onScoreChange(learnerId, e.target.value === "" ? null : Number(e.target.value))
        }
        className="h-9 w-16 rounded-lg border border-slate-200 text-center text-sm"
      />

      <span className="w-10 text-sm text-slate-400">/ {total}</span>
    </li>
  );
}