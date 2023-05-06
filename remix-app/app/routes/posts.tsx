import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    posts: await db.post.findMany(),
  });
};

export default function Posts() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>post list</h1>
      <ul>
        {data.posts.map((post) => (
          <li key={post.id}>
            {post.title}
            {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
