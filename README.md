Prompt:
```
import { db } from "https://cdn.jsdelivr.net/gh/jeffreyyoung/poe-chat-db@main/index.mjs"

let data = await db.get("some_key");
// null

console.log(await db.set("some_key", { anyThing: ["yay"] }))

await db.get("some_key")


/*
type JSON = Record<string, any>
type DB {
   get(key: string): Promise<JSON | null>
   set(key: string, value: JSON): Promise<JSON>
}
*/
```
