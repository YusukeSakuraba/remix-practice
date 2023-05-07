import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const user1 = await db.user.create({
    data: {
      username: "user1",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    postList().map((post) => {
      const data = { userId: user1.id, ...post };
      return db.post.create({ data });
    })
  );
}

seed();

function postList() {
  return [
    {
      title: "あああpost1",
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      title: "あｓｄっｆ",
      content: `Create some new users and posts in your seed.ts file:Create some new users and posts in your seed.ts file:`,
    },
    {
      title: "types/nodeaa",
      content: `@types/nodeは、TypeScriptのプロジェクトでNode.jsを使うときに必要となる型定義ファイルのセットです。TypeScriptはJavaScriptのスーパーセットで、型情報を追加することでより堅牢なコードが書けるようになっています。`,
    },
  ];
}
