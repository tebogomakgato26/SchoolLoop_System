interface TeacherHeaderProps {
  date: string;
  teacherName: string;
  subject: string;
  grade: string;
}

export default function TeacherHearder({
  date,
  teacherName,
  subject,
  grade,
}: TeacherHeaderProps) {
  return (
    <div className="border-b border-teal-700 pb-4 text-white">
      <p className="text-xs font-medium text-teal-200">{date}</p>
      <h1 className="mt-1 text-lg font-bold leading-tight">{teacherName}</h1>
      <p className="text-sm text-teal-200">
        {subject} - {grade}
      </p>
    </div>
  );
}