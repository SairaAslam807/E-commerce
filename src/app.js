import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.js";

const app = express();

app.use(cors ({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(express.json())
app.use(cookieParser());

app.use(express.static("public"))

app.use("/api", routes)

export{app}