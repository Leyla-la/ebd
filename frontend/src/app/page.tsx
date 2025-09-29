
export default function Home() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="w-full max-w-2xl mx-auto p-8 rounded-3xl border border-white/30 bg-white/20 shadow-xl backdrop-blur-[16px]"
        style={{ WebkitBackdropFilter: "blur(16px) saturate(180%)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome to the Dashboard
        </h1>
        <p className="mt-2 text-center text-black/80 dark:text-white/80">
          This is where the main content of the dashboard will be displayed.
        </p>
      </div>
    </div>
  );
}
