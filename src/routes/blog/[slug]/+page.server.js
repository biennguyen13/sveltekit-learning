import { error } from "@sveltejs/kit"

/** @type {import('./$types').PageServerLoad} */
export function load({ params }) {
  console.log("🚀 ~ file: +page.js:5 ~ load ~ params:", params)
  if (params.slug === "hello-world") {
    return {
      title: "Hello world!",
      content: "Welcome to our blog. Lorem ipsum dolor sit amet...",
    }
  }

  throw error(404, "Not found")
}
