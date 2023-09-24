import React from "react";

interface ListingCardProps {
  data: any;
  reservation?: any;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: any | null;
}

function ListingCard({
  currentUser,
  actionId,
  onAction,
  actionLabel,
  reservation,
  data,
  disabled,
}: ListingCardProps) {
  return <div>ListingCard</div>;
}

export default ListingCard;
