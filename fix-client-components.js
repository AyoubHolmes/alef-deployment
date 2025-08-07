const fs = require('fs');
const path = require('path');

const directories = ['components', 'app'];

function addUseClientToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if file already has 'use client' or uses hooks
  if (content.includes("'use client'") || content.includes('"use client"')) {
    return; // Already has use client
  }
  
  // Check if file uses hooks or browser APIs
  const needsUseClient = /\b(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|useLayoutEffect|useImperativeHandle|useDebugValue|useLocation|useNavigate|useParams|window\.|document\.|localStorage|sessionStorage)\b/.test(content);
  
  if (needsUseClient) {
    console.log(`Adding 'use client' to: ${filePath}`);
    
    // Find the first import or the beginning of the file
    const lines = content.split('\n');
    let insertIndex = 0;
    
    // Skip empty lines and comments at the beginning
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '' || line.startsWith('//') || line.startsWith('/*')) {
        insertIndex = i + 1;
        continue;
      }
      break;
    }
    
    // Insert 'use client' at the appropriate position
    lines.splice(insertIndex, 0, "'use client'", '');
    
    const newContent = lines.join('\n');
    fs.writeFileSync(filePath, newContent);
  }
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
      addUseClientToFile(fullPath);
    }
  }
}

// Process all directories
for (const dir of directories) {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    processDirectory(dir);
  }
}

console.log('Done adding use client directives!');