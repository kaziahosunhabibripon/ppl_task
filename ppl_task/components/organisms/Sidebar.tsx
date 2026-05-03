"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Logo } from "@/components/atoms/Logo";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const navItems = [
  { href: "/exams", icon: "▦", label: "ড্যাশবোর্ড" },
  { href: "/exams", icon: "▣", label: "প্র্যাক্টিস দাও" },
  { href: "/exams", icon: "➤", label: "পরীক্ষা দাও" },
  { href: "/results/latest", icon: "□", label: "প্রশ্ন ব্যাংক" },
  { href: "/results/latest", icon: "☰", label: "নোটিশ বোর্ড" },
  { href: "/results/latest", icon: "▤", label: "রুটিন" },
  { href: "/results/latest", icon: "♡", label: "ফেভারিট" },
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
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white/95 px-6 py-8 lg:flex lg:flex-col">
      <Logo />

      <nav className="mt-8 grid gap-2">
        {navItems.map((item, index) => {
          const active = index === 0 ? pathname === "/exams" : pathname.startsWith(item.href) && index === 2;

          return (
            <Link
              className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition ${
                active ? "bg-fuchsia-50 text-fuchsia-800" : "text-slate-700 hover:bg-slate-50"
              }`}
              href={item.href}
              key={`${item.label}-${index}`}
            >
              <span className="w-5 text-center text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-5">
        {currentUser ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-fuchsia-100 text-sm font-bold text-fuchsia-800">
                {currentUser.name.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">Student</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-slate-500 hover:text-fuchsia-700" onClick={handleLogout}>
              Exit
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
