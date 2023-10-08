import getListings, { IListingsParams } from "@/actions/getListings";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/listings/ListingCard";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <section className="gridContainer">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} />
        ))}
      </section>
    </Container>
  );
}
