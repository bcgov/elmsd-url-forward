import { Response, Request } from "express"
import * as urlService from "../services/url.service"

const getUrl = async (req: Request, res: Response) => {
    try {
        const { uuid } = req.params
        const { uid } = req.query
        console.log(uuid, uid)
        if (!uid) return res.status(401).json({ message: "Need UID" })
        const url = await urlService.getUrl(uuid)
        if (!url) return res.status(401).json({ message: "URL not found" })
        const queryParams = req.url.split("?")[1]
        const rurl = `${url.url}?${queryParams}`
        console.log(rurl)
        return res
            .status(200)
            .set(
                "Content-Security-Policy",
                "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
            )
            .render("redirect", { uid, rurl, matomoId: url.matomoId, matomoUrl: process.env.MATOMO_URL })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

const createUrl = async (req: Request, res: Response) => {
    try {
        const { url, matomoId } = req.body
        if (!url) return res.status(401).json({ message: "Need URL" })
        if (!matomoId) return res.status(401).json({ message: "Need Matomo ID" })
        const newUrl = await urlService.createUrl(url, matomoId)
        return res.status(200).json(newUrl)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export { getUrl, createUrl }
