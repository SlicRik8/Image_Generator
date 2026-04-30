function Landing({ setActiveTab }) {
  return (
    <section className="grid min-h-[78vh] items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-5 w-fit rounded-full border border-[#15120f]/10 bg-white/60 px-4 py-2 text-sm text-[#6f604f]">
          Built for quick ideas, not boring dashboards.
        </p>

        <h2 className="max-w-4xl font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
          Make things without making it a whole thing.
        </h2>

        <p className="mt-7 max-w-xl text-lg leading-8 text-[#63584e]">
          Imagine is a small creative workspace for images, questions, and recipes.
          No bloated menus. No fake futuristic nonsense. Just useful tools that feel
          good to use.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab("image-generator")}
            className="rounded-full bg-[#15120f] px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5"
          >
            Start creating
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("chat")}
            className="rounded-full border border-[#15120f]/15 bg-white/70 px-6 py-3 text-sm font-medium text-[#15120f] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ask something
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-[#d8a15f]/30 blur-3xl" />
        <div className="absolute -bottom-8 right-4 h-48 w-48 rounded-full bg-[#809671]/25 blur-3xl" />

        <div className="relative rounded-[2.5rem] border border-[#15120f]/10 bg-[#fffaf2] p-5 shadow-[0_30px_80px_rgba(40,30,20,0.12)]">
          <div className="rounded-[2rem] bg-[#15120f] p-6 text-white">
            <div className="mb-20 flex items-center justify-between">
              <span className="text-sm text-white/60">Today</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                3 tools
              </span>
            </div>

            <h3 className="font-serif text-4xl leading-tight">
              One place for the random stuff you actually need.
            </h3>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["Images", "Turn prompts into visuals."],
              ["Chat", "Think through ideas fast."],
              ["Recipes", "Cook with what you have."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-[#15120f]/10 bg-white p-4">
                <h4 className="font-medium">{title}</h4>
                <p className="mt-2 text-sm leading-5 text-[#75695e]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;