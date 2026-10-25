# ATIL Website

Digital Growth Agency website for **ATIL (Artallur Technologies)** — ads, websites, and marketing.

## 🚀 Overview
This repository contains the standalone, high-performance static frontend for ATIL. It is designed to run entirely client-side without any backend server dependencies, making it optimal for zero-configuration, lightning-fast deployment on **Vercel**, **GitHub Pages**, or **Netlify**.

## 🛠️ Tech Stack
- **HTML5** & **Modern Semantic markup**
- **Modern CSS3** (Custom properties, responsive grid & flexbox, accessible typography)
- **Vanilla JavaScript** (Zero external heavy dependencies, IntersectionObserver animations, interactive FAQ accordion, mobile navigation)
- **Vercel Static Config** (`vercel.json`)

## ⚡ How to Deploy on Vercel

1. **Sign in to Vercel**:
   Go to [vercel.com](https://vercel.com) and log in with your GitHub account.

2. **Import Repository**:
   - In the Vercel Dashboard, click **"Add New..."** → **"Project"**.
   - Select your GitHub account and find the **`ATIL`** repository (or `ashahattaraki2522-sudo/ATIL`).
   - Click **"Import"**.

3. **Configure Project**:
   - **Framework Preset**: Select **"Other"** (Vercel usually auto-detects this).
   - **Root Directory**: `./` (default).
   - **Build and Output Settings**: Leave empty / default (no build command needed since it's a pure static website).

4. **Deploy**:
   - Click **"Deploy"**.
   - Within 10-15 seconds, your site will be live with a production URL (e.g., `https://atil.vercel.app`) with automatic HTTPS and global edge CDN.

## 💻 Running Locally

You can test the site locally in any of the following ways:
- **Direct**: Double click `index.html` or open it in your browser.
- **VS Code**: Use the *Live Server* extension.
- **PowerShell**: Run `./serve.ps1` to start a local static server on `http://localhost:4173/`.
