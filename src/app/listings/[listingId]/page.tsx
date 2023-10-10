import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingContainer from "@/components/ListingContainer";

type Props = {
  params: {
    listingId?: string;
  };
};
export default async function ListingsPage({ params }: Props) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;

  return <ListingContainer listing={listing} reservations={reservations} />;
}
