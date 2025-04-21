// Mock data for demonstration
const mockData = {
    mentors: [
        {
            id: 1,
            name: 'John Doe',
            expertise: 'Mathematics',
            rating: 4.8,
            students: 120,
            image: 'https://via.placeholder.com/50'
        },
        {
            id: 2,
            name: 'Jane Smith',
            expertise: 'Physics',
            rating: 4.9,
            students: 85,
            image: 'https://via.placeholder.com/50'
        }
    ],
    resources: [
        {
            id: 1,
            title: 'Mathematics Formula Sheet',
            type: 'PDF',
            uploadedBy: 'John Doe',
            date: '2024-03-15'
        },
        {
            id: 2,
            title: 'Physics Practice Problems',
            type: 'PDF',
            uploadedBy: 'Jane Smith',
            date: '2024-03-14'
        }
    ],
    sessions: [
        {
            id: 1,
            title: 'Calculus Basics',
            mentor: 'John Doe',
            date: '2024-03-20',
            time: '10:00 AM'
        },
        {
            id: 2,
            title: 'Newton\'s Laws',
            mentor: 'Jane Smith',
            date: '2024-03-21',
            time: '2:00 PM'
        }
    ],
    messages: [
        {
            id: 1,
            sender: 'John Doe',
            preview: 'Hi, I can help you with calculus...',
            time: '2:30 PM',
            unread: true
        },
        {
            id: 2,
            sender: 'Jane Smith',
            preview: 'Here are the practice problems...',
            time: '1:45 PM',
            unread: false
        }
    ]
};

// DOM Elements
const mentorList = document.querySelector('.mentor-list');
const resourceList = document.querySelector('.resource-list');
const sessionList = document.querySelector('.session-list');
const messageList = document.querySelector('.message-list');
const logoutBtn = document.getElementById('logoutBtn');

// Load dashboard data
function loadDashboardData() {
    // Load mentors
    mentorList.innerHTML = mockData.mentors.map(mentor => `
        <div class="mentor-item">
            <img src="${mentor.image}" alt="${mentor.name}" class="mentor-image">
            <div class="mentor-info">
                <h4>${mentor.name}</h4>
                <p>${mentor.expertise}</p>
                <div class="mentor-stats">
                    <span>⭐ ${mentor.rating}</span>
                    <span>👥 ${mentor.students}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Load resources
    resourceList.innerHTML = mockData.resources.map(resource => `
        <div class="resource-item">
            <div class="resource-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="resource-info">
                <h4>${resource.title}</h4>
                <p>By ${resource.uploadedBy}</p>
                <span class="date">${resource.date}</span>
            </div>
        </div>
    `).join('');

    // Load sessions
    sessionList.innerHTML = mockData.sessions.map(session => `
        <div class="session-item">
            <div class="session-info">
                <h4>${session.title}</h4>
                <p>With ${session.mentor}</p>
                <span class="date">${session.date} at ${session.time}</span>
            </div>
            <button class="btn-primary btn-sm">Join</button>
        </div>
    `).join('');

    // Load messages
    messageList.innerHTML = mockData.messages.map(message => `
        <div class="message-item ${message.unread ? 'unread' : ''}">
            <div class="message-info">
                <h4>${message.sender}</h4>
                <p>${message.preview}</p>
                <span class="time">${message.time}</span>
            </div>
            ${message.unread ? '<span class="unread-badge"></span>' : ''}
        </div>
    `).join('');
}

// Handle logout
logoutBtn.addEventListener('click', () => {
    // Here you would typically clear the user's session
    localStorage.removeItem('user');
    window.location.href = '/index.html';
});

// Handle navigation
document.querySelectorAll('.dashboard-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all links
        document.querySelectorAll('.dashboard-nav a').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        // Here you would typically load the corresponding section
        console.log('Navigating to:', link.getAttribute('href'));
    });
});

// Handle quick actions
document.querySelector('.quick-actions').addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        const action = e.target.closest('button').textContent.trim();
        console.log('Quick action:', action);
        // Here you would typically handle the quick action
    }
});

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = '/index.html';
        return;
    }

    // Load dashboard data
    loadDashboardData();
}); 