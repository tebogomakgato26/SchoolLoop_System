// frontend/components/principal/PageHeader.tsx

interface PageHeaderProps {
  title: string;
  subtitle: string;
  isLive?: boolean;
  action?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, isLive, action }: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-bold text-gray-900">{title}</h1>
        <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {isLive && (
          <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        )}
        {action}
      </div>
    </div>
  );
}
