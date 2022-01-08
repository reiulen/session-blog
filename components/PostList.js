import CardPost from "./CardPost";
export default function PostList({ posts }) {
  return (
    <div className="flex -mx-4 flex-wrap">
      {posts.map((post) => (
        <div key={post.id} className="md:w-3/12 w-full">
          <div className="px-4 pb-2 pt-4 bg-white m-2 hover:translate-y-5">
            <CardPost {...post} />
          </div>
        </div>
      ))}
    </div>
  );
}
