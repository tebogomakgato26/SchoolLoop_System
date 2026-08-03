import { Learner, Status } from "@/types/attendance";

interface LearnerRowProps {
  learner: Learner;
  onStatusChange: (id: string, status: Status) => void;
}

export default function LearnerRow({ learner, onStatusChange }: LearnerRowProps) {
  return (
    <li className="grid grid-cols-[1fr_auto_auto] items-center py-3">
      <span className="text-sm font-medium text-slate-800">{learner.name}</span>

      <button
        onClick={() => onStatusChange(learner.id, "present")}
        aria-pressed={learner.status === "present"}
        aria-label="Mark present"
        className={`flex h-8 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
          learner.status === "present"
            ? "bg-green-100 text-green-600"
            : "text-slate-300 hover:bg-slate-100"
        }`}
      >
        ✓
      </button>

      <button
        onClick={() => onStatusChange(learner.id, "absent")}
        aria-pressed={learner.status === "absent"}
        aria-label="Mark absent"
        className={`flex h-8 w-9 items-center justify-center rounded-lg text-sm font-bold transition ${
          learner.status === "absent"
            ? "bg-red-100 text-red-500"
            : "text-slate-300 hover:bg-slate-100"
        }`}
      >
        ✕
      </button>
    </li>
  );
}