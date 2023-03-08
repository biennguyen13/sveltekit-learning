import { fail } from "@sveltejs/kit"
import { Game } from "./game"

/** @type {import('./$types').PageServerLoad} */
export const load = (event) => {
  const { cookies } = event
  console.log(
    "🚀 ~ file: +page.server.js:7 ~ load ~ cookies:",
    cookies.get("sverdle")
  )
  const game = new Game(cookies.get("sverdle"))
  console.log("🚀 ~ file: +page.server.js:9 ~ load ~ game:", game)
  return {
    /**
     * The player's guessed words so far
     */
    guesses: game.guesses,

    /**
     * An array of strings like '__x_c' corresponding to the guesses, where 'x' means
     * an exact match, and 'c' means a close match (right letter, wrong place)
     */
    answers: game.answers,

    /**
     * The correct answer, revealed if the game is over
     */
    answer: game.answers.length >= 6 ? game.answer : null,
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  /**
   * Modify game state in reaction to a keypress. If client-side JavaScript
   * is available, this will happen in the browser instead of here
   */
  update: async ({ request, cookies }) => {
    console.log("🚀 ~ file: +page.server.js:35 ~ update:")

    const game = new Game(cookies.get("sverdle"))

    const data = await request.formData()
    const key = data.get("key")

    const i = game.answers.length

    if (key === "backspace") {
      game.guesses[i] = game.guesses[i].slice(0, -1)
    } else {
      game.guesses[i] += key
    }

    cookies.set("sverdle", game.toString())
  },

  /**
   * Modify game state in reaction to a guessed word. This logic always runs on
   * the server, so that people can't cheat by peeking at the JavaScript
   */
  enter: async ({ request, cookies }) => {
    console.log("🚀 ~ file: +page.server.js:61 ~ enter")

    const game = new Game(cookies.get("sverdle"))

    const data = await request.formData()
    const guess = /** @type {string[]} */ (data.getAll("guess"))

    if (!game.enter(guess)) {
      return fail(400, { badGuess: true })
    }

    cookies.set("sverdle", game.toString())
  },

  restart: async ({ cookies }) => {
    console.log("🚀 ~ file: +page.server.js:86 ~ restart")
    cookies.delete("sverdle")
  },
}
