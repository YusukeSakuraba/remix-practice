import { ActionArgs, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");

  if (typeof content !== "string" || typeof title !== "string") {
    throw new Error("Form not submitted correctly.");
  }

  const fields = { title, content };

  const post = await db.post.create({ data: fields });
  return redirect(`/posts/`);
};

export default function NewPostRoute() {
  return (
    <div>
      <form method="post">
        <div>
          <label>
            title: <input type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Content: <textarea name="content" />
          </label>
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
