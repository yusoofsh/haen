import { useState } from "react"
import { getPosts } from "../src/services/items"
import Posts from "../src/components/posts"
import { Footer } from "../src/components/footer"
import { SEO } from "../src/components/seo"
import Bookmarks from "../src/components/bookmarks"
import Settings from "../src/components/settings"
import Navigation from "../src/components/navigation"
import Panel from "../src/lib/panel"

export default function Home({ data }) {
  const [panel, setPanel] = useState(Panel.posts)
  return (
    <div>
      <SEO title={"Hacker News"} description="My personal Hacker News reader" />
      <div className="min-h-screen flex flex-col mx-auto max-w-3xl px-4 md:px-0">
        <header className="py-40 sm:py-20 ">
          <h1 className="text-4xl sm:text-6xl font-black text-center sm:text-left text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500">
            {panel === Panel.bookmarks
              ? "Bookmarks"
              : panel === Panel.settings
              ? "Settings"
              : "Hacker News"}
          </h1>
          <Navigation
            activePanel={panel}
            onClickPosts={() => {
              setPanel(Panel.posts)
            }}
            onClickSaved={() => {
              setPanel(Panel.bookmarks)
            }}
            onClickSettings={() => {
              setPanel(Panel.settings)
            }}
          />
        </header>
        {panel === "bookmarks" ? (
          <Bookmarks />
        ) : panel === "settings" ? (
          <Settings />
        ) : (
          <Posts data={data} />
        )}
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const posts = await getPosts()
  const data = posts.filter(Boolean)

  // This is a cool addition to Next.js. They call it Incremental Static Regeneration
  // See: https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  return {
    props: {
      data,
    },
    revalidate: 60,
  }
}
