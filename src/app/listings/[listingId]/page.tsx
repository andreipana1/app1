import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/empty-state";
import ListingContainer from "@/components/listing-container";
import { getCurrentUser } from "@/utils/auth";

type Props = {
  params: Promise<{
    listingId: string;
  }>;
};
export default async function ListingsPage({ params }: Props) {
  const resolvedParams = await params;
  const listing = await getListingById({ listingId: resolvedParams.listingId });
  const reservations = await getReservations({ listingId: resolvedParams.listingId });
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <ListingContainer
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}
