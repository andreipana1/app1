import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import TripContainer from "@/components/TripContainer";
import { getCurrentUser } from "@/utils/auth";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser.user.id });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!reservations.length)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );

  return (
    <TripContainer reservations={reservations} currentUser={currentUser} />
  );
}
