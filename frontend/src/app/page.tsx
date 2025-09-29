
export default function Home() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="liquid-glass-card w-full max-w-2xl mx-auto p-8">
        <span className="liquid-glass-shine" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-center mb-2 relative z-10">
          Welcome to the Dashboard
        </h1>
        <p className="mt-2 text-center text-black/80 dark:text-white/80 relative z-10">
          This is where the main content of the dashboard will be displayed.
        </p>
      </div>
    </div>
  );
}
