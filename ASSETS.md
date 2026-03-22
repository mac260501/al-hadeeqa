# Managing Assets

## How it works

The site serves images from **`public/assets/images/`** — this is the only folder the live site reads from.

The **`assets/images/`** folder is your source library (where you make changes). After editing there, you need to sync to `public/`.

## Syncing assets

Whenever you add, edit, or delete any image in `assets/images/`, run:

```bash
npm run sync-assets
```

This copies everything across and removes any files you've deleted. Then commit and push as normal.

## Adding new project photos

1. Add your image to `assets/images/projects/` — name it `proj-XX.jpg` (use the next available number)
2. Run `npm run sync-assets`
3. Add an entry to `PROJECT_IMGS` in `src/App.jsx`:
   ```js
   { src: "/assets/images/projects/proj-XX.jpg", label: "Your Label — Location" }
   ```
4. Commit and push

## Removing a project photo

1. Delete it from `assets/images/projects/`
2. Run `npm run sync-assets` (automatically removes it from `public/` too)
3. Remove its entry from `PROJECT_IMGS` in `src/App.jsx`
4. Commit and push

## Updating an existing image

1. Replace the file in `assets/images/` (keep the same filename)
2. Run `npm run sync-assets`
3. Commit and push — no code changes needed
