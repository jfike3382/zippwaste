This is a [Next.js](https://nextjs.org) project

### To run the app localy use:

1. npm run dev
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### To run the Cloudlfare server:

1. npm run build
2. npx @cloudflare/next-on-pages@1
3. npx wrangler pages dev .vercel/output/static --compatibility-flags=nodejs_compat --port 8789

### To push changes to main Github branch:

1. Sync everything on staging (commit)
2. Switch to the main branch (git checkout main)
3. Merge changes (git merge staging)
4. Push changes (git push origin main)
5. Initiate development to the production on Cloudflare
