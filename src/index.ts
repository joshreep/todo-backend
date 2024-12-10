import express from 'express'
import tasks from './routes/tasks'

const app = express()
const port = process.env.PORT ?? 3000

app.get("/", (req, res) => {
    res.send("Looking good!")
})

app.use(express.json())

app.use("/tasks", tasks)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})