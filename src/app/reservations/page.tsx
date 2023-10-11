import getReservations from "@/actions/getReservations";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ReservationContainer from "@/components/ReservationContainer";
import { getCurrentUser } from "@/utils/auth";

export default async function ReservationPage() {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser.user.id });

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!reservations.length)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <ReservationContainer
        reservations={reservations}
        currentUser={currentUser}
      />
    </Container>
  );
}
