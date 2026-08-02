// src/test-bcrypt.ts
import bcrypt from "bcrypt";

async function test() {
  const oldToken: string = "old-token";
  const newToken: string = "new-token";

  console.log(oldToken === newToken);

  const hash = await bcrypt.hash(newToken, 10);

  console.log("old:", await bcrypt.compare(oldToken, hash));
  console.log("new:", await bcrypt.compare(newToken, hash));
}

test();