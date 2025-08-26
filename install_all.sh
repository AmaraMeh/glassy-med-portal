#!/bin/bash

# Install dependencies for all faculty websites
echo "Installing dependencies for all faculty websites..."

# Faculty of Technology
echo "Installing dependencies for Faculty of Technology..."
cd faculties/technologie
npm install
cd ../..

# Faculty of Letters & Languages
echo "Installing dependencies for Faculty of Letters & Languages..."
cd faculties/lettres-langues
npm install
cd ../..

# Faculty of Law & Political Sciences
echo "Installing dependencies for Faculty of Law & Political Sciences..."
cd faculties/droit-sciences-politiques
npm install
cd ../..

# Faculty of Economics & Management
echo "Installing dependencies for Faculty of Economics & Management..."
cd faculties/sciences-economiques
npm install
cd ../..

# Faculty of Humanities & Social Sciences
echo "Installing dependencies for Faculty of Humanities & Social Sciences..."
cd faculties/sciences-humaines
npm install
cd ../..

# Faculty of Exact Sciences
echo "Installing dependencies for Faculty of Exact Sciences..."
cd faculties/sciences-exactes
npm install
cd ../..

# Faculty of Natural & Life Sciences
echo "Installing dependencies for Faculty of Natural & Life Sciences..."
cd faculties/sciences-nature-vie
npm install
cd ../..

echo ""
echo "✅ All dependencies installed successfully!"
echo ""
echo "You can now start all faculty websites with:"
echo "  ./start_all.sh"
echo ""
echo "Or start individual faculties with:"
echo "  cd faculties/[faculty-name] && npm run dev"