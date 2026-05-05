"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/atoms/Logo";
import { logoutUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const navItems = [
  { href: "/exams", icon: "▣", label: "ড্যাশবোর্ড" },
  { href: "/exams", icon: "◎", label: "প্র্যাক্টিস দাও" },
  { href: "/exams", icon: "⌁", label: "পরীক্ষা দাও" },
  { href: "/results/latest", icon: "▤", label: "প্রশ্ন ব্যাংক" },
  { href: "/results/latest", icon: "☷", label: "এআই অ্যাসাইন সলভ" },
  { href: "/results/latest", icon: "▦", label: "নোটিশ" },
  { href: "/results/latest", icon: "♡", label: "রুটিন" },
  { href: "/results/latest", icon: "✧", label: "ই-পোর্টফোলিও" },
  { href: "/results/latest", icon: "☰", label: "প্রোফাইল সেটিং" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 bg-[#f8f8f9] px-4 py-7 lg:flex lg:flex-col">
      <div className="px-1">
        <Logo />
      </div>

      <nav className="mt-8 grid gap-1.5">
        {navItems.map((item, index) => {
          const active =
            (index === 0 && pathname === "/exams") ||
            (index === 2 && pathname !== "/exams" && (pathname.startsWith("/exams") || pathname.startsWith("/results")));

          return (
            <Link
              className={`flex h-10 items-center gap-3 rounded-lg px-3 text-xs font-semibold transition ${
                active ? "bg-fuchsia-50 text-slate-950" : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
              href={item.href}
              key={`${item.label}-${index}`}
            >
              <span className={`w-4 text-center text-sm ${active ? "text-fuchsia-700" : "text-slate-500"}`}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-5">
        {currentUser ? (
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <button
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                className="flex flex-1 items-center gap-3 rounded-xl px-1 py-1.5 text-left transition hover:bg-white"
                onClick={() => setMenuOpen((current) => !current)}
                type="button"
              >
                <Image
                  alt={`${currentUser.name} প্রোফাইল ছবি`}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
                  height={36}
                  src="/profile-avatar.svg"
                  width={36}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">শিক্ষার্থী</p>
                </div>
                <span
                  className={`text-[10px] text-slate-400 transition ${menuOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>
            </div>
            {menuOpen ? (
              <button
                className="shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold text-slate-400 transition hover:bg-white hover:text-fuchsia-700"
                onClick={handleLogout}
                type="button"
              >
                Logout
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
