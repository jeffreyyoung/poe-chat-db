Prompt:
```
Include this script at the top of the html doc https://cdn.jsdelivr.net/gh/jeffreyyoung/poe-chat-db@main/index.js



It enables a new API to save data:

type JSON = Record<string, any>
type PoeDb {
   get(key: string): Promise<JSON | null>
   set(key: string, value: JSON): Promise<JSON>
}
window.poeDb = PoeDb
```
