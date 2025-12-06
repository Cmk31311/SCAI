#!/usr/bin/env node

/**
 * Build script that updates index.html from config.json
 * Usage: node scripts/build.js
 */

const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Load current HTML
const htmlPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Helper function to generate download URL
function getDownloadUrl() {
  const repo = config.repositories.app;
  if (repo.useLatest && repo.latestTag) {
    // Use specific tag but with latest redirect pattern, or use the tag directly
    const version = repo.latestTag.replace('v', '');
    const filename = repo.filename.replace('{version}', version);
    // Use the specific tag URL for reliability
    return `https://github.com/${repo.owner}/${repo.name}/releases/download/${repo.latestTag}/${filename}`;
  } else if (repo.useLatest) {
    // Fallback to latest endpoint
    return `https://github.com/${repo.owner}/${repo.name}/releases/latest`;
  } else {
    const version = repo.latestTag.replace('v', '');
    const filename = repo.filename.replace('{version}', version);
    return `https://github.com/${repo.owner}/${repo.name}/releases/download/${repo.latestTag}/${filename}`;
  }
}

const downloadUrl = getDownloadUrl();

// 1. Update meta tags
html = html.replace(
  /<title>.*?<\/title>/,
  `<title>${config.site.title}</title>`
);

html = html.replace(
  /<meta name="description" content=".*?" \/>/,
  `<meta name="description" content="${config.site.description}" />`
);

// 2. Update logo text
html = html.replace(
  /<span class="logo-text">.*?<\/span>/,
  `<span class="logo-text">${config.site.name}</span>`
);

// 3. Update hero section
html = html.replace(
  /<p class="badge[^>]*>.*?<\/p>/,
  `<p class="badge animate-on-scroll fade-in">${config.site.tagline}</p>`
);

html = html.replace(
  /<h1 class="[^"]*">.*?<\/h1>/,
  `<h1 class="animate-on-scroll slide-in-up animate-delay-100">${config.site.hero.headline}</h1>`
);

html = html.replace(
  /<p class="subtitle[^>]*>.*?<\/p>/,
  `<p class="subtitle animate-on-scroll fade-in animate-delay-200">${config.site.hero.subtitle}</p>`
);

html = html.replace(
  /<p class="hero-note[^>]*>.*?<\/p>/,
  `<p class="hero-note animate-on-scroll fade-in animate-delay-400">${config.site.hero.note}</p>`
);

// 4. Update download links (all instances)
const downloadLinkRegex = /https:\/\/github\.com\/[^"']+\.dmg/g;
html = html.replace(downloadLinkRegex, downloadUrl);

// 5. Update features section
const featuresHeadingMatch = html.match(/<h2 class="[^"]*">Built for [^<]*<\/h2>/);
if (featuresHeadingMatch) {
  html = html.replace(
    /<h2 class="[^"]*">Built for [^<]*<\/h2>/,
    `<h2 class="animate-on-scroll slide-in-up">${config.features.heading}</h2>`
  );
}

html = html.replace(
  /<p class="section-subtitle[^>]*">Turn whatever is on your screen[^<]*<\/p>/,
  `<p class="section-subtitle animate-on-scroll fade-in animate-delay-100">${config.features.subtitle}</p>`
);

// Generate features HTML
const delays = ['', 'animate-delay-100', 'animate-delay-200', 'animate-delay-300', 'animate-delay-400', 'animate-delay-500', 'animate-delay-100', 'animate-delay-200', 'animate-delay-300'];
const featuresHtml = config.features.items.map((feature, index) => {
  const delay = delays[index] || '';
  const delayClass = delay ? ` ${delay}` : '';
  return `          <div class="feature animate-on-scroll slide-in-up${delayClass}">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
          </div>`;
}).join('\n');

// Replace features grid content
html = html.replace(
  /<div class="features-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  (match) => {
    return match.replace(
      /<div class="feature[^>]*>[\s\S]*?<\/div>/g,
      featuresHtml
    );
  }
);

// Better approach: replace the entire features-grid section
const featuresSectionStart = html.indexOf('<div class="features-grid">');
const featuresSectionEnd = html.indexOf('</div>\n        </div>\n      </div>\n    </section>', featuresSectionStart);
if (featuresSectionStart !== -1 && featuresSectionEnd !== -1) {
  const beforeFeatures = html.substring(0, featuresSectionStart);
  const afterFeatures = html.substring(featuresSectionEnd);
  html = beforeFeatures + '<div class="features-grid">\n' + featuresHtml + '\n        </div>' + afterFeatures;
}

// 6. Update steps section
const stepsHtml = config.steps.map((step, index) => {
  const animations = ['slide-in-left', 'slide-in-up', 'slide-in-right', 'slide-in-up'];
  const delays = ['', 'animate-delay-200', 'animate-delay-400', 'animate-delay-600'];
  const animation = animations[index] || 'slide-in-up';
  const delay = delays[index] || '';
  const delayClass = delay ? ` ${delay}` : '';
  return `          <div class="step animate-on-scroll ${animation}${delayClass}">
            <span class="step-number">${step.number}</span>
            <h3>${step.title}</h3>
            <p>${step.description}</p>
          </div>`;
}).join('\n');

// Replace steps content
const stepsStart = html.indexOf('<div class="steps">');
const stepsEnd = html.indexOf('</div>\n        </div>\n      </div>\n    </section>', stepsStart);
if (stepsStart !== -1 && stepsEnd !== -1) {
  const beforeSteps = html.substring(0, stepsStart);
  const afterSteps = html.substring(stepsEnd);
  html = beforeSteps + '<div class="steps">\n' + stepsHtml + '\n        </div>' + afterSteps;
}

// 7. Update security section
const securityHtml = config.security.map((item, index) => {
  const delays = ['', 'animate-delay-200', 'animate-delay-400'];
  const delay = delays[index] || '';
  const delayClass = delay ? ` ${delay}` : '';
  return `          <div class="security-card animate-on-scroll blur-in${delayClass}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>`;
}).join('\n');

// Replace security grid content
const securityStart = html.indexOf('<div class="security-grid">');
const securityEnd = html.indexOf('</div>\n        </div>\n      </div>\n    </section>', securityStart);
if (securityStart !== -1 && securityEnd !== -1) {
  const beforeSecurity = html.substring(0, securityStart);
  const afterSecurity = html.substring(securityEnd);
  html = beforeSecurity + '<div class="security-grid">\n' + securityHtml + '\n        </div>' + afterSecurity;
}

// 8. Update footer
html = html.replace(
  /<span class="footer-fade">.*?<\/span>/,
  `<span class="footer-fade">${config.site.tagline}</span>`
);

// 9. Update contact email
html = html.replace(
  /href="mailto:[^"]*"/,
  `href="mailto:${config.contact.email}"`
);

// Write updated HTML
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('✅ Built index.html from configuration');
console.log(`📦 Download URL: ${downloadUrl}`);
console.log(`📧 Contact: ${config.contact.email}`);
console.log(`🏷️  Tagline: ${config.site.tagline}`);
