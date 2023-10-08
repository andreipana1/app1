import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import ListingClient from "@/app/listings/[listingId]/ListingClient";
import EmptyState from "@/components/EmptyState";

type Props = {
  params: {
    listingId?: string;
  };
};
export default async function ListingsPage({ params }: Props) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) return <EmptyState />;

  return <ListingClient listing={listing} reservations={reservations} />;
}
