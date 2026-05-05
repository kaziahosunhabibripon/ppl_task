import Image from "next/image";

type LogoProps = {
  emphasized?: boolean;
};

export function Logo({ emphasized = false }: LogoProps) {
  return (
    <div className={`inline-flex items-center ${emphasized ? "gap-2" : "gap-1.5"}`}>
      <Image
        alt=""
        aria-hidden="true"
        className={emphasized
          ? "h-7 w-7 drop-shadow-[0_4px_10px_rgba(120,37,201,0.28)]"
          : "h-6 w-6 drop-shadow-[0_1px_3px_rgba(120,37,201,0.28)]"}
        height={emphasized ? 34 : 30}
        src="/Vector.png"
        width={emphasized ? 34 : 30}
      />
      <span
        className={emphasized
          ? "bg-[linear-gradient(180deg,#231642,#05030d)] bg-clip-text text-[17px] font-black tracking-[0.01em] text-transparent drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]"
          : "text-[15px] font-black tracking-normal text-slate-950"}
      >
        পাঞ্জেরী
      </span>
    </div>
  );
}
