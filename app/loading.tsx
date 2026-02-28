export default function Loading() {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-[#e9e5df]
      "
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6">

        <div
          className="
            w-10 h-10
            border-2 border-neutral-300
            border-t-black
            rounded-full
            animate-spin
            will-change-transform
          "
        />

        <p
          className="
            text-xs tracking-[0.3em]
            text-neutral-600
          "
        >
          LOADING
        </p>

      </div>
    </div>
  );
}