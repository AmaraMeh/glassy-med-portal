#!/bin/bash

# Start all faculty websites on different ports
echo "Starting all faculty websites..."

# Faculty of Technology - Port 3001
echo "Starting Faculty of Technology on port 3001..."
cd faculties/technologie
PORT=3001 npm run dev &
cd ../..

# Faculty of Letters & Languages - Port 3002
echo "Starting Faculty of Letters & Languages on port 3002..."
cd faculties/lettres-langues
PORT=3002 npm run dev &
cd ../..

# Faculty of Law & Political Sciences - Port 3003
echo "Starting Faculty of Law & Political Sciences on port 3003..."
cd faculties/droit-sciences-politiques
PORT=3003 npm run dev &
cd ../..

# Faculty of Economics & Management - Port 3004
echo "Starting Faculty of Economics & Management on port 3004..."
cd faculties/sciences-economiques
PORT=3004 npm run dev &
cd ../..

# Faculty of Humanities & Social Sciences - Port 3005
echo "Starting Faculty of Humanities & Social Sciences on port 3005..."
cd faculties/sciences-humaines
PORT=3005 npm run dev &
cd ../..

# Faculty of Exact Sciences - Port 3006
echo "Starting Faculty of Exact Sciences on port 3006..."
cd faculties/sciences-exactes
PORT=3006 npm run dev &
cd ../..

# Faculty of Natural & Life Sciences - Port 3007
echo "Starting Faculty of Natural & Life Sciences on port 3007..."
cd faculties/sciences-nature-vie
PORT=3007 npm run dev &
cd ../..

echo ""
echo "🎉 All faculty websites are starting up!"
echo ""
echo "📚 Faculty Websites:"
echo "  • Faculty of Technology: http://localhost:3001"
echo "  • Faculty of Letters & Languages: http://localhost:3002"
echo "  • Faculty of Law & Political Sciences: http://localhost:3003"
echo "  • Faculty of Economics & Management: http://localhost:3004"
echo "  • Faculty of Humanities & Social Sciences: http://localhost:3005"
echo "  • Faculty of Exact Sciences: http://localhost:3006"
echo "  • Faculty of Natural & Life Sciences: http://localhost:3007"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for all background processes
wait