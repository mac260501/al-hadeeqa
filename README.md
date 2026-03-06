# Al Hadeeqa Contracting — Website

## Deployment Options

### Option 1: Deploy the build folder (simplest)
The `build/` folder (or this folder's contents minus source files) is a ready-to-deploy static site.
Upload to: Netlify, Vercel, or any static host by dragging the build folder.

### Option 2: Run locally or develop further
```bash
npm install
npm start       # dev server
npm run build   # production build
```

## Contacts in Code
- WhatsApp: +971 54 441 9854
- Phone: +971 54 441 9854
- Email: alhadeeqallc@gmail.com

## Pages / Routes
- `/` → Main website (index.html)
- `/bunker` → Keep existing bunker.html page as-is

## To deploy on Netlify (same as current setup)
1. Drag the `build/` folder to Netlify dashboard
2. Add redirect: `/* /index.html 200` in `_redirects` file
3. Point custom domain as before
