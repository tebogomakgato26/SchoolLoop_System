import { TimetableSlot } from "@/types/timetable";

const timetable: TimetableSlot[] = [
  { day: "Monday", time: "08:00 - 08:45", subject: "Mathematics", grade: "Grade 9A" },
  { day: "Monday", time: "09:00 - 09:45", subject: "Mathematics", grade: "Grade 9B" },
  { day: "Tuesday", time: "08:00 - 08:45", subject: "Mathematics", grade: "Grade 9A" },
  { day: "Tuesday", time: "10:00 - 10:45", subject: "Mathematics", grade: "Grade 10A" },
  { day: "Wednesday", time: "08:00 - 08:45", subject: "Mathematics", grade: "Grade 9A" },
  { day: "Thursday", time: "09:00 - 09:45", subject: "Mathematics", grade: "Grade 9B" },
  { day: "Friday", time: "08:00 - 08:45", subject: "Mathematics", grade: "Grade 9A" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function TimetableGrid() {
  return (
    <div className="space-y-6">
      {days.map((day) => {
        const slots = timetable.filter((s) => s.day === day);
        return (
          <div key={day}>
            <h2 className="mb-2 text-sm font-semibold text-slate-700">{day}</h2>
            {slots.length === 0 ? (
              <p className="text-sm text-slate-400">No lessons scheduled.</p>
            ) : (
              <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100">
                {slots.map((slot, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-teal-700">
                      {slot.time}
                    </span>
                    <span className="text-sm text-slate-800">{slot.subject}</span>
                    <span className="text-xs text-slate-400">{slot.grade}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}