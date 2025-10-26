# GitHub Setup (Windows Only)

Official repository: https://github.com/oveku/Warhammer-Fantasy-FTG-Edition

Use this guide to either clone the official project or publish your own fork from Windows.

## Option 1: Clone the Official Repository (Recommended)

1) Choose a folder for your source code

```powershell
New-Item -ItemType Directory -Path C:\source -Force | Out-Null
Set-Location C:\source
```

2) Clone and open

```powershell
git clone https://github.com/oveku/Warhammer-Fantasy-FTG-Edition.git
Set-Location "C:\source\Warhammer Fantasy FTG Edition"
```

3) Pull updates later

```powershell
git pull origin main
```

## Option 2: Publish Your Own Repository (Fork or New Repo)

If you created a new repository under your account or forked the project, point your local folder at it.

1) Create the repo on GitHub under your account (do not initialize with a README).

2) Set the remote and push from your existing local folder:

```powershell
Set-Location "C:\source\Warhammer Fantasy FTG Edition"
git remote remove origin  # only if origin already exists
git remote add origin https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Authentication

When pushing for the first time, a browser may open to authenticate. If prompted for a password, use a Personal Access Token.

Create a token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token, name it (e.g., "Warhammer Project"), select the `repo` scope
3. Generate and copy the token; use it in place of a password

## Verify Success

After pushing, you should see console output ending with:

```
To https://github.com/<user>/Warhammer-Fantasy-FTG-Edition.git
   <commit>.. <commit>  main -> main
```

Visit your repository page to confirm files are present.

## Common Issues (Windows)

Remote already exists:
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/Warhammer-Fantasy-FTG-Edition.git
```

Authentication failed:
```powershell
# Use a Personal Access Token instead of a password
```

Refusing to merge unrelated histories (remote had content):
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## Alternative: GitHub Desktop (Windows)

1. Install [GitHub Desktop](https://desktop.github.com/)
2. Sign in with GitHub
3. Add → Add existing repository
4. Select `C:\source\Warhammer Fantasy FTG Edition`
5. Publish repository (choose name/visibility)

## Daily Workflow

```powershell
git add .
git commit -m "Description of changes"
git push
```

That’s it—your project is ready to share. 🎲
