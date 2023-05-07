import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) {
    throw new Error("There are no applicable post.");
  }

  return json({ post });
};

export default function PostDetailRoute() {
  const { post } = useLoaderData<typeof loader>();
  return (
    <div>
      <h2>Post詳細</h2>
      <p>title:{post.title}</p>
      <p>content:{post.content}</p>
    </div>
  );
}
