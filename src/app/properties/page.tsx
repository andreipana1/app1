import React from "react";

import getListings from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";
import PropertiesContainer from "@/components/PropertiesContainer";
import { getCurrentUser } from "@/utils/auth";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser.user.id });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!listings.length)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );

  return <PropertiesContainer listings={listings} currentUser={currentUser} />;
}
