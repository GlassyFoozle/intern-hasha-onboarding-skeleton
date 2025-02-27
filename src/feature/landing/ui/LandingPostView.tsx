import { SkeletonPostCard } from './SkeletonPostCard';

export const LandingPostView = () => {
  const PostCardView = () => {
    return (
      <>
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonPostCard key={index} />
        ))}
      </>
    );
  };

  return (
    <>
      <main>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[20px]">
          <PostCardView />
        </div>
      </main>
      <footer>푸터푸터</footer>
    </>
  );
};
