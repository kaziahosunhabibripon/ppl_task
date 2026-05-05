import Image from "next/image";

type LogoProps = {
  size?: "sm" | "lg";
};

export function Logo({ size = "lg" }: LogoProps) {
  const isSmall = size === "sm";

  return (
    <div className={`inline-flex items-center ${isSmall ? "gap-1.5" : "gap-2"}`}>
      <Image
        alt=""
        className={isSmall ? "h-4 w-4" : "h-7 w-7"}
        height={37}
        priority
        src="/Vector.svg"
        width={37}
      />
      <span
        className={
          isSmall
            ? "text-[13px] font-black leading-none tracking-normal text-slate-950"
            : "text-[26px] font-black leading-none tracking-normal text-slate-950"
        }
      >
        পাঞ্জেরী
      </span>
    </div>
  );
}
