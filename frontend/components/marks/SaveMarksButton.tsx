interface SaveMarksButtonProps {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

export default function SaveMarksButton({ onSave, saving, saved }: SaveMarksButtonProps) {
  return (
    <button
      onClick={onSave}
      disabled={saving}
      className="mt-6 w-full rounded-xl bg-teal-800 py-3 text-sm font-semibold text-white transition hover:bg-teal-900 disabled:opacity-60"
    >
      {saving ? "Saving..." : saved ? "Saved" : "Save marks"}
    </button>
  );
}