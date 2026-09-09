import { createServer } from "node:http";

const app = createServer(async (req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200,  { "Content-Type": "application/json" })
        const users = await fetch("https://api.github.com/users").then(res => res.json())
        res.end(JSON.stringify(users))
    }
})

export default app