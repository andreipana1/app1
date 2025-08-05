import getListings from "@/actions/getListings";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";
import { getCurrentUser } from "@/utils/auth";

export default async function FavoritePage() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.user?.favoriteIds?.length) {
    return <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />;
  }

  const favorites = await getListings({});
  const favoriteListings = favorites.filter(listing => 
    currentUser.user.favoriteIds?.includes(listing.id)
  );

  if (favoriteListings.length === 0) {
    return <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings." />;
  }

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {favoriteListings.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
