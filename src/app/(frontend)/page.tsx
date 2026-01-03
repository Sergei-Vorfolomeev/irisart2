import config from "@/payload.config"
import { headers as getHeaders } from "next/headers.js"
import { getPayload } from "payload"
import "./styles.css"
import Image from "next/image"
import { Carousel } from "@/components/base/Carousel"
import { OrbitSlider } from "@/components/base/OrbitSlider"
import { OrbitSlider2 } from "@/components/base/OrbitSlider2"
import { OrbitSlider3 } from "@/components/base/OrbitSlider3"

export default async function MainPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const { docs } = await payload.find({
    collection: "media",
    // where: { type: { equals: "watercolour" } },
    limit: 0,
  })

  const items = docs.map((doc) => {
    if (doc && doc.url && typeof doc !== "number")
      return (
        <div key={doc.id}>
          <Image src={doc.url} alt={doc.alt} width={300} height={300} />
        </div>
      )
  })

  // return <OrbitSlider items={docs} />
  // return <OrbitSlider2 items={docs} />
  return <OrbitSlider3 items={docs} />
  // <div className="flex justify-center items-center">

  /* {docs.map((doc) => {
        if (doc && doc.url && typeof doc !== "number")
          return <Image key={doc.id} src={doc.url} alt={doc.alt} fill />
      })} */

  // return <Slider items={items} gap={24} />

  // </div>
}
