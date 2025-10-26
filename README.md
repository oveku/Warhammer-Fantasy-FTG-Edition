# Warhammer Fantasy FTG Edition

Official repository: https://github.com/oveku/Warhammer-Fantasy-FTG-Edition

Welcome to the **Warhammer Fantasy FTG Edition** project! This is a custom Warhammer Fantasy Roleplay ruleset with extensive house rules and campaign materials designed for an immersive tabletop RPG experience.

---

## 📖 Table of Contents

1. [About This Project](#about-this-project)
2. [Prerequisites](#prerequisites)
3. [Step 1: Download and Install Git](#step-1-download-and-install-git)
4. [Step 2: Clone This Repository](#step-2-clone-this-repository)
5. [Step 3: Install Visual Studio Code](#step-3-install-visual-studio-code)
6. [Step 4: Open the Project in VSCode](#step-4-open-the-project-in-vscode)
7. [Step 5: Set Up ChatGPT AI Agent (Free)](#step-5-set-up-chatgpt-ai-agent-free)
8. [Project Structure](#project-structure)
9. [Environment and Generators (Windows)](#environment-and-generators-windows)
9. [How to Contribute](#how-to-contribute)
10. [Support](#support)

---

## 🎲 About This Project

This repository contains:
- **Custom House Rules** for Warhammer Fantasy Roleplay
- **Campaign Materials** including storylines, NPCs, and world-building
- **Character Resources** and reference documents
- **AI-Assisted Content** designed to work with ChatGPT for enhanced gameplay

The "FTG Edition" refers to our custom modifications that balance gameplay and enhance storytelling within the grim darkness of the Warhammer Fantasy universe.

---

## ✅ Prerequisites

Before you begin, you'll need:
- A Windows PC
- Internet connection
- A GitHub account (free) - [Sign up here](https://github.com/signup)
- A ChatGPT account (free) - [Sign up here](https://chat.openai.com/)

---

## 📥 Step 1: Download and Install Git

Git is a version control system that lets you download and manage code from GitHub.

### Windows
1. Go to [git-scm.com](https://git-scm.com/download/win)
2. Download the installer for Windows
3. Run the installer with default settings
4. Click "Next" through all prompts, then "Install"
5. Click "Finish" when complete

### Verify Installation
1. Open Windows PowerShell or Command Prompt
2. Type: `git --version`
3. You should see something like `git version 2.x.x`

---

## 📦 Step 2: Clone This Repository

"Cloning" means downloading a copy of this project to your computer.

### Option A: Clone with Git (Recommended)

1. **Open your terminal/command prompt**

2. **Navigate to where you want the project**
   ```powershell
   # Windows (PowerShell or Command Prompt)
   cd C:\Users\YourUsername\Documents
   ```

3. **Clone the repository**
   ```powershell
   git clone https://github.com/oveku/Warhammer-Fantasy-FTG-Edition.git
   ```

4. **Navigate into the project folder**
   ```powershell
   cd Warhammer-Fantasy-FTG-Edition
   ```

### Option B: Download as ZIP (Alternative)

1. Click the green **"Code"** button at the top of this GitHub page
2. Select **"Download ZIP"**
3. Extract the ZIP file to a location on your computer
4. Remember where you extracted it!

---

## 💻 Step 3: Install Visual Studio Code

Visual Studio Code (VSCode) is a free, powerful text editor perfect for viewing and editing this project.

### Download and Install

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Click the big **"Download"** button
3. Run the installer
4. Follow the installation wizard:
   - ✅ Check "Add to PATH" (important!)
   - ✅ Check "Create a desktop icon" (optional, but convenient)
   - ✅ Check "Add 'Open with Code' to context menu" (very useful!)
5. Click "Install"
6. Launch VSCode when installation completes

### Recommended Extensions

Once VSCode is open, enhance your experience with these extensions:

1. **Install Markdown Extensions** (for editing .md files like this one):
   - Click the Extensions icon (📦) on the left sidebar (or press `Ctrl+Shift+X`)
   - Search for "Markdown All in One"
   - Click "Install"
   - Search for "Markdown Preview Enhanced"
   - Click "Install"

2. **Install Git Extensions** (optional but helpful):
   - Search for "GitLens"
   - Click "Install"

3. **Install GitHub Copilot** (optional, AI coding assistant):
   - Search for "GitHub Copilot"
   - Click "Install"
   - Sign in with your GitHub account

---

## 📂 Step 4: Open the Project in VSCode

1. **Launch VSCode** if not already open
2. Click **"File"** → **"Open Folder..."**
3. Navigate to where you cloned/extracted the project
4. Select the **"Warhammer-Fantasy-FTG-Edition"** folder
5. Click **"Select Folder"**

### Getting Familiar with VSCode

- **Explorer (Left Sidebar)**: Browse all files in the project
- **Editor (Center)**: Edit files
- **Terminal (Bottom Panel)**: 
  - Open with `` Ctrl+` `` (backtick key)
  - Run git commands without leaving VSCode
- **Preview Markdown**: 
  - Open any `.md` file
  - Press `Ctrl+Shift+V` to see a formatted preview

---

## 🤖 Step 5: Set Up ChatGPT AI Agent (Free)

ChatGPT can help you understand rules, generate content, and assist with campaign planning. This project includes a special context file to help ChatGPT understand your house rules.

### Create Your Free ChatGPT Account

1. Go to [chat.openai.com](https://chat.openai.com/)
2. Click **"Sign Up"**
3. Use your email or sign in with Google/Microsoft
4. Verify your email address
5. You're ready to use ChatGPT!

### Set Up ChatGPT for This Project

#### Method 1: Share Context File (Recommended)

1. In VSCode, open the file: **`AI_CONTEXT.md`**
2. Copy the entire contents (`Ctrl+A` then `Ctrl+C`)
3. Go to ChatGPT and start a new chat
4. Paste the context at the beginning of your conversation
5. ChatGPT will now understand your house rules and campaign setting!

**Example First Message:**
```
[Paste AI_CONTEXT.md contents here]

I'm running a Warhammer Fantasy RPG campaign with these custom rules. 
Can you help me create a random encounter for a party traveling through 
the Reikland forest?
```

#### Method 2: Use Custom Instructions (ChatGPT Plus Only)

If you have ChatGPT Plus:
1. Click your profile icon in the bottom-left
2. Select **"Customize ChatGPT"**
3. In the "How would you like ChatGPT to respond?" section
4. Paste a condensed version of `AI_CONTEXT.md`
5. Save

#### Method 3: Upload as File (ChatGPT Plus Only)

ChatGPT Plus allows file uploads:
1. Start a new chat
2. Click the **📎 (paperclip)** icon
3. Upload the `AI_CONTEXT.md` file
4. ChatGPT will read and understand your project context

### Using ChatGPT Effectively

**Good prompts for this project:**
- "Generate a Chaos cultist NPC using the FTG Edition rules"
- "Create a random encounter table for the Empire"
- "Help me balance this custom magic item"
- "Suggest plot hooks for a political intrigue campaign in Altdorf"
- "Explain the corruption mechanics in simple terms"

**Tips:**
- Reference specific house rules or sections from your ruleset
- Ask ChatGPT to format responses as markdown tables
- Request stat blocks in the format used by your ruleset
- Have ChatGPT review homebrew content for balance

---

## 📁 Project Structure

```
Warhammer-Fantasy-FTG-Edition/
│
├── README.md                       # This file
├── AI_CONTEXT.md                   # Context for AI assistants
├── .gitignore
├── .env.example                    # Template for OPENAI_API_KEY
├── .env                            # Your local secrets (not committed)
├── package.json                    # NPM scripts and deps
├── package-lock.json
│
├── campaigns/
│   ├── README.md
│   └── shadows-of-the-southwest/   # Primary campaign
│       ├── README.md
│       ├── outline.md
│       ├── background.md
│       ├── hooks.md
│       ├── encounters.md
│       ├── locations.md
│       ├── npcs.md
│       ├── session-01.md
│       ├── session-02.md
│       ├── session-03.md
│       ├── session-04.md
│       ├── session-05.md
│       ├── session-05-mirror-duel.md   # Alternate S05 focused on the Mirror Duel
│       ├── Eau De Morr.png
│       └── handouts/
│           ├── handouts_prompts.html     # Prompt pack for image generation
│           ├── Handouts_Prompts.pdf      # Printable prompt overview (optional)
│           ├── generate_handout_images.mjs
│           ├── s01_apothecary_invoice.png
│           ├── images/                    # Generated handout images
│           │   ├── s01_*.png
│           │   ├── s02_*.png
│           │   ├── s03_*.png
│           │   ├── s04_*.png
│           │   └── s05_*.png
│           └── npcs/                      # NPC portraits and generator
│               ├── persons.html
│               ├── generate_npc_images.mjs
│               └── npc_*.png
│
├── characters/
│   └── README.md
├── rules/
│   └── README.md
├── world/
│   └── README.md
└── resources/
   └── README.md
```

---

## � Environment and Generators (Windows)

Use this to generate visual handouts and NPC portraits.

1) Create your .env

```powershell
Copy-Item -Path .env.example -Destination .env
# Open .env and set:
# OPENAI_API_KEY=sk-...
```

2) Install dependencies

```powershell
npm install
```

3) Generate handout images (maps, cards, invitations)

```powershell
npm run handouts:images
# Input:  campaigns/shadows-of-the-southwest/handouts/handouts_prompts.html
# Output: campaigns/shadows-of-the-southwest/handouts/images/*.png
```

4) Generate NPC portraits

```powershell
npm run handouts:npcs
# Input:  campaigns/shadows-of-the-southwest/handouts/npcs/persons.html
# Output: campaigns/shadows-of-the-southwest/handouts/npcs/npc_*.png
```

Notes:
- Requires a valid OpenAI API key in .env.
- Image generation may incur API costs.
- All scripts run from the project root in PowerShell.

---

## �🤝 How to Contribute

Want to add content or fix something? Here's how:

### 1. Make Your Changes

Edit files directly in VSCode. Save with `Ctrl+S`.

### 2. Stage Your Changes

Open the terminal in VSCode (`` Ctrl+` ``) and run:
```powershell
git add .
```

### 3. Commit Your Changes

```powershell
git commit -m "Brief description of what you changed"
```

Examples:
- `git commit -m "Added new combat house rule for mounted combat"`
- `git commit -m "Fixed typo in magic system document"`
- `git commit -m "Created new NPC: Baron von Richthofen"`

### 4. Push to GitHub

```powershell
git push origin main
```

(You may be prompted to enter your GitHub credentials)

### 5. Pull Latest Changes

Before you start working, always get the latest version:
```powershell
git pull origin main
```

---

## 🆘 Support

### Common Issues

**Problem: Git commands not working**
- Solution: Make sure Git is installed and added to PATH. Restart VSCode after installing Git.

**Problem: Can't push to GitHub**
- Solution: You need write access to the repository. Contact the repository owner.

**Problem: ChatGPT doesn't understand the house rules**
- Solution: Make sure you've provided the `AI_CONTEXT.md` file at the start of your conversation.

**Problem: Merge conflicts when pulling**
- Solution: This happens when multiple people edit the same file. See [Git Merge Conflicts Guide](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line).

### Get Help

- **Issues with this project**: Open an issue on GitHub
- **Questions about Warhammer**: Check the `world/` folder for lore
- **Technical problems**: Check the [VSCode Documentation](https://code.visualstudio.com/docs)

---

## 📜 License

This is a fan-made project for personal use. Warhammer Fantasy is the property of Games Workshop. This project is not affiliated with or endorsed by Games Workshop.

---

## 🎉 Ready to Play!

You're all set! Start by exploring the `rules/` folder to understand the house rules, then dive into the campaigns. Use ChatGPT to help generate content, answer questions, and enhance your gameplay.

**May Sigmar guide your rolls!** 🎲

---

*Last updated: October 2025*
