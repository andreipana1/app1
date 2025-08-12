import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="w-max inline-block">
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="text-2xl font-bold text-ruralhop-forest">
          🏡 RuralHop
        </div>
        <div className="hidden md:block text-sm text-ruralhop-stone font-medium">
          Hotels
        </div>
      </div>
    </Link>
  );
}
