#!/usr/bin/env node

/**
 * Fetches the latest release from GitHub and updates config.json
 * Usage: node scripts/fetch-latest-release.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const repo = config.repositories.app;
const apiUrl = `https://api.github.com/repos/${repo.owner}/${repo.name}/releases/latest`;

console.log(`🔍 Fetching latest release from ${repo.owner}/${repo.name}...`);

https.get(apiUrl, {
  headers: {
    'User-Agent': 'SCAI-Website-Builder',
    'Accept': 'application/vnd.github.v3+json'
  }
}, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 404) {
      console.error(`❌ Repository not found or no releases available: ${repo.owner}/${repo.name}`);
      console.error(`💡 Make sure the repository exists and has at least one release published.`);
      console.error(`💡 If the repo is private, you may need to set GITHUB_TOKEN environment variable.`);
      process.exit(1);
    }
    
    if (res.statusCode !== 200) {
      console.error(`❌ Failed to fetch release: ${res.statusCode}`);
      try {
        const error = JSON.parse(data);
        console.error(`Error: ${error.message || data}`);
      } catch {
        console.error(data);
      }
      process.exit(1);
    }

    try {
      const release = JSON.parse(data);
      const tag = release.tag_name;
      const version = tag.replace('v', '');

      // Find DMG file in assets
      const dmgAsset = release.assets.find(asset => 
        asset.name.endsWith('.dmg') && asset.name.includes('arm64')
      );

      if (dmgAsset) {
        config.repositories.app.latestTag = tag;
        config.repositories.app.filename = dmgAsset.name;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');
        console.log(`✅ Updated to ${tag}`);
        console.log(`📦 Filename: ${dmgAsset.name}`);
        console.log(`🔗 Download URL: ${dmgAsset.browser_download_url}`);
      } else {
        console.log(`⚠️  No arm64 DMG found in release ${tag}`);
        console.log(`Available assets: ${release.assets.map(a => a.name).join(', ')}`);
      }
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('❌ Error fetching release:', error.message);
  process.exit(1);
});

