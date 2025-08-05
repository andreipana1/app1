import getListings from "@/actions/getListings";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import PropertiesContainer from "@/components/properties-container";
import { getCurrentUser } from "@/utils/auth";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />;

  const listings = await getListings({ userId: currentUser.user.id });

  if (!listings.length)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <PropertiesContainer listings={listings} currentUser={currentUser} />
    </Container>
  );
}
