import { Container } from "../container/container";
import { Skeleton } from "../ui/skeleton";

export const RecipeListSkeleton = () => {
  return (
    <>
      <Container>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[3/4] bg-border/30" />
          ))}
        </div>
      </Container>
    </>
  );
};
