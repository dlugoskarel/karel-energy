/**
 * lib/scroll.ts
 * Helpers pre plynulé skrolovanie v rámci stránky a inteligentné skrolovanie naprieč routami (HashRouter).
 * - smoothScrollToId: plynulo posunie viewport na element, ak existuje.
 * - smartNavigateToId: ak element neexistuje v aktuálnej stránke, presmeruje na domov a doskroluje po načítaní.
 */

 /**
  * smoothScrollToId
  * Plynulé skrolovanie na element podľa id, ak existuje v DOM.
  */
export function smoothScrollToId(id: string, behavior: ScrollBehavior = 'smooth') {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior, block: 'start' })
}

/**
 * smartNavigateToId
 * Inteligentné skrolovanie:
 * - Ak element existuje priamo teraz, hneď skroluje.
 * - Inak:
 *   - presmeruje na domov (#/),
 *   - počká, kým sa sekcia vyrenderuje (krátke intervalové pokusy do 2s),
 *   - následne plynulo doskroluje.
 *
 * Pozn.: funguje s HashRouter, kde domov je v URL tvare `#/`.
 */
export function smartNavigateToId(id: string) {
  const tryScroll = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }
    return false
  }

  // Ak už teraz vieme skrolovať, urobme to.
  if (tryScroll()) return

  const HOME_HASH = '#/'
  const currentHash = window.location.hash || HOME_HASH

  // Malý pomocník na krátke pokusy so skrolovaním (DOM sa môže dotvoriť po navigácii).
  const pollForElement = (timeoutMs = 2000, intervalMs = 50) => {
    const start = Date.now()
    const timer = window.setInterval(() => {
      if (tryScroll() || Date.now() - start > timeoutMs) {
        clearInterval(timer)
      }
    }, intervalMs)
  }

  // Ak nie sme na domove, naviguj na domov a počkaj na hashchange + poll.
  if (currentHash !== HOME_HASH) {
    const onHashChange = () => {
      window.removeEventListener('hashchange', onHashChange)
      // Po príchode na domov začneme krátko pollovať, kým sa sekcia neobjaví.
      pollForElement()
    }
    window.addEventListener('hashchange', onHashChange)
    // Presmerovanie na domov (HashRouter)
    window.location.hash = '/'
  } else {
    // Sme na domove, ale sekcia ešte nie je v DOM – krátky polling.
    pollForElement()
  }
}
