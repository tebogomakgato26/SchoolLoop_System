import { Mark } from "@/types/marks";

interface MarkRowProps {
  mark: Mark;
  onScoreChange: (id: string, score: number) => void;
}

export default function MarkRow({ mark, onScoreChange }: MarkRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-3">
      <p className="text-sm font-medium text-slate-800">{mark.learnerName}</p>

      <input
        type="number"
        min={0}
        max={100}
        value={mark.score}
        onChange={(e) => onScoreChange(mark.id, Number(e.target.value))}
        className="h-9 w-14 rounded-lg border border-slate-200 text-center text-sm"
      />

      <span className="text-sm text-slate-400">%</span>
    </li>
  );
}