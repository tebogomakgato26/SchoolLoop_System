interface SaveButtonProps {
  onSave: () => void;
  saving: boolean;
  saved: boolean;
}

export default function SaveButton({ onSave, saving, saved }: SaveButtonProps) {
  return (
    <button
      onClick={onSave}
      disabled={saving}
      className="mt-6 w-full rounded-xl bg-teal-800 py-3 text-sm font-semibold text-white transition hover:bg-teal-900 disabled:opacity-60"
    >
      {saving ? "Saving..." : saved ? "Saved" : "Save register"}
    </button>
  );
}