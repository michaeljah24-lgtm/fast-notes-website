# Fast Notes Web — AEN Creative

A React + Vite landing page for Fast Notes.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The production files are created in the `dist` folder.

## Deploy to Netlify from GitHub

1. Create a new GitHub repository.
2. Upload all files in this project to the repository root.
3. In Netlify, select **Add new site** → **Import an existing project**.
4. Connect GitHub and choose the repository.
5. Netlify will automatically use:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy site**.

The included `netlify.toml` file handles the build settings and SPA redirects.
