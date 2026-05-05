import Image from "next/image";

export function Logo() {
  return (
    <div className="inline-flex items-center gap-1.5">
      <Image
        alt=""
        aria-hidden="true"
        className="h-6 w-6 drop-shadow-[0_1px_3px_rgba(120,37,201,0.28)]"
        height={30}
        src="/Vector.png"
        width={30}
      />
      <span className="text-[15px] font-black tracking-normal text-slate-950">পাঞ্জেরী</span>
    </div>
  );
}
