Prompt:
```
import { db } from "https://cdn.jsdelivr.net/gh/jeffreyyoung/poe-chat-db@main/index.mjs"

// The database is very slow, so avoid uneccessarily calling "db.get" after "db.set"

// returns Promise<null> if no data
let data = await db.get("some_key");

// returns "Promise<{ hello: ["yay"] })>
data = await db.set("some_key", { hello: ["yay"] })

// returns "Promise<{ hello: ["yay"] })>
await db.get("some_key")


/*
type JSON = Record<string, any>
type DB {
   get(key: string): Promise<JSON | null>
   set(key: string, value: JSON): Promise<JSON>
}
*/
```
