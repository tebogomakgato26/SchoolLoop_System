interface AttendanceSummaryProps {
  presentCount: number;
  absentCount: number;
}

export default function AttendanceSummary({
  presentCount,
  absentCount,
}: AttendanceSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-slate-200 bg-slate-50 py-4 text-center">
        <p className="text-2xl font-bold text-slate-800">{presentCount}</p>
        <p className="text-xs font-medium text-slate-500">Present</p>
      </div>
      <div className="rounded-2xl border border-teal-700 bg-teal-50 py-4 text-center">
        <p className="text-2xl font-bold text-red-500">{absentCount}</p>
        <p className="text-xs font-medium text-slate-500">Absent</p>
      </div>
    </div>
  );
}