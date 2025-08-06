"use client";

interface PetCoutureBadgeProps {
  petPolicy?: any;
  className?: string;
}

export default function PetCoutureBadge({ 
  petPolicy, 
  className = "" 
}: PetCoutureBadgeProps) {
  if (!petPolicy) return null;

  return (
    <div 
      className={`
        absolute top-3 left-3 z-10
        rotate-12 bg-dior-blush text-dior-green 
        px-3 py-1 font-serif text-xs tracking-widest 
        transform shadow-[1px_1px_0px_rgba(184,139,106,0.3)]
        border border-dior-saddle/20
        backdrop-blur-sm bg-dior-blush/90
        hover:rotate-6 transition-transform duration-300
        ${className}
      `}
    >
      🐕 DIOR PET COLLECTION
    </div>
  );
}