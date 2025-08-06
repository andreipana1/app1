"use client";

import { MdPets } from "react-icons/md";

interface PetBadgeProps {
  petsAllowed: boolean;
  maxPets?: number;
  petFee?: number;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

export default function PetBadge({ 
  petsAllowed, 
  maxPets, 
  petFee, 
  size = "md",
  showDetails = false 
}: PetBadgeProps) {
  if (!petsAllowed) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2"
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-green-100 text-green-800 rounded-full font-medium ${sizeClasses[size]}`}>
      <MdPets size={iconSizes[size]} />
      <span>Pet Friendly</span>
      {showDetails && (
        <div className="ml-1 text-xs">
          {maxPets && <span>• Max {maxPets}</span>}
          {petFee && <span>• ${petFee} fee</span>}
        </div>
      )}
    </div>
  );
}