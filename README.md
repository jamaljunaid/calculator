# Basic Calculator

Files:
- `index.html` — main UI
- `styles.css` — styling
- `script.js` — calculator logic

Open `index.html` in a browser to use the calculator. For a local static server (PowerShell):

```powershell
# serve current directory on port 8000
cd "calculator-app"; python -m http.server 8000;
# then open http://localhost:8000 in a browser
```

Notes:
- This is a simple client-side calculator. The expression is lightly sanitized before evaluation.
- Avoid entering arbitrary JavaScript — it's intended for arithmetic expressions only.

Dark mode:
- Use the theme toggle button at the top-right of the calculator to switch between light and dark modes.
- The chosen theme is saved to `localStorage` so it persists across reloads.