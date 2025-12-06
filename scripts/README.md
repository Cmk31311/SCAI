# SCAI Website Build Scripts

This directory contains scripts to help manage and update the SCAI website more efficiently.

## Configuration-Based Updates

All dynamic content is now managed through `config.json` in the root directory. This makes it easy to update:

- Contact information
- Download links
- Features list
- Taglines and descriptions
- Repository URLs

## Available Scripts

### `fetch-latest-release.js`

Automatically fetches the latest release information from GitHub and updates `config.json`.

```bash
npm run update-release
# or
node scripts/fetch-latest-release.js
```

**What it does:**
- Queries GitHub API for the latest release
- Updates the `latestTag` in config.json
- Updates the `filename` based on actual release assets
- Then runs the build script to update HTML

### `build.js`

Builds the final `index.html` from configuration.

```bash
npm run build
# or
node scripts/build.js
```

**What it does:**
- Reads `config.json`
- Injects values into HTML (if using template system)
- Generates final `index.html`

## Workflow Examples

### Update Contact Email

1. Edit `config.json`:
```json
{
  "contact": {
    "email": "newemail@example.com"
  }
}
```

2. Run build:
```bash
npm run build
```

### Update to Latest Release

```bash
npm run update-release
```

This will:
1. Fetch latest release from GitHub
2. Update config.json with new version
3. Rebuild HTML with new download links

### Add a New Feature

1. Edit `config.json` → `features.items` array:
```json
{
  "title": "New Feature",
  "description": "Description of the feature"
}
```

2. Run build:
```bash
npm run build
```

## Future Enhancements

Consider adding:

1. **Template System**: Create `index.template.html` with `{{placeholders}}` for more flexible HTML generation
2. **Environment Variables**: Use `.env` for sensitive data like API keys
3. **Validation**: Add schema validation for `config.json`
4. **CI/CD Integration**: Auto-update on GitHub releases via GitHub Actions
5. **Content Management**: Separate content files (features.json, steps.json, etc.)

## Manual Updates

You can still edit `index.html` directly if needed. The config system is optional but recommended for easier maintenance.

