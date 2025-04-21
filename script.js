// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.querySelectorAll('.close');
const showSignupLink = document.getElementById('showSignup');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const userTypeSelect = document.getElementById('userTypeSelect');
const mentorFields = document.getElementById('mentorFields');
const aspirantFields = document.getElementById('aspirantFields');
const examCategory = document.getElementById('examCategory');
const specificExam = document.getElementById('specificExam');
const examDetails = document.getElementById('examDetails');
const examInfo = document.getElementById('examInfo');
const progressSteps = document.querySelectorAll('.step');

// Form state
let currentStep = 1;
const formData = {
    userType: '',
    basicInfo: {},
    roleDetails: {}
};

// Exam information data
const examData = {
    'jee-main': {
        name: 'JEE Main',
        description: 'Joint Entrance Examination (Main) is the first stage of the two-tier JEE examination for admission to undergraduate engineering programs.',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        duration: '3 hours',
        totalMarks: '300',
        officialWebsite: 'https://jeemain.nta.nic.in/'
    },
    'jee-advanced': {
        name: 'JEE Advanced',
        description: 'Joint Entrance Examination (Advanced) is the second stage of the JEE examination for admission to IITs and other premier engineering institutes.',
        subjects: ['Physics', 'Chemistry', 'Mathematics'],
        duration: '3 hours per paper (2 papers)',
        totalMarks: '360',
        officialWebsite: 'https://jeeadv.ac.in/'
    },
    'neet': {
        name: 'NEET',
        description: 'National Eligibility cum Entrance Test is the entrance examination for admission to medical courses in India.',
        subjects: ['Physics', 'Chemistry', 'Biology'],
        duration: '3 hours 20 minutes',
        totalMarks: '720',
        officialWebsite: 'https://neet.nta.nic.in/'
    },
    'upsc': {
        name: 'UPSC Civil Services',
        description: 'Union Public Service Commission Civil Services Examination is conducted for recruitment to various civil services of the Government of India.',
        subjects: ['General Studies', 'Optional Subject', 'Essay'],
        duration: 'Multiple stages',
        totalMarks: 'Varies by stage',
        officialWebsite: 'https://upsc.gov.in/'
    }
};

// Modal Functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    resetForm();
}

function resetForm() {
    currentStep = 1;
    formData.userType = '';
    formData.basicInfo = {};
    formData.roleDetails = {};
    updateProgressSteps();
    resetFormFields();
}

function resetFormFields() {
    document.getElementById('signupForm').reset();
    mentorFields.style.display = 'none';
    aspirantFields.style.display = 'none';
    examDetails.style.display = 'none';
}

// Progress Steps
function updateProgressSteps() {
    progressSteps.forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Form Validation
function validateStep(step) {
    const form = document.getElementById('signupForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.required && !input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (step === 1) {
        if (!userTypeSelect.value) {
            isValid = false;
            userTypeSelect.classList.add('error');
        }
    }

    if (step === 2) {
        if (formData.userType === 'aspirant') {
            if (!examCategory.value || !specificExam.value) {
                isValid = false;
                examCategory.classList.add('error');
                specificExam.classList.add('error');
            }
        }
    }

    return isValid;
}

// Form Navigation
function nextStep() {
    if (validateStep(currentStep)) {
        if (currentStep < 3) {
            currentStep++;
            updateProgressSteps();
            updateFormVisibility();
        } else {
            submitForm();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateProgressSteps();
        updateFormVisibility();
    }
}

function updateFormVisibility() {
    const basicInfoFields = document.querySelectorAll('.form-group:not(#mentorFields):not(#aspirantFields)');
    const roleFields = document.querySelectorAll('#mentorFields, #aspirantFields');

    if (currentStep === 1) {
        basicInfoFields.forEach(field => field.style.display = 'block');
        roleFields.forEach(field => field.style.display = 'none');
    } else if (currentStep === 2) {
        basicInfoFields.forEach(field => field.style.display = 'none');
        roleFields.forEach(field => field.style.display = 'block');
    }
}

// Role-specific Fields
function toggleRoleFields() {
    const selectedRole = userTypeSelect.value;
    formData.userType = selectedRole;

    if (selectedRole === 'mentor') {
        mentorFields.style.display = 'block';
        aspirantFields.style.display = 'none';
    } else if (selectedRole === 'aspirant') {
        mentorFields.style.display = 'none';
        aspirantFields.style.display = 'block';
    } else {
        mentorFields.style.display = 'none';
        aspirantFields.style.display = 'none';
    }
}

// Exam Selection
function updateExamOptions() {
    const selectedCategory = examCategory.value;
    const options = specificExam.querySelectorAll('option');
    
    options.forEach(option => {
        if (option.parentElement.dataset.category === selectedCategory) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });

    specificExam.value = '';
    examDetails.style.display = 'none';
}

function showExamDetails() {
    const selectedExam = specificExam.value;
    if (selectedExam && examData[selectedExam]) {
        const exam = examData[selectedExam];
        examInfo.innerHTML = `
            <h4>${exam.name}</h4>
            <p>${exam.description}</p>
            <div class="exam-details">
                <p><strong>Subjects:</strong> ${exam.subjects.join(', ')}</p>
                <p><strong>Duration:</strong> ${exam.duration}</p>
                <p><strong>Total Marks:</strong> ${exam.totalMarks}</p>
                <a href="${exam.officialWebsite}" target="_blank" class="official-link">Visit Official Website</a>
            </div>
        `;
        examDetails.style.display = 'block';
    } else {
        examDetails.style.display = 'none';
    }
}

// Form Submission
function submitForm() {
    if (validateStep(currentStep)) {
        // Collect all form data
        const form = document.getElementById('signupForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to your backend
        console.log('Form submitted:', data);

        // Show success message
        alert('Account created successfully! Redirecting to dashboard...');
        closeModal(signupModal);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

// Event Listeners
userTypeSelect.addEventListener('change', toggleRoleFields);
examCategory.addEventListener('change', updateExamOptions);
specificExam.addEventListener('change', showExamDetails);

loginBtn.addEventListener('click', () => openModal(loginModal));
signupBtn.addEventListener('click', () => openModal(signupModal));

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(loginModal);
        closeModal(signupModal);
    });
});

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(signupModal);
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(signupModal);
    openModal(loginModal);
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === signupModal) closeModal(signupModal);
});

// User Data Storage
let userData = {
    aspirants: [],
    mentors: []
};

// Form Validation Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('aspireMentorHubData', JSON.stringify(userData));
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('aspireMentorHubData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// Login handler with validation
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    if (!validateEmail(data.email)) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        // Check both aspirants and mentors arrays
        const user = [...userData.aspirants, ...userData.mentors].find(
            u => u.email === data.email && u.password === data.password
        );

        if (user) {
            // Store current user in session
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            alert('Login successful!');
            closeModal(loginModal);
            updateAuthUI(true);
            
            // Redirect based on role
            if (user.role === 'aspirant') {
                window.location.href = '/aspirant-dashboard.html';
            } else {
                window.location.href = '/mentor-dashboard.html';
            }
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

// Load saved data when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    
    // Check if user is already logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        updateAuthUI(true);
    }
});

// Update UI based on authentication state
function updateAuthUI(isLoggedIn) {
    const authButtons = document.querySelector('.auth-buttons');
    if (isLoggedIn) {
        authButtons.innerHTML = `
            <button class="btn-primary" id="dashboardBtn">Dashboard</button>
            <button class="btn-secondary" id="logoutBtn">Logout</button>
        `;
        // Add event listeners for new buttons
        document.getElementById('dashboardBtn').addEventListener('click', () => {
            window.location.href = '/dashboard.html';
        });
        document.getElementById('logoutBtn').addEventListener('click', () => {
            // Handle logout
            updateAuthUI(false);
        });
    } else {
        authButtons.innerHTML = `
            <button id="loginBtn" class="btn-primary">Login</button>
            <button id="signupBtn" class="btn-secondary">Sign Up</button>
        `;
        // Re-add event listeners for login/signup buttons
        document.getElementById('loginBtn').addEventListener('click', () => openModal(loginModal));
        document.getElementById('signupBtn').addEventListener('click', () => openModal(signupModal));
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.role-card, .process-card, .story-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Exam details data
const examDetailsData = {
    'jee-main': {
        name: 'JEE Main',
        conductingBody: 'National Testing Agency (NTA)',
        frequency: 'Twice a year (January and April)',
        eligibility: '12th pass with Physics, Chemistry, and Mathematics',
        subjects: 'Physics, Chemistry, Mathematics',
        duration: '3 hours',
        totalMarks: '300',
        website: 'https://jeemain.nta.nic.in'
    },
    'jee-advanced': {
        name: 'JEE Advanced',
        conductingBody: 'IITs',
        frequency: 'Once a year (after JEE Main)',
        eligibility: 'Top 2.5 lakh JEE Main qualifiers',
        subjects: 'Physics, Chemistry, Mathematics',
        duration: '6 hours (2 papers)',
        totalMarks: '360',
        website: 'https://jeeadv.ac.in'
    },
    'neet': {
        name: 'NEET',
        conductingBody: 'National Testing Agency (NTA)',
        frequency: 'Once a year',
        eligibility: '12th pass with Physics, Chemistry, Biology',
        subjects: 'Physics, Chemistry, Biology',
        duration: '3 hours',
        totalMarks: '720',
        website: 'https://neet.nta.nic.in'
    },
    'upsc': {
        name: 'UPSC Civil Services',
        conductingBody: 'Union Public Service Commission',
        frequency: 'Once a year',
        eligibility: 'Bachelor\'s degree from recognized university',
        subjects: 'General Studies, CSAT, Optional Subject',
        duration: 'Multiple stages over several months',
        totalMarks: '1750 (Final)',
        website: 'https://upsc.gov.in'
    },
    'ibps': {
        name: 'IBPS PO/Clerk',
        conductingBody: 'Institute of Banking Personnel Selection',
        frequency: 'Once a year',
        eligibility: 'Bachelor\'s degree',
        subjects: 'Reasoning, English, Quantitative Aptitude, General Awareness',
        duration: '2-3 hours',
        totalMarks: '200',
        website: 'https://ibps.in'
    },
    'nda': {
        name: 'NDA',
        conductingBody: 'Union Public Service Commission',
        frequency: 'Twice a year',
        eligibility: '12th pass (for Army) / 12th with Physics & Maths (for Air Force/Navy)',
        subjects: 'Mathematics, General Ability Test',
        duration: '2.5 hours each paper',
        totalMarks: '900',
        website: 'https://upsc.gov.in'
    }
};

// Function to update specific exam options based on category
function updateSpecificExamOptions() {
    const category = document.getElementById('examCategory').value;
    const specificExam = document.getElementById('specificExam');
    const options = specificExam.getElementsByTagName('optgroup');
    
    // Hide all optgroups
    Array.from(options).forEach(optgroup => {
        optgroup.style.display = 'none';
    });
    
    // Show only the selected category's optgroup
    if (category) {
        const selectedOptgroup = specificExam.querySelector(`optgroup[data-category="${category}"]`);
        if (selectedOptgroup) {
            selectedOptgroup.style.display = 'block';
        }
    }
}

// Function to display exam details
function displayExamDetails(examValue) {
    const examDetailsDiv = document.getElementById('examDetails');
    const examInfoDiv = document.getElementById('examInfo');
    
    if (examDetailsData[examValue]) {
        const exam = examDetailsData[examValue];
        examInfoDiv.innerHTML = `
            <div class="exam-info-card">
                <p><strong>Conducting Body:</strong> ${exam.conductingBody}</p>
                <p><strong>Frequency:</strong> ${exam.frequency}</p>
                <p><strong>Eligibility:</strong> ${exam.eligibility}</p>
                <p><strong>Subjects:</strong> ${exam.subjects}</p>
                <p><strong>Duration:</strong> ${exam.duration}</p>
                <p><strong>Total Marks:</strong> ${exam.totalMarks}</p>
                <p><strong>Official Website:</strong> <a href="${exam.website}" target="_blank">${exam.website}</a></p>
            </div>
        `;
        examDetailsDiv.style.display = 'block';
    } else {
        examDetailsDiv.style.display = 'none';
    }
}

// Add event listeners for exam selection
document.addEventListener('DOMContentLoaded', function() {
    const examCategory = document.getElementById('examCategory');
    const specificExam = document.getElementById('specificExam');
    
    examCategory.addEventListener('change', updateSpecificExamOptions);
    specificExam.addEventListener('change', function() {
        displayExamDetails(this.value);
    });
});

// Role Selection Handling
document.querySelectorAll('.choice-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const role = card.dataset.role;
        openSignupModal(role);
    });
});

// Open signup modal with pre-selected role
function openSignupModal(role) {
    openModal(signupModal);
    userTypeSelect.value = role;
    toggleRoleFields();
    currentStep = 1;
    updateProgressSteps();
    updateFormVisibility();
}

// Update form visibility based on current step
function updateFormVisibility() {
    const basicInfoFields = document.querySelectorAll('.form-group:not(#mentorFields):not(#aspirantFields)');
    const roleFields = document.querySelectorAll('#mentorFields, #aspirantFields');

    if (currentStep === 1) {
        basicInfoFields.forEach(field => field.style.display = 'block');
        roleFields.forEach(field => field.style.display = 'none');
    } else if (currentStep === 2) {
        basicInfoFields.forEach(field => field.style.display = 'none');
        roleFields.forEach(field => field.style.display = 'block');
    }
} 