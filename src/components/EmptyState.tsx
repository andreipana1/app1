import Link from "next/link";

import Heading from "@/components/Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}: EmptyStateProps) => (
  <section className="h-[60vh] flex flex-col gap-2 justify-center items-center">
    <Heading title={title} subtitle={subtitle} center />

    {showReset && (
      <Link
        href="/"
        className="mt-2 rounded-lg hover:opacity-80 transition duration-300 bg-transparent border-2 border-black p-3 text-center"
      >
        Remove all filters
      </Link>
    )}
  </section>
);

export default EmptyState;
