import { memo, useMemo } from "react";
import Greeting from "./Greeting";

function DashboardHero() {

  // Memoize greeting so it runs only once per mount
  const greeting = useMemo(() => Greeting(), []);

  return (
    <section
      className="
        mb-12 p-10 rounded-[28px]
        bg-gradient-to-br from-[#f3eadf] to-[#e7dbc8]
        border border-black/5 shadow-sm
      "
    >
      <h1 className="text-4xl lg:text-5xl font-semibold text-slate-800 mb-3">
        {greeting}
      </h1>

      <p className="text-slate-600 text-lg">
        Here’s what’s happening with your platform today.
      </p>
    </section>
  );
}

export default memo(DashboardHero);