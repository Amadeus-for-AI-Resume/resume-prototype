# Amadeus for AI

A resume-writing project for job seekers. This first version is a buildless, browser-local prototype, not a live Claude-powered service.

## Working features

- Resume editor with live preview.
- Text export and print-to-PDF using the browser dialog.
- Target-job revision prompt with explicit no-fabrication instructions.
- Fictional sample data, empty-state handling, and clear-entry controls.

Resume content is kept only in tab memory. No storage, analytics, accounts, server uploads, paid services, or model API calls are included.

## Roadmap

- Keep the founder profile and domain contact channel current.
- Gather genuine user feedback; do not invent traction.
- Add opt-in Claude API rewriting only after funding/budget and privacy arrangements are confirmed.

## Company facts supplied by the founder

- Legal name: Amadeus for AI.
- Registered in Oregon, United States, November 2025.
- Independently founded, no outside funding, no prior Anthropic startup credits.

These statements have not been independently verified against registration records. No LLC/Inc suffix has been assumed.

## Deployment

The static files are deployed on Cloudflare Pages at https://amadeu.tech/. No build command or dependencies are needed. Include the .mjs files; use HTTPS for clipboard support. Do not upload the workspace's unrelated old index.html or .openai hosting identity.
