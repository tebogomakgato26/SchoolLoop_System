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
    <div className="rounded-t-3xl bg-teal-800 px-5 pb-5 pt-4 text-white">
      <p className="text-xs font-medium text-teal-100">{date}</p>
      <h1 className="mt-1 text-xl font-bold">{teacherName}</h1>
      <p className="text-sm text-teal-100">
        {subject} - {grade}
      </p>
    </div>
  );
}