// Application State
let currentUser = null;
let tasks = [];
let messages = [];
let users = [];
let clients = [];
let currentTaskId = null;

// Initial Users
const initialUsers = [
    {
        id: 'KK',
        password: 'KK',
        name: 'Kiran Patel',
        role: 'manager',
        email: 'kiran.patel@taxreadyconsulting.com'
    },
    {
        id: 'MR',
        password: 'MR',
        name: 'Madhav Rupala',
        role: 'employee',
        email: 'madhav.rupala@taxreadyconsulting.com'
    }
];

// Initial Clients
const initialClients = [
    {
        id: 'client001',
        name: 'ABC Corporation',
        contact: 'John Smith',
        email: 'john@abccorp.com',
        phone: '555-0123'
    },
    {
        id: 'client002',
        name: 'XYZ Industries',
        contact: 'Jane Doe',
        email: 'jane@xyzind.com',
        phone: '555-0124'
    },
    {
        id: 'client003',
        name: 'Tech Solutions LLC',
        contact: 'Mike Johnson',
        email: 'mike@techsol.com',
        phone: '555-0125'
    }
];

// Demo Tasks
const demoTasks = [
    {
        id: 'task001',
        title: 'Tax Return Preparation',
        description: 'Prepare annual tax returns for Q4 2024',
        assignedTo: 'MR',
        assignedBy: 'KK',
        clientId: 'client001',
        priority: 'high',
        status: 'in-progress',
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'task002',
        title: 'Quarterly Review',
        description: 'Review quarterly financial statements and compliance',
        assignedTo: 'MR',
        assignedBy: 'KK',
        clientId: 'client002',
        priority: 'medium',
        status: 'pending',
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
];

// Demo Messages
const demoMessages = [
    {
        id: 'msg001',
        sender: 'KK',
        message: 'Welcome to Tax Ready Consulting task management system!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'msg002',
        sender: 'MR',
        message: 'Thank you! Ready to work on the assigned tasks.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadDemoData();
    setupEventListeners();
    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
});

function initializeApp() {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    } else {
        showLoginPage();
    }
}

function loadDemoData() {
    // Load users
    if (!localStorage.getItem('users')) {
        users = initialUsers;
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }
    
    // Load clients
    if (!localStorage.getItem('clients')) {
        clients = initialClients;
        localStorage.setItem('clients', JSON.stringify(clients));
    } else {
        clients = JSON.parse(localStorage.getItem('clients'));
    }
    
    // Load demo data if not exists
    if (!localStorage.getItem('tasks')) {
        tasks = demoTasks;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    if (!localStorage.getItem('messages')) {
        messages = demoMessages;
        localStorage.setItem('messages', JSON.stringify(messages));
    } else {
        messages = JSON.parse(localStorage.getItem('messages'));
    }
}

function updateDateTime() {
    const now = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    if (dateElement && timeElement) {
        dateElement.textContent = now.toLocaleDateString('en-US', dateOptions);
        timeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Task creation form
    document.getElementById('createTaskForm').addEventListener('submit', handleCreateTask);
    
    // Task filters
    document.getElementById('statusFilter').addEventListener('change', filterTasks);
    document.getElementById('priorityFilter').addEventListener('change', filterTasks);
    document.getElementById('allStatusFilter').addEventListener('change', filterAllTasks);
    document.getElementById('employeeFilter').addEventListener('change', filterAllTasks);
    document.getElementById('clientFilter').addEventListener('change', filterAllTasks);
    
    // Chat functionality
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Modal functionality
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('updateTaskBtn').addEventListener('click', updateTaskStatus);
    
    // User and Client management
    document.getElementById('addUserBtn').addEventListener('click', openAddUserModal);
    document.getElementById('addClientBtn').addEventListener('click', openAddClientModal);
    document.getElementById('addUserForm').addEventListener('submit', handleAddUser);
    document.getElementById('addClientForm').addEventListener('submit', handleAddClient);
    
    // Click outside modal to close
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('taskModal');
        const userModal = document.getElementById('addUserModal');
        const clientModal = document.getElementById('addClientModal');
        
        if (e.target === modal) {
            closeModal();
        }
        if (e.target === userModal) {
            closeAddUserModal();
        }
        if (e.target === clientModal) {
            closeAddClientModal();
        }
    });
}

function handleLogin(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.id === userId && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showNotification('Login successful!', 'success');
        showDashboard();
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showNotification('Logged out successfully!', 'info');
    showLoginPage();
}

function showLoginPage() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('dashboardPage').classList.remove('active');
}

function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    
    // Update UI based on user role
    updateUserInterface();
    
    // Show dashboard section by default
    showSection('dashboard');
}

function updateUserInterface() {
    // Update user welcome message
    document.getElementById('userWelcome').textContent = `Welcome, ${currentUser.name}`;
    
    // Show/hide manager-only features
    const managerElements = document.querySelectorAll('.manager-only');
    managerElements.forEach(element => {
        element.style.display = currentUser.role === 'manager' ? 'block' : 'none';
    });
    
    // Populate employee dropdown for task assignment
    if (currentUser.role === 'manager') {
        const employeeSelect = document.getElementById('assignTo');
        const employeeFilter = document.getElementById('employeeFilter');
        
        employeeSelect.innerHTML = '<option value="">Select Employee</option>';
        employeeFilter.innerHTML = '<option value="all">All Employees</option>';
        
        users.filter(u => u.role === 'employee').forEach(emp => {
            employeeSelect.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
            employeeFilter.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
        });
        
        // Populate client dropdown
        const clientSelect = document.getElementById('taskClient');
        const clientFilter = document.getElementById('clientFilter');
        
        clientSelect.innerHTML = '<option value="">Select Client</option>';
        clientFilter.innerHTML = '<option value="all">All Clients</option>';
        
        clients.forEach(client => {
            clientSelect.innerHTML += `<option value="${client.id}">${client.name}</option>`;
            clientFilter.innerHTML += `<option value="${client.id}">${client.name}</option>`;
        });
    }
    
    // Update profile section
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileRole').textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
    document.getElementById('profileEmail').textContent = currentUser.email;
}

function handleNavigation(e) {
    e.preventDefault();
    const section = e.target.closest('.nav-link').dataset.section;
    showSection(section);
    
    // Update active navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    e.target.closest('.nav-link').classList.add('active');
}

function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName + 'Section').classList.add('active');
    
    // Load section-specific data
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'tasks':
            loadMyTasks();
            break;
        case 'allTasks':
            loadAllTasks();
            break;
        case 'manageUsers':
            loadUserManagement();
            break;
        case 'manageClients':
            loadClientManagement();
            break;
        case 'chat':
            loadChat();
            break;
    }
}

function loadDashboard() {
    const userTasks = currentUser.role === 'manager' ? tasks : tasks.filter(t => t.assignedTo === currentUser.id);
    
    // Update statistics
    document.getElementById('totalTasks').textContent = userTasks.length;
    document.getElementById('pendingTasks').textContent = userTasks.filter(t => t.status === 'pending').length;
    document.getElementById('completedTasks').textContent = userTasks.filter(t => t.status === 'completed').length;
    
    // Calculate overdue tasks
    const now = new Date();
    const overdueTasks = userTasks.filter(t => 
        t.status !== 'completed' && new Date(t.deadline) < now
    );
    document.getElementById('overdueTasks').textContent = overdueTasks.length;
    
    // Load recent tasks
    const recentTasks = userTasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
    
    renderTaskList(recentTasks, 'recentTasksList');
}

function loadMyTasks() {
    const userTasks = tasks.filter(t => t.assignedTo === currentUser.id);
    renderTaskList(userTasks, 'myTasksList');
}

function loadAllTasks() {
    if (currentUser.role === 'manager') {
        renderTaskList(tasks, 'allTasksList');
    }
}

function renderTaskList(taskList, containerId) {
    const container = document.getElementById(containerId);
    
    if (taskList.length === 0) {
        container.innerHTML = '<div class="no-tasks">No tasks found.</div>';
        return;
    }
    
    container.innerHTML = taskList.map(task => {
        const assignedUser = users.find(u => u.id === task.assignedTo);
        const client = clients.find(c => c.id === task.clientId);
        const deadline = new Date(task.deadline);
        const isOverdue = deadline < new Date() && task.status !== 'completed';
        
        return `
            <div class="task-item" onclick="openTaskModal('${task.id}')" data-task-id="${task.id}">
                <div class="priority-indicator ${task.priority}"></div>
                <div class="task-header">
                    <div>
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">
                            <span class="task-priority ${task.priority}">${task.priority}</span>
                            <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span>
                        </div>
                    </div>
                </div>
                <div class="task-description">${task.description}</div>
                <div class="task-footer">
                    <div class="task-deadline ${isOverdue ? 'overdue' : ''}">
                        <i class="fas fa-calendar-alt"></i>
                        Due: ${deadline.toLocaleDateString()}
                    </div>
                    <div class="task-assignee">
                        <i class="fas fa-user"></i>
                        ${assignedUser ? assignedUser.name : 'Unknown'}
                    </div>
                    <div class="task-client">
                        <i class="fas fa-building"></i>
                        ${client ? client.name : 'No Client'}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterTasks() {
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;
    
    let filteredTasks = tasks.filter(t => t.assignedTo === currentUser.id);
    
    if (statusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
    }
    
    if (priorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.priority === priorityFilter);
    }
    
    renderTaskList(filteredTasks, 'myTasksList');
}

function filterAllTasks() {
    if (currentUser.role !== 'manager') return;
    
    const statusFilter = document.getElementById('allStatusFilter').value;
    const employeeFilter = document.getElementById('employeeFilter').value;
    const clientFilter = document.getElementById('clientFilter').value;
    
    let filteredTasks = tasks;
    
    if (statusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.status === statusFilter);
    }
    
    if (employeeFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.assignedTo === employeeFilter);
    }
    
    if (clientFilter !== 'all') {
        filteredTasks = filteredTasks.filter(t => t.clientId === clientFilter);
    }
    
    renderTaskList(filteredTasks, 'allTasksList');
}

function handleCreateTask(e) {
    e.preventDefault();
    
    if (currentUser.role !== 'manager') {
        showNotification('Only managers can create tasks!', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const taskData = {
        id: 'task' + Date.now(),
        title: formData.get('taskTitle'),
        description: formData.get('taskDescription'),
        assignedTo: formData.get('assignTo'),
        assignedBy: currentUser.id,
        clientId: formData.get('taskClient'),
        priority: formData.get('taskPriority'),
        status: 'pending',
        deadline: formData.get('taskDeadline'),
        createdAt: new Date().toISOString()
    };
    
    tasks.push(taskData);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    showNotification('Task created successfully!', 'success');
    e.target.reset();
    
    // Refresh task lists
    loadDashboard();
    loadAllTasks();
}

function openTaskModal(taskId) {
    currentTaskId = taskId;
    const task = tasks.find(t => t.id === taskId);
    const assignedUser = users.find(u => u.id === task.assignedTo);
    const createdBy = users.find(u => u.id === task.assignedBy);
    const client = clients.find(c => c.id === task.clientId);
    
    const deadline = new Date(task.deadline);
    const isOverdue = deadline < new Date() && task.status !== 'completed';
    
    document.getElementById('taskDetails').innerHTML = `
        <div class="task-detail">
            <h4>${task.title}</h4>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Client:</strong> ${client ? client.name : 'No Client'}</p>
            <p><strong>Assigned to:</strong> ${assignedUser ? assignedUser.name : 'Unknown'}</p>
            <p><strong>Created by:</strong> ${createdBy ? createdBy.name : 'Unknown'}</p>
            <p><strong>Priority:</strong> <span class="task-priority ${task.priority}">${task.priority}</span></p>
            <p><strong>Status:</strong> <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span></p>
            <p><strong>Deadline:</strong> <span class="${isOverdue ? 'overdue' : ''}">${deadline.toLocaleString()}</span></p>
            <p><strong>Created:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
        </div>
    `;
    
    // Set current status in dropdown
    document.getElementById('taskStatus').value = task.status;
    
    // Show/hide update button based on permissions
    const updateBtn = document.getElementById('updateTaskBtn');
    if (currentUser.role === 'manager' || task.assignedTo === currentUser.id) {
        updateBtn.style.display = 'block';
    } else {
        updateBtn.style.display = 'none';
    }
    
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
    currentTaskId = null;
}

function updateTaskStatus() {
    if (!currentTaskId) return;
    
    const newStatus = document.getElementById('taskStatus').value;
    const taskIndex = tasks.findIndex(t => t.id === currentTaskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        showNotification('Task status updated successfully!', 'success');
        closeModal();
        
        // Refresh current view
        const activeSection = document.querySelector('.nav-link.active').dataset.section;
        showSection(activeSection);
    }
}

function loadChat() {
    const chatMessages = document.getElementById('chatMessages');
    
    chatMessages.innerHTML = messages.map(msg => {
        const sender = users.find(u => u.id === msg.sender);
        const isOwn = msg.sender === currentUser.id;
        
        return `
            <div class="chat-message ${isOwn ? 'own' : 'other'}">
                <div class="message-header">
                    ${isOwn ? 'You' : (sender ? sender.name : 'Unknown')} • ${new Date(msg.timestamp).toLocaleTimeString()}
                </div>
                <div class="message-content">${msg.message}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    const newMessage = {
        id: 'msg' + Date.now(),
        sender: currentUser.id,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    messageInput.value = '';
    loadChat();
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// User Management Functions
function loadUserManagement() {
    if (currentUser.role !== 'manager') return;
    
    const usersList = document.getElementById('usersList');
    
    if (users.length === 0) {
        usersList.innerHTML = '<div class="no-users">No users found.</div>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info-card">
                <div class="user-avatar">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <div class="user-details">
                    <h4>${user.name}</h4>
                    <p>${user.email}</p>
                    <span class="user-role ${user.role}">${user.role}</span>
                </div>
            </div>
            <div class="user-actions">
                <button class="btn-small btn-danger" onclick="deleteUser('${user.id}')">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openAddUserModal() {
    document.getElementById('addUserModal').style.display = 'block';
}

function closeAddUserModal() {
    document.getElementById('addUserModal').style.display = 'none';
    document.getElementById('addUserForm').reset();
}

function handleAddUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userId = formData.get('newUserId');
    
    // Check if user ID already exists
    if (users.find(u => u.id === userId)) {
        showNotification('User ID already exists!', 'error');
        return;
    }
    
    const userData = {
        id: userId,
        password: formData.get('newUserPassword'),
        name: formData.get('newUserName'),
        email: formData.get('newUserEmail'),
        role: formData.get('newUserRole')
    };
    
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    showNotification('User added successfully!', 'success');
    closeAddUserModal();
    loadUserManagement();
    updateUserInterface(); // Refresh dropdowns
}

function deleteUser(userId) {
    if (userId === currentUser.id) {
        showNotification('Cannot delete your own account!', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this user?')) {
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('User deleted successfully!', 'success');
        loadUserManagement();
        updateUserInterface(); // Refresh dropdowns
    }
}

// Client Management Functions
function loadClientManagement() {
    if (currentUser.role !== 'manager') return;
    
    const clientsList = document.getElementById('clientsList');
    
    if (clients.length === 0) {
        clientsList.innerHTML = '<div class="no-clients">No clients found.</div>';
        return;
    }
    
    clientsList.innerHTML = clients.map(client => `
        <div class="client-card">
            <div class="client-info-card">
                <div class="client-avatar">
                    ${client.name.charAt(0).toUpperCase()}
                </div>
                <div class="client-details">
                    <h4>${client.name}</h4>
                    <p>Contact: ${client.contact}</p>
                    <p>Email: ${client.email}</p>
                    <p>Phone: ${client.phone}</p>
                </div>
            </div>
            <div class="client-actions">
                <button class="btn-small btn-danger" onclick="deleteClient('${client.id}')">
                    <i class="fas fa-trash"></i>
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openAddClientModal() {
    document.getElementById('addClientModal').style.display = 'block';
}

function closeAddClientModal() {
    document.getElementById('addClientModal').style.display = 'none';
    document.getElementById('addClientForm').reset();
}

function handleAddClient(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const clientData = {
        id: 'client' + Date.now(),
        name: formData.get('newClientName'),
        contact: formData.get('newClientContact'),
        email: formData.get('newClientEmail'),
        phone: formData.get('newClientPhone')
    };
    
    clients.push(clientData);
    localStorage.setItem('clients', JSON.stringify(clients));
    
    showNotification('Client added successfully!', 'success');
    closeAddClientModal();
    loadClientManagement();
    updateUserInterface(); // Refresh dropdowns
}

function deleteClient(clientId) {
    if (confirm('Are you sure you want to delete this client?')) {
        clients = clients.filter(c => c.id !== clientId);
        localStorage.setItem('clients', JSON.stringify(clients));
        
        showNotification('Client deleted successfully!', 'success');
        loadClientManagement();
        updateUserInterface(); // Refresh dropdowns
    }
}

// Additional Features

// Auto-refresh dashboard every 30 seconds
setInterval(() => {
    if (currentUser && document.querySelector('.nav-link.active').dataset.section === 'dashboard') {
        loadDashboard();
    }
}, 30000);

// Auto-refresh chat every 5 seconds
setInterval(() => {
    if (currentUser && document.querySelector('.nav-link.active').dataset.section === 'chat') {
        loadChat();
    }
}, 5000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter to send message in chat
    if (e.ctrlKey && e.key === 'Enter' && document.querySelector('.nav-link.active').dataset.section === 'chat') {
        sendMessage();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Theme toggle (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Task deadline notifications
function checkDeadlines() {
    if (!currentUser) return;
    
    const userTasks = currentUser.role === 'manager' ? tasks : tasks.filter(t => t.assignedTo === currentUser.id);
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    userTasks.forEach(task => {
        if (task.status !== 'completed') {
            const deadline = new Date(task.deadline);
            
            // Check if deadline is tomorrow
            if (deadline.toDateString() === tomorrow.toDateString()) {
                showNotification(`Task "${task.title}" is due tomorrow!`, 'info');
            }
            
            // Check if task is overdue
            if (deadline < now) {
                showNotification(`Task "${task.title}" is overdue!`, 'error');
            }
        }
    });
}

// Check deadlines every hour
setInterval(checkDeadlines, 60 * 60 * 1000);

// Export tasks (bonus feature)
function exportTasks() {
    if (currentUser.role !== 'manager') return;
    
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'tasks_export.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Search functionality (bonus feature)
function searchTasks(query) {
    const searchResults = tasks.filter(task => 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase())
    );
    
    return searchResults;
}

// Task priority color coding
function getPriorityColor(priority) {
    switch(priority) {
        case 'high': return '#e74c3c';
        case 'medium': return '#f39c12';
        case 'low': return '#27ae60';
        default: return '#95a5a6';
    }
}

// Status color coding
function getStatusColor(status) {
    switch(status) {
        case 'pending': return '#95a5a6';
        case 'in-progress': return '#3498db';
        case 'completed': return '#27ae60';
        default: return '#95a5a6';
    }
}

// Initialize deadline checking on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkDeadlines, 2000); // Check after 2 seconds
});

// Service Worker for offline support (bonus feature)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Progressive Web App features
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installBtn = document.getElementById('installBtn');
    if (installBtn) {
        installBtn.style.display = 'block';
        installBtn.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
});

// Drag and drop for task status update (bonus feature)
function enableDragAndDrop() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.draggable = true;
        
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.taskId);
        });
    });
}

// Task completion celebration (bonus feature)
function celebrateTaskCompletion(taskTitle) {
    showNotification(`🎉 Congratulations! You completed "${taskTitle}"!`, 'success');
    
    // Add confetti effect (could be implemented with a library)
    // For now, just show a special notification
    setTimeout(() => {
        showNotification('Keep up the great work!', 'info');
    }, 2000);
}

// Dark mode toggle
function initializeDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.title = 'Toggle Dark Mode';
    darkModeToggle.addEventListener('click', toggleTheme);
    
    document.querySelector('.header-right').appendChild(darkModeToggle);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeDarkMode();
        enableDragAndDrop();
    }, 1000);
});
