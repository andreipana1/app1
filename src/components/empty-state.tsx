import Link from "next/link";

import Heading from "@/components/heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No hotels found",
  subtitle = "Try adjusting your search criteria or removing some filters.",
  showReset,
}: EmptyStateProps) {
  return (
    <section className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />

      {showReset && (
        <Link
          href="/"
          className="mt-2 rounded-lg hover:opacity-80 transition duration-300 bg-ruralhop-forest text-white border-2 border-ruralhop-forest p-3 text-center"
        >
          Remove all filters
        </Link>
      )}
    </section>
  );
}
