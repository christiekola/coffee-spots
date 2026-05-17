# ☕ Christie's Toronto Coffee Spots

A personal coffee guide for Toronto with an interactive sketch map and AI chatbot.

---

## Deploying to Vercel (step by step)

### 1. Download this project
Download and unzip this folder onto your computer.

### 2. Push to GitHub
- Go to github.com and create a new repository (call it `coffee-spots` or anything you like)
- Open Terminal (Mac) or Command Prompt (Windows) and run:

```
cd path/to/coffee-site
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Deploy on Vercel
- Go to vercel.com and sign up / log in with your GitHub account
- Click **"Add New Project"**
- Import your `coffee-spots` repository
- Before clicking Deploy, go to **"Environment Variables"** and add:
  - Name: `ANTHROPIC_API_KEY`
  - Value: your API key (starts with `sk-ant-...`)
- Click **Deploy** — Vercel will give you a live URL in about a minute!

### 4. Done!
Your site is live. Every time you push changes to GitHub, Vercel will automatically redeploy.

---

## Running locally (optional)
If you want to preview on your own computer first:

```
npm install
cp .env.example .env.local
# edit .env.local and paste your real API key
npm run dev
```

Then open http://localhost:3000
