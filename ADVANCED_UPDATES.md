# Advanced Update System for SCAI Website

This document explains the advanced update system that makes it easy to maintain and update the SCAI website.

## 🎯 Overview

Instead of editing HTML directly, you now have:

1. **`config.json`** - Centralized configuration for all dynamic content
2. **Build scripts** - Automate updates and releases
3. **GitHub Actions** - Auto-update on new releases (optional)

## 📋 Quick Start

### Update Contact Email

```bash
# 1. Edit config.json
# Change: "email": "cmkadhar3@gmail.com"

# 2. Build
npm run build
```

### Update to Latest Release

```bash
npm run update-release
```

This automatically:
- Fetches latest release from GitHub
- Updates download links
- Rebuilds the website

### Add/Edit Features

Edit `config.json` → `features.items` array, then run `npm run build`.

## 🔧 Configuration Structure

### `config.json` Sections

```json
{
  "site": {
    "name": "SCAI",
    "tagline": "Where vision becomes understanding.",
    "title": "...",
    "description": "...",
    "hero": { ... }
  },
  "contact": {
    "email": "cmkadhar3@gmail.com"
  },
  "repositories": {
    "app": {
      "owner": "Cmk31311",
      "name": "ScreenAI-app",
      "useLatest": true,
      "latestTag": "v1.0.2",
      "filename": "SCAI-{version}-arm64.dmg"
    }
  },
  "features": { ... },
  "steps": [ ... ],
  "security": [ ... ]
}
```

## 🚀 Available Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build HTML from config.json |
| `npm run update-release` | Fetch latest release + build |
| `node scripts/fetch-latest-release.js` | Just fetch release info |
| `node scripts/build.js` | Just build HTML |

## 🔄 Workflow Examples

### Scenario 1: New Release Published

```bash
# Option A: Manual
npm run update-release

# Option B: Automatic (if GitHub Actions enabled)
# Just push a new release to ScreenAI-app repo
# The workflow will auto-update this website
```

### Scenario 2: Update Features List

1. Edit `config.json`:
```json
{
  "features": {
    "items": [
      {
        "title": "New Feature",
        "description": "Description here"
      }
    ]
  }
}
```

2. Build:
```bash
npm run build
```

### Scenario 3: Change Tagline

1. Edit `config.json`:
```json
{
  "site": {
    "tagline": "New tagline here"
  }
}
```

2. Build:
```bash
npm run build
```

## 🤖 GitHub Actions (Optional)

To enable automatic updates when you publish a new release:

1. The workflow file is already created: `.github/workflows/auto-update-release.yml`

2. To trigger it manually:
   - Go to Actions tab
   - Run "Auto-update on Release" workflow
   - Or trigger via API when publishing a release

3. To auto-trigger on releases, add this to your ScreenAI-app repository:
   - Create a webhook that calls this repo's workflow
   - Or use repository_dispatch events

## 📝 Current Limitations

The current system:
- ✅ Centralizes configuration
- ✅ Auto-fetches releases
- ✅ Makes updates easy
- ⚠️ Still requires manual HTML editing for structure changes
- ⚠️ Template system not fully implemented

## 🔮 Future Enhancements

Consider implementing:

1. **Full Template System**
   - Create `index.template.html` with `{{placeholders}}`
   - Generate complete HTML from template + config

2. **Content Separation**
   - Split into `content/features.json`, `content/steps.json`
   - Easier to manage large content blocks

3. **Validation**
   - Add JSON schema validation
   - Catch errors before building

4. **Preview Mode**
   - Local dev server with hot reload
   - Preview changes before deploying

5. **Version Control**
   - Track config changes
   - Rollback to previous versions

## 💡 Tips

- **Always commit `config.json`** - It's the source of truth
- **Test locally** with `npm run build` before pushing
- **Use `update-release`** before major deployments
- **Keep config.json formatted** - Use a JSON formatter

## 🆘 Troubleshooting

**Build fails?**
- Check `config.json` is valid JSON
- Ensure all required fields are present

**Release not found?**
- Check repository name/owner in config
- Verify release exists on GitHub
- Check network connectivity

**Changes not appearing?**
- Run `npm run build` after editing config
- Clear browser cache
- Check generated `index.html`

