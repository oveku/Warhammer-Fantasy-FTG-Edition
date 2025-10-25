# GitHub Setup Instructions

Your project has been initialized and committed locally! Now you need to push it to GitHub.

## Quick Setup Steps

### 1. Create a GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **"+"** icon in the top-right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name:** `Warhammer-Fantasy-FTG-Edition`
   - **Description:** "Custom Warhammer Fantasy Roleplay ruleset with house rules and campaigns"
   - **Visibility:** Choose Public or Private
   - **DO NOT** check "Initialize with README" (you already have one!)
5. Click **"Create repository"**

### 2. Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you setup commands. Use these:

#### Option A: If you see the "push an existing repository" section:

Copy and paste these commands in your VSCode terminal (replace YOUR_USERNAME):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
git branch -M main
git push -u origin main
```

#### Option B: Manual setup

In the VSCode terminal, run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 3. Authenticate

When you push for the first time, you'll be asked to authenticate:

- **Windows:** A browser window will open for authentication, or you'll be prompted for credentials
- **If asked for password:** GitHub no longer accepts passwords - use a Personal Access Token instead

#### Creating a Personal Access Token (if needed):

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Warhammer Project"
4. Select scopes: check **repo** (all sub-options)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. Use this token as your password when pushing

### 4. Verify Success

After pushing, you should see:

```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
...
To https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
 * [new branch]      main -> main
```

Go to your GitHub repository in the browser - you should see all your files!

## Common Issues

### Issue: "remote origin already exists"

Solution:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
```

### Issue: "authentication failed"

Solutions:
1. Use a Personal Access Token instead of password (see above)
2. Or use GitHub Desktop app (easier for beginners)
3. Or use SSH keys (advanced)

### Issue: "refusing to merge unrelated histories"

This means the GitHub repo has files. Solution:
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Alternative: Use GitHub Desktop (Easier for Beginners)

If the command line is confusing:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. Click "Add" → "Add existing repository"
4. Browse to `c:\source\Warhammer Fantasy FTG Edition`
5. Click "Publish repository"
6. Choose name and visibility, then publish!

## Next Steps

Once pushed to GitHub:

1. ✅ Your code is backed up in the cloud
2. ✅ Others can clone and collaborate
3. ✅ You can access it from anywhere
4. ✅ GitHub tracks all changes automatically

### Future Updates

Whenever you make changes:

```powershell
git add .
git commit -m "Description of changes"
git push
```

That's it! Your Warhammer Fantasy FTG Edition is ready to share! 🎲
