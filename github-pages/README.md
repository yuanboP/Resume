# Yuanbo Pang - Academic Homepage

Static academic homepage prepared for GitHub Pages.

The current GitHub username is `yuanboP`, so the user-site repository should be named:

```text
yuanboP.github.io
```

GitHub repository names are case-insensitive for the Pages address. The expected site address is:

```text
https://yuanbop.github.io
```

## Publish

Create a public repository named `yuanboP.github.io`, then from this directory run:

```bash
git init -b main
git add .
git commit -m "Create academic homepage"
git remote add origin git@github.com:yuanboP/yuanboP.github.io.git
git push -u origin main
```

On GitHub, open:

```text
Settings -> Pages -> Build and deployment -> Source: Deploy from a branch
```

Select:

```text
Branch: main
Folder: / (root)
```

Save the setting and wait for the deployment to complete.

## Local preview

From this directory:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Updating the CV

Replace:

```text
assets/Yuanbo_Pang_CV.pdf
```

with the newest PhD CV, then commit and push the change.

## Custom domain

The existing custom domain can also be connected through GitHub Pages:

```text
Settings -> Pages -> Custom domain
```

Configure the matching DNS records with the domain provider and enable `Enforce HTTPS` after GitHub finishes verifying the domain.
