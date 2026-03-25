# 👗 Wardrobe — Digital Closet App

A beautifully designed digital closet app built with **React + TypeScript + Vite**.

## Features

- 📸 Upload clothing photos (drag & drop or browse)
- 🏷️ Tag items by category, color, and season
- ✨ Generate random outfits from your wardrobe
- 💾 Save favorite outfits
- 🎨 Customizable accent color
- ➕ Create custom clothing categories
- 💿 Persists data via `localStorage`

## Project Structure

```
src/
├── types/
│   └── index.ts              # All TypeScript interfaces & types
├── utils/
│   ├── constants.ts          # Default data, swatches, outfit names
│   ├── storage.ts            # localStorage abstraction
│   └── outfitGenerator.ts   # Random outfit logic
├── context/
│   └── AppContext.tsx        # Global state via React Context
├── hooks/
│   ├── useTheme.ts           # Syncs primary color CSS variable
│   └── useFileUpload.ts      # Drag & drop file upload logic
├── styles/
│   └── globals.css           # Global CSS, keyframes, variables
├── components/
│   ├── Layout.tsx/.module.css
│   ├── Header.tsx/.module.css
│   ├── Footer.tsx/.module.css
│   ├── Toast.tsx/.module.css
│   ├── UploadZone.tsx/.module.css
│   ├── AddItemTab.tsx/.module.css
│   ├── ClothingCard.tsx/.module.css
│   ├── ClosetTab.tsx/.module.css
│   ├── OutfitPiece.tsx/.module.css
│   ├── OutfitsTab.tsx/.module.css
│   ├── SavedOutfitList.tsx/.module.css
│   └── SettingsTab.tsx/.module.css
├── App.tsx                   # Root component
└── main.tsx                  # Entry point
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18** with hooks
- **TypeScript** (strict mode)
- **Vite** for blazing-fast dev & build
- **CSS Modules** for scoped styling
- **No external UI libraries** — fully custom design

## Credits

Coded by [@thakurxnipun](https://instagram.com/thakurxnipun)
