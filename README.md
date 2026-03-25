# 👗 Wardrobe — Digital Closet App

A beautifully designed digital closet app built with **React + TypeScript + Vite**.

<img width="1899" height="965" alt="Screenshot 2026-03-25 174133" src="https://github.com/user-attachments/assets/f3c73486-14cc-4a66-a4ad-c845943dd9ec" />

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
│   └── CSS/                  # Components CSS
│       ├── Layout.module.css
│       ├── Header.module.css
│       ├── Footer.module.css
│       ├── Toast.module.css
│       ├── UploadZone.module.css
│       ├── AddItemTab.module.css
│       ├── ClothingCard.module.css
│       ├── ClosetTab.module.css
│       ├── OutfitPiece.module.css
│       ├── OutfitsTab.module.css
│       ├── SavedOutfitList.module.css
│       └── SettingsTab.module.css
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
