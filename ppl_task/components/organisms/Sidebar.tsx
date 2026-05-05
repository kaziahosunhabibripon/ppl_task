"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/atoms/Logo";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const navItems = [
  { href: "/exams", icon: "▣", label: "ড্যাশবোর্ড", match: "exact" },
  { href: "/exams", icon: "◱", label: "প্র্যাক্টিস দাও", match: "never" },
  { href: "/exams", icon: "➤", label: "পরীক্ষা দাও", match: "exam-flow" },
  { href: "/results/latest", icon: "▱", label: "প্রশ্ন ব্যাংক", match: "never" },
  { href: "/results/latest", icon: "▤", label: "AI এডিটিং রুম", match: "never" },
  { href: "/results/latest", icon: "□", label: "রুটিন", match: "never" },
  { href: "/results/latest", icon: "♔", label: "ই-লাইব্রেরি", match: "never" },
  { href: "/results/latest", icon: "▥", label: "নোটিশ বোর্ড", match: "result" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-[266px] bg-white/70 px-8 py-12 lg:flex lg:flex-col">
      <Logo size="sm" />

      <nav className="mt-9 grid gap-3">
        {navItems.map((item, index) => {
          const active =
            item.match === "exact"
              ? pathname === "/exams"
              : item.match === "exam-flow"
                ? pathname.startsWith("/exams/")
                : item.match === "result"
                  ? pathname.startsWith("/results")
                  : false;

          return (
            <Link
              className={`flex h-11 items-center gap-3 rounded-xl px-4 text-[12px] font-medium transition ${
                active ? "bg-[#f6e8fb] text-slate-900" : "text-slate-700 hover:bg-white/80"
              }`}
              href={item.href}
              key={`${item.label}-${index}`}
            >
              <span className="w-4 text-center text-[12px] text-slate-800">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200/70 pt-6">
        {currentUser ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">
                {currentUser.name.slice(0, 1).toUpperCase()}
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-fuchsia-600" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold leading-4 text-slate-900">
                  {currentUser.name}
                </p>
                <p className="text-[10px] leading-3 text-slate-500">Student</p>
              </div>
            </div>
            <button
              className="text-[10px] font-semibold text-slate-400 hover:text-fuchsia-700"
              onClick={handleLogout}
              type="button"
            >
              Exit
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
