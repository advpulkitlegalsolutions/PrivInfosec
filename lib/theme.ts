/**
 * The site is dark-only: <html data-theme="dark"> is rendered on the server,
 * so no theme resolution is needed at runtime. This inline, render-blocking
 * script only adds the `js` class (used by scroll reveals) before first
 * paint. It is a static string with no user input.
 */
export const jsFlagScript = `document.documentElement.classList.add('js');`;
