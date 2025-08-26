#!/bin/bash

# Faculty configuration
declare -A faculties=(
    ["droit-sciences-politiques"]="Faculty of Law & Political Sciences|Droit|Law Studies|Legal Principles|Constitutional Law|Civil Law|Criminal Law|International Law"
    ["sciences-economiques"]="Faculty of Economics & Management|SEGC|Economic Sciences|Business Management|Accounting|Finance|Marketing|Economics"
    ["sciences-humaines"]="Faculty of Humanities & Social Sciences|STAPS / Sciences Humaines / Sciences Sociales|Human Sciences|Social Sciences|Psychology|Sociology|Anthropology|Education"
    ["sciences-exactes"]="Faculty of Exact Sciences|Informatique LMD / Informatique ING / Sciences de la Matière / Mathématiques|Computer Science|Mathematics|Physics|Chemistry|Statistics|Applied Sciences"
    ["sciences-nature-vie"]="Faculty of Natural & Life Sciences|Biologie 1er année / Sciences de la Matière 1er année|Biology|Life Sciences|Ecology|Genetics|Microbiology|Environmental Science"
)

# Create each faculty
for faculty_dir in "${!faculties[@]}"; do
    echo "Creating faculty: $faculty_dir"
    
    # Create directory and initialize project
    cd "faculties/$faculty_dir"
    npm create vite@latest . -- --template react-ts --yes
    
    # Copy files from technology faculty
    cp -r ../technologie/* .
    
    # Install dependencies
    npm install
    
    # Extract faculty info
    IFS='|' read -ra FACULTY_INFO <<< "${faculties[$faculty_dir]}"
    FACULTY_NAME="${FACULTY_INFO[0]}"
    FIRST_YEAR_SPECIALTIES="${FACULTY_INFO[1]}"
    YEAR_2_SUBJECTS="${FACULTY_INFO[2]}"
    YEAR_3_SUBJECTS="${FACULTY_INFO[3]}"
    SUBJECT1="${FACULTY_INFO[4]}"
    SUBJECT2="${FACULTY_INFO[5]}"
    SUBJECT3="${FACULTY_INFO[6]}"
    SUBJECT4="${FACULTY_INFO[7]}"
    
    # Update package.json
    sed -i "s/faculty-technologie/faculty-${faculty_dir//-/_}/g" package.json
    
    # Update HeroSection
    sed -i "s/Faculty of Technology/$FACULTY_NAME/g" src/components/sections/HeroSection.tsx
    sed -i "s/technology education/${FACULTY_INFO[2],,} education/g" src/components/sections/HeroSection.tsx
    
    # Update Navigation
    sed -i "s/Faculty of Technology/$FACULTY_NAME/g" src/components/layout/Navigation.tsx
    
    # Update YearSelector
    sed -i "s/Technology Year/${FACULTY_INFO[2]} Year/g" src/components/sections/YearSelector.tsx
    
    echo "Completed: $faculty_dir"
    cd ../..
done

echo "All faculties created successfully!"