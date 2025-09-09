# Simple Networking Quiz

Small structural quiz web app that loads questions from `questions.json` and runs in the browser.

Files
- `indes.html` — main HTML file (open in a browser).
- `app.js` — quiz logic (loads `questions.json`, handles score, progress, next/restart).
- `style.css` — styles for the quiz UI.
- `questions.json` — question bank (array of { question, options, answer }).

Quick start

1. Open the project folder in your file explorer and double-click `indes.html` to open it in your default browser.

Or serve it with a simple static server (PowerShell):

```powershell
# install http-server globally if you don't have it
npm install -g http-server; http-server -c-1
```

Then open the URL printed by the server (e.g. `http://127.0.0.1:8080/`) and navigate to `indes.html`.

Notes and troubleshooting
- `questions.json` must be a JSON array of objects with keys: `question` (string), `options` (array of 4 strings), and `answer` (the correct option string).
- If questions fail to load, check browser console for CORS/file errors when opening the file directly; use a static server if needed.
- Keyboard shortcuts: press 1–4 to select an option when a question is shown.
