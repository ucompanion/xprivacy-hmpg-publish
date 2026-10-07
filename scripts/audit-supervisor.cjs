/**
 * xPrivacy Design System & Publishing Supervisor Automated Auditor
 * 
 * Runs comprehensive architectural & stylistic checks:
 * 1. Routing & Directory Isolation Check
 * 2. GNB Landing & LNB 3-tier Hierarchy Check
 * 3. Open-Rendering & Preview Container Check (No cards inside .preview)
 * 4. Tab Labels Cleanliness Check (No parentheses in Core/Domain tabs)
 * 5. Design Tokens & Font Architecture Check
 * 6. Documentation Synchronization Check
 * 7. TypeScript Compilation Check
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
let passCount = 0;
let failCount = 0;

function report(category, title, passed, details = '') {
  const icon = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon} [${category}] ${title}`);
  if (!passed) {
    failCount++;
    if (details) {
      console.log(`   👉 ${details}`);
    }
  } else {
    passCount++;
  }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

console.log('\n======================================================');
console.log('🛡️  xPrivacy Design System Supervisor Audit Starting');
console.log('======================================================\n');

// 1. Routing & Directory Isolation Check
try {
  const pubDir = path.join(ROOT_DIR, 'src/pages/pub');
  const pubExists = fs.existsSync(pubDir);
  report('Isolation', 'Publishing directory (src/pages/pub) exists', pubExists);

  const frontIndex = path.join(ROOT_DIR, 'src/pages/index.tsx');
  let frontClean = true;
  if (fs.existsSync(frontIndex)) {
    const frontContent = fs.readFileSync(frontIndex, 'utf-8');
    if (frontContent.includes('GuideLayout')) {
      frontClean = false;
    }
  }
  report('Isolation', 'Front service page (src/pages/index.tsx) is free from GuideLayout leakage', frontClean);
} catch (e) {
  report('Isolation', 'Directory structure inspection', false, e.message);
}

// 2. GNB Landing & LNB 3-Tier Hierarchy Check
try {
  const guideLayoutPath = path.join(ROOT_DIR, 'src/pages/guide/layouts/DesignSystemLayout.tsx');
  if (fs.existsSync(guideLayoutPath)) {
    const content = fs.readFileSync(guideLayoutPath, 'utf-8');
    const hasLandingRedirect = content.includes('/guide/design-system/overview');
    report('Navigation', 'GNB official landing path points to /guide/design-system/overview', hasLandingRedirect);

    const hasOverview = /category:\s*['"]Overview['"]/i.test(content);
    const hasFoundation = /category:\s*['"]Foundation['"]/i.test(content);
    const hasComponents = /category:\s*['"]Components['"]/i.test(content);
    const has3TierLnb = hasOverview && hasFoundation && hasComponents;
    report('Navigation', 'LNB contains strict 3-tier hierarchy (Overview, Foundation, Components)', has3TierLnb);
  } else {
    report('Navigation', 'DesignSystemLayout.tsx exists', false, 'File not found');
  }
} catch (e) {
  report('Navigation', 'GNB/LNB inspection', false, e.message);
}

// 3. Open-Rendering & Clean Tabs in Guide Pages
try {
  const guidePagesDir = path.join(ROOT_DIR, 'src/pages/guide/design-system');
  if (fs.existsSync(guidePagesDir)) {
    const allGuideFiles = getAllFiles(guidePagesDir).filter(f => f.endsWith('.tsx') && !f.includes('/components/'));
    let allTabsClean = true;
    let tabViolations = [];
    let codeBlockUsed = true;
    let codeBlockMissing = [];
    let openRenderingValid = true;
    let openRenderingViolations = [];

    allGuideFiles.forEach(filePath => {
      const relPath = path.relative(guidePagesDir, filePath);
      const content = fs.readFileSync(filePath, 'utf-8');

      // Check tab labels for parentheses like 'Core (기본)'
      const tabooMatches = content.match(/label:\s*['"][^'"]*\([^'"]*\)[^'"]*['"]/g);
      if (tabooMatches) {
        allTabsClean = false;
        tabViolations.push(`${relPath}: ${tabooMatches.join(', ')}`);
      }

      // Check CodeBlock usage if preview is present
      if (content.includes('className={styles.preview}') && !content.includes('CodeBlock')) {
        codeBlockUsed = false;
        codeBlockMissing.push(relPath);
      }

      // Check for artificial card wrapping inside .preview
      if (content.includes('className={styles.preview}')) {
        if (content.includes('className={styles.preview_card}') || content.includes('<Card>')) {
          // Card guide itself is exempt
          if (!relPath.includes('card')) {
            openRenderingValid = false;
            openRenderingViolations.push(relPath);
          }
        }
      }
    });

    report('Template', 'Component guide tabs have clean labels without parentheses (Core, Domain)', allTabsClean, tabViolations.join('; '));
    report('Template', 'Guide pages with preview utilize 1:1 matching <CodeBlock>', codeBlockUsed, codeBlockMissing.join('; '));
    report('Template', 'Open-rendering enforced: Previews are free from artificial card wrappers', openRenderingValid, openRenderingViolations.join('; '));
  }
} catch (e) {
  report('Template', 'Guide pages template inspection', false, e.message);
}

// 4. Design Tokens & Font Architecture Check
try {
  const cssPath = path.join(ROOT_DIR, 'src/assets/scss/_variables.scss');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    const hasBaseFont = cssContent.includes('--font-family-base');
    const hasMonoFont = cssContent.includes('--font-family-mono');
    const hasPrimaryColor = cssContent.includes('--color-primary');
    const hasSecondaryColor = cssContent.includes('--color-secondary');
    const hasSuccessColor = cssContent.includes('--color-success');
    const hasDangerColor = cssContent.includes('--color-danger');
    const hasWarningColor = cssContent.includes('--color-warning');
    const hasTokens = hasBaseFont && hasMonoFont && hasPrimaryColor && hasSecondaryColor && hasSuccessColor && hasDangerColor && hasWarningColor;
    
    report('Tokens', 'src/assets/scss/_variables.scss defines --font-family-base and --font-family-mono', hasBaseFont && hasMonoFont);
    report('Tokens', 'src/assets/scss/_variables.scss defines full semantic color system (primary, secondary, success, danger, warning)', hasTokens);
  } else {
    report('Tokens', 'src/assets/scss/_variables.scss exists', false, 'File not found');
  }
} catch (e) {
  report('Tokens', 'Design tokens inspection', false, e.message);
}

// 5. Documentation Synchronization Check
try {
  const promptSystem = path.join(ROOT_DIR, 'doc/guide/PROMPT_BASE_SYSTEM.md');
  const promptTemplate = path.join(ROOT_DIR, 'doc/guide/PROMPT_BASE_TEMPLATE.md');
  const promptTypo = path.join(ROOT_DIR, 'doc/guide/PROMPT_GUIDE_FA_TYPOGRAPHY.md');
  const docsExist = fs.existsSync(promptSystem) && fs.existsSync(promptTemplate) && fs.existsSync(promptTypo);
  report('Docs', 'Core guide prompt documentation exists in doc/guide/', docsExist);

  let systemDocUpdated = false;
  if (fs.existsSync(promptSystem)) {
    const sysContent = fs.readFileSync(promptSystem, 'utf-8');
    if (sysContent.includes('도메인 컴포넌트를 불필요하게 생성하지 않을 경우 코어 컴포넌트를 사용합니다')) {
      systemDocUpdated = true;
    }
  }
  report('Docs', 'PROMPT_BASE_SYSTEM.md reflects Core vs Domain decision tree principle', systemDocUpdated);
} catch (e) {
  report('Docs', 'Documentation sync inspection', false, e.message);
}

// 6. TypeScript Compilation Check
try {
  console.log('\n⏳ Running TypeScript compilation check (tsc --noEmit)...');
  execSync('npx tsc --noEmit', { cwd: ROOT_DIR, stdio: 'pipe' });
  report('Build', 'TypeScript type-check passes with 0 errors', true);
} catch (e) {
  report('Build', 'TypeScript type-check passes with 0 errors', false, e.stdout ? e.stdout.toString() : e.message);
}

// Summary
console.log('\n------------------------------------------------------');
console.log(`Audit Completed: ${passCount} Passed, ${failCount} Failed.`);
console.log('------------------------------------------------------\n');

if (failCount > 0) {
  console.error('🚨 SUPERVISOR ALERT: Architectural or stylistic violations detected! Fix them before proceeding.\n');
  process.exit(1);
} else {
  console.log('✨ ALL AUDIT CHECKS PASSED: Project architecture is in pristine condition.\n');
  process.exit(0);
}
