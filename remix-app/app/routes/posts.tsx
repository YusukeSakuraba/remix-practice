import { ActionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    posts: await db.post.findMany(),
  });
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  // 型を固定してエラーを防ぐ
  const postId = (await formData.get("postId")) as string;

  if (!postId) {
    throw new Error("No post id");
  }

  await db.post.delete({ where: { id: postId } });
  return redirect(`/posts`);
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
            <form method="post">
              <input type="hidden" name="postId" value={post.id} />
              <button value="delete" type="submit" name="action">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
