import client from "../db/config"

const getUrl = (uuid: string) =>
    client.url.findUnique({
        where: {
            uuid
        }
    })

const createUrl = (url: string, matomoId: string) =>
    client.url.create({
        data: {
            url,
            matomoId
        }
    })

const updateUrl = (uuid: string, url: string) =>
    client.url.update({
        where: {
            uuid
        },
        data: {
            url
        }
    })

const deleteUrl = (uuid: string) =>
    client.url.delete({
        where: {
            uuid
        }
    })

export { getUrl, createUrl, updateUrl, deleteUrl }
