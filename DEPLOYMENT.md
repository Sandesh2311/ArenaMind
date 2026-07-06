# Deployment

ArenaMind AI is designed as a Vite-based frontend application and can be deployed on a static hosting platform such as Vercel.

## Recommended Deployment

1. Push the repository to a Git-based hosting platform.
2. Connect the repository to Vercel.
3. Configure the build command as `npm run build`.
4. Set the output directory to the Vite build output.
5. Add `VITE_GEMINI_API_KEY` as an environment variable for production deployments.

## Local Development

```bash
npm install
npm run dev
```

## Production Notes

- The application works without a Gemini key through local fallback logic.
- Production deployments should keep the API key in environment variables rather than in source control.
- The UI is static and can be served efficiently through a CDN.

## Verification

The deployment narrative is complemented by the visual preview assets in [README.md](README.md) and the screenshot bundle in [screenshots](screenshots).

After deployment, verify:

- The landing page loads correctly
- Dashboards are visible for each role
- The AI assistant responds with local or fallback behavior
- The build pipeline completes successfully