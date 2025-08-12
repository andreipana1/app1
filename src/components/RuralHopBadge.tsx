"use client";

interface RuralHopBadgeProps {
  amenity?: any;
  className?: string;
}

export default function RuralHopBadge({ 
  amenity, 
  className = "" 
}: RuralHopBadgeProps) {
  if (!amenity) return null;

  return (
    <div 
      className={`
        absolute top-3 left-3 z-10
        rotate-3 bg-ruralhop-sand text-ruralhop-forest 
        px-3 py-1 font-medium text-xs tracking-wide 
        transform shadow-[1px_1px_0px_rgba(45,80,22,0.3)]
        border border-ruralhop-stone/20
        backdrop-blur-sm bg-ruralhop-sand/90
        hover:rotate-1 transition-transform duration-300
        ${className}
      `}
    >
      🌿 ECO-FRIENDLY
    </div>
  );
}