#!/usr/bin/env python3
import os
import subprocess
import shutil
import re

# Faculty configurations
faculties = {
    "sciences-economiques": {
        "name": "Faculty of Economics & Management",
        "first_year": "SEGC",
        "subjects": ["Accounting", "Finance", "Marketing", "Economics"],
        "description": "economic and business management education"
    },
    "sciences-humaines": {
        "name": "Faculty of Humanities & Social Sciences", 
        "first_year": "STAPS / Sciences Humaines / Sciences Sociales",
        "subjects": ["Psychology", "Sociology", "Anthropology", "Education"],
        "description": "humanities and social sciences education"
    },
    "sciences-exactes": {
        "name": "Faculty of Exact Sciences",
        "first_year": "Informatique LMD / Informatique ING / Sciences de la Matière / Mathématiques",
        "subjects": ["Computer Science", "Mathematics", "Physics", "Chemistry"],
        "description": "exact sciences education"
    },
    "sciences-nature-vie": {
        "name": "Faculty of Natural & Life Sciences",
        "first_year": "Biologie 1er année / Sciences de la Matière 1er année", 
        "subjects": ["Biology", "Ecology", "Genetics", "Microbiology"],
        "description": "natural and life sciences education"
    }
}

def run_command(cmd, cwd=None):
    """Run a shell command"""
    try:
        result = subprocess.run(cmd, shell=True, cwd=cwd, check=True, capture_output=True, text=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {cmd}")
        print(f"Error: {e.stderr}")
        return None

def replace_in_file(filepath, old_text, new_text):
    """Replace text in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace(old_text, new_text)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error updating {filepath}: {e}")

def create_faculty(faculty_dir, config):
    """Create a faculty website"""
    print(f"\nCreating faculty: {faculty_dir}")
    
    # Create directory if it doesn't exist
    os.makedirs(f"faculties/{faculty_dir}", exist_ok=True)
    
    # Initialize Vite project
    print("Initializing Vite project...")
    run_command("npm create vite@latest . -- --template react-ts --yes", f"faculties/{faculty_dir}")
    
    # Copy files from technology faculty
    print("Copying files...")
    run_command("cp -r ../technologie/* .", f"faculties/{faculty_dir}")
    
    # Install dependencies
    print("Installing dependencies...")
    run_command("npm install", f"faculties/{faculty_dir}")
    
    # Update package.json
    package_name = f"faculty-{faculty_dir.replace('-', '_')}"
    replace_in_file(f"faculties/{faculty_dir}/package.json", 
                   '"name": "faculty-lettres-langues"', 
                   f'"name": "{package_name}"')
    
    # Update HeroSection
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/HeroSection.tsx",
                   "Faculty of Letters & Languages",
                   config["name"])
    
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/HeroSection.tsx",
                   "language and literature education",
                   config["description"])
    
    # Update Navigation
    replace_in_file(f"faculties/{faculty_dir}/src/components/layout/Navigation.tsx",
                   "Faculty of Letters & Languages", 
                   config["name"])
    
    # Update YearSelector
    year_type = config["name"].split()[-1].lower()
    if "sciences" in year_type:
        year_type = "sciences"
    elif "management" in year_type:
        year_type = "business"
    
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/YearSelector.tsx",
                   "Language Year",
                   f"{year_type.title()} Year")
    
    # Update first year subjects
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/YearSelector.tsx",
                   "Foundation Languages",
                   f"Foundation {year_type.title()}")
    
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/YearSelector.tsx",
                   "Anglais / Français / Arabe / Tamazight / Traduction",
                   config["first_year"])
    
    # Update subjects
    subjects_str = '", "'.join(config["subjects"])
    replace_in_file(f"faculties/{faculty_dir}/src/components/sections/YearSelector.tsx",
                   '["English", "French", "Arabic", "Tamazight", "Translation"]',
                   f'["{subjects_str}"]')
    
    print(f"Completed: {faculty_dir}")

def main():
    """Main function"""
    print("Creating all faculty websites...")
    
    # Change to workspace directory
    os.chdir("/workspace")
    
    # Create each faculty
    for faculty_dir, config in faculties.items():
        create_faculty(faculty_dir, config)
    
    print("\nAll faculties created successfully!")

if __name__ == "__main__":
    main()