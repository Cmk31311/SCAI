# Quick Start Guide - SCAI Website Updates

## 🚀 Fast Updates

### Update Contact Email
```bash
# 1. Edit config.json
# Change: "email": "your-email@example.com"

# 2. Build
npm run build
```

### Update Download Link to Latest Release
```bash
# Option 1: Manual (edit config.json)
# Change latestTag: "v1.0.2" to new version
# Change filename if needed
npm run build

# Option 2: Auto-fetch (if repo is public)
npm run update-release
```

### Add/Edit Features
1. Edit `config.json` → `features.items` array
2. Run `npm run build`

### Change Tagline
1. Edit `config.json` → `site.tagline`
2. Run `npm run build`

## 📝 Common Updates

### Update Hero Section
Edit `config.json` → `site.hero`:
```json
{
  "hero": {
    "headline": "Your headline",
    "subtitle": "Your subtitle",
    "note": "Your note"
  }
}
```
Then: `npm run build`

### Update Features List
Edit `config.json` → `features.items`:
```json
{
  "items": [
    {
      "title": "Feature Name",
      "description": "Feature description"
    }
  ]
}
```
Then: `npm run build`

### Update Steps
Edit `config.json` → `steps`:
```json
{
  "steps": [
    {
      "number": 1,
      "title": "Step title",
      "description": "Step description"
    }
  ]
}
```
Then: `npm run build`

## ✅ Verify Changes

After running `npm run build`:
1. Check `index.html` was updated
2. Open in browser to verify
3. Commit changes to git

## 🔧 Troubleshooting

**Build fails?**
- Check `config.json` is valid JSON
- Use a JSON validator online

**Changes not appearing?**
- Make sure you ran `npm run build`
- Clear browser cache
- Check the generated HTML

**Release fetch fails?**
- Repository might be private (needs GITHUB_TOKEN)
- No releases published yet
- Repository name/owner incorrect in config.json

