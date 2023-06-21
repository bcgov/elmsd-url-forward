import * as express from "express"
import * as urlController from "../controllers/url.controller"

const router = express.Router()

router.get("/:uuid", urlController.getUrl)
// router.post("/", urlController.createUrl)

export default router
