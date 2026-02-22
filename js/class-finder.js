/* =========================================
   Class Finder Wizard JavaScript
   ========================================= */

// Program data with iClassPro program IDs
const programs = {
    'kinder-gym': {
        name: 'Kinder Gym',
        icon: '🌟',
        ageRange: '2.5-5.5 years',
        description: 'Building foundations through play with motor skill development, coordination, and confidence.',
        url: 'pages/kinder-gym.html',
        programId: 17,
        minAge: 2.5,
        maxAge: 5.5,
        gender: 'both'
    },
    'boys-rec': {
        name: 'Boys Recreational',
        icon: '🤸',
        ageRange: '5.5-14 years',
        description: 'Progressive skill development on all six men\'s Olympic apparatus. Building strength, confidence, and athletic excellence.',
        url: 'pages/boys-rec.html',
        programId: 63,
        minAge: 5.5,
        maxAge: 14,
        gender: 'boy'
    },
    'girls-rec': {
        name: 'Girls Recreational',
        icon: '✨',
        ageRange: '5.5-14 years',
        description: 'Progressive skill development on all four women\'s Olympic apparatus. Building strength, grace, and confidence.',
        url: 'pages/girls-rec.html',
        programId: 62,
        minAge: 5.5,
        maxAge: 14,
        gender: 'girl'
    },
    'tumbling': {
        name: 'Tumbling',
        icon: '🌪️',
        ageRange: '5.5-14 years',
        description: 'Floor skills focus perfect for cheerleaders, dancers, and martial artists. Learn flips, tricks, and acrobatic skills.',
        url: 'pages/tumbling.html',
        programId: 60,
        minAge: 5.5,
        maxAge: 14,
        gender: 'both'
    }
};

// Initialize the class finder
function initClassFinder() {
    const form = document.getElementById('classFinderForm');
    if (!form) return;
    
    form.addEventListener('submit', handleFormSubmit);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const ageValue = document.getElementById('ageSelector').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    
    // Validate inputs
    if (!ageValue || !gender) {
        alert('Please select both age and gender to find the right class.');
        return;
    }
    
    // Parse age range (e.g., "2-3" -> 2.5)
    const age = parseAgeValue(ageValue);
    
    // Find matching programs
    const matches = findMatchingPrograms(age, gender);
    
    // Display results
    displayResults(matches, age, gender);
    
    // Smooth scroll to results
    setTimeout(() => {
        const resultsSection = document.getElementById('finderResults');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Parse age value to numeric
function parseAgeValue(ageValue) {
    const [min, max] = ageValue.split('-').map(Number);
    return (min + max) / 2; // Use midpoint of age range
}

// Find matching programs based on age and gender
function findMatchingPrograms(age, gender) {
    const matches = [];
    
    console.log('Finding matches for age:', age, 'gender:', gender);
    
    for (const [key, program] of Object.entries(programs)) {
        // Check age range
        if (age >= program.minAge && age <= program.maxAge) {
            // Check gender compatibility
            // For 'either' gender, match all age-appropriate programs
            // For specific gender, match that gender OR 'both' programs
            const genderMatches = (gender === 'either') || 
                                  (program.gender === 'both') || 
                                  (program.gender === gender);
            
            if (genderMatches) {
                console.log('Matched program:', program.name, 'programId:', program.programId);
                matches.push({ key, ...program });
            } else {
                console.log('Skipped program:', program.name, '(gender mismatch)');
            }
        } else {
            console.log('Skipped program:', program.name, '(age out of range)');
        }
    }
    
    console.log('Total matches:', matches.length);
    return matches;
}

// Display results
function displayResults(matches, age, gender) {
    const resultsContainer = document.getElementById('finderResults');
    const resultsGrid = document.getElementById('resultsGrid');
    
    if (!resultsContainer || !resultsGrid) return;
    
    // Clear previous results
    resultsGrid.innerHTML = '';
    
    if (matches.length === 0) {
        // No matches found
        resultsGrid.innerHTML = `
            <div style="text-align:center; padding: 40px;">
                <div style="font-size: 3rem; margin-bottom: 16px;">🤔</div>
                <h4 style="font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 2px; margin-bottom: 12px;">No exact matches found</h4>
                <p style="color: var(--gray); margin-bottom: 24px;">That's unusual! Let's find the perfect class for you.</p>
                <a href="pages/contact.html" class="btn btn-primary">Contact Us for Guidance</a>
            </div>
        `;
    } else {
        // Build program IDs string (comma-separated)
        const programIds = matches.map(p => p.programId).join(',');
        
        console.log('Displaying results with programIds:', programIds);
        console.log('Matched programs:', matches.map(p => p.name));
        
        // Create header with matched programs
        const programNames = matches.map(p => p.name).join(' & ');
        
        resultsGrid.innerHTML = `
            <div style="margin-bottom: 30px; text-align: center;">
                <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 2rem; letter-spacing: 2px; color: var(--green-bright); margin-bottom: 12px;">
                    Perfect! Here are available ${programNames} classes:
                </h3>
                <p style="color: var(--gray); font-size: 0.95rem;">
                    Select a class below to enroll. All classes shown are ${matches[0].ageRange} with USAG-certified coaches.
                </p>
            </div>
            <div style="background: var(--dark); border-radius: 16px; overflow: hidden; border: 1px solid rgba(45,140,60,.15);">
                <iframe 
                    src="https://portal.iclasspro.com/csagymnastics/classes?programs=${programIds}" 
                    width="100%" 
                    height="700" 
                    frameborder="0" 
                    style="border: none; display: block;">
                </iframe>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <p style="color: var(--gray); font-size: 0.9rem; margin-bottom: 16px;">
                    Need help choosing? We're here to guide you!
                </p>
                <a href="pages/contact.html" class="btn btn-outline" style="background: transparent; border: 2px solid rgba(255,255,255,.15); color: var(--white); padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1.5px; display: inline-block; transition: all 0.3s;">
                    Contact Us for Help
                </a>
            </div>
        `;
    }
    
    // Show results section with animation
    resultsContainer.classList.add('show');
}

// Create a result card element
function createResultCard(program, index) {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // Determine correct URL based on current page location
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const programUrl = isInPagesFolder ? program.url.replace('pages/', '') : program.url;
    
    card.innerHTML = `
        <div class="result-icon">${program.icon}</div>
        <h4>${program.name}</h4>
        <span class="result-age">${program.ageRange}</span>
        <p class="result-description">${program.description}</p>
        <a href="${programUrl}" class="result-link">Learn More & Enroll</a>
    `;
    
    return card;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClassFinder);
} else {
    initClassFinder();
}
