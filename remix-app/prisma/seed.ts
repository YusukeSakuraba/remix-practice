import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    postList().map((post) => {
      return db.post.create({ data: post });
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
