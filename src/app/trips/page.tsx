import getReservations from "@/actions/getReservations";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import TripContainer from "@/components/trip-container";
import { getCurrentUser } from "@/utils/auth";

export default async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const reservations = await getReservations({ userId: currentUser.user.id });

  if (!reservations.length)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <TripContainer reservations={reservations} currentUser={currentUser} />
    </Container>
  );
}
