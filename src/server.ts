import express from "express"
import { router } from "./routes"
import { errorHandler } from "./middlewares/error-handler"

const app = express()

app.use(express.json())

app.use('/api', router)

app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });