const fs = require('fs');
const path = require('path');

function replaceRouterImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Replace react-router-dom imports
  const routerReplacements = [
    // Import replacements
    { from: /import { Link } from ['"]react-router-dom['"];?/g, to: "import Link from 'next/link';" },
    { from: /import { useNavigate } from ['"]react-router-dom['"];?/g, to: "import { useRouter } from 'next/navigation';" },
    { from: /import { useParams } from ['"]react-router-dom['"];?/g, to: "import { useParams } from 'next/navigation';" },
    { from: /import { useLocation } from ['"]react-router-dom['"];?/g, to: "import { usePathname } from 'next/navigation';" },
    { from: /import { Link, useLocation } from ['"]react-router-dom['"];?/g, to: "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';" },
    { from: /import { Link, useNavigate } from ['"]react-router-dom['"];?/g, to: "import Link from 'next/link';\nimport { useRouter } from 'next/navigation';" },
    { from: /import { useParams, useNavigate } from ['"]react-router-dom['"];?/g, to: "import { useParams } from 'next/navigation';\nimport { useRouter } from 'next/navigation';" },
    
    // Variable replacements
    { from: /const navigate = useNavigate\(\);?/g, to: "const router = useRouter();" },
    { from: /const location = useLocation\(\);?/g, to: "const pathname = usePathname();" },
    
    // Usage replacements
    { from: /navigate\(/g, to: "router.push(" },
    { from: /location\.pathname/g, to: "pathname" },
  ];
  
  for (const replacement of routerReplacements) {
    if (replacement.from.test(content)) {
      content = content.replace(replacement.from, replacement.to);
      modified = true;
    }
  }
  
  if (modified) {
    console.log(`Updated router imports in: ${filePath}`);
    fs.writeFileSync(filePath, content);
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      replaceRouterImports(fullPath);
    }
  }
}

// Process components directory
if (fs.existsSync('components')) {
  console.log('Processing components directory...');
  processDirectory('components');
}

console.log('Done replacing router imports!');