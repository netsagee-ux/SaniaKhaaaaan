import { memo } from "react";
import Link from "next/link";

/* ================= Action Card ================= */

const ActionCard = memo(function ActionCard({
  title,
  desc,
  href,
  color,
}) {
  return (
    <Link href={href} className="group block">
      <div
        className="
          bg-white p-8 rounded-3xl border border-black/5
          shadow-sm hover:shadow-lg hover:-translate-y-1
          transition-transform transition-shadow duration-300
          will-change-transform
        "
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className="text-slate-500 mb-4">{desc}</p>

        <span className={`text-sm font-medium ${color}`}>
          Open →
        </span>
      </div>
    </Link>
  );
});

/* ================= Quick Actions ================= */

function QuickActions() {
  return (
    <section className="grid md:grid-cols-2 gap-8 mb-14">
      <ActionCard
        title="Manage Blogs ✍️"
        desc="Create, edit and manage blog posts."
        href="/admin/blog"
        color="text-indigo-600"
      />

      <ActionCard
        title="Case Studies 📊"
        desc="View and update your case studies."
        href="/admin/case-studies"
        color="text-amber-600"
      />
    </section>
  );
}

export default memo(QuickActions);