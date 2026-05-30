import config from "@/payload.config"
import { headers as getHeaders } from "next/headers.js"
import { getPayload } from "payload"
import "./styles.css"
import { HomePage } from "@/components/home/HomePage"

export default async function MainPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  await payload.auth({ headers })
  const { docs } = await payload.find({
    collection: "media",
    limit: 0,
  })

  return <HomePage media={docs} />
}
