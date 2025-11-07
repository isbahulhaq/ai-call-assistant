// AI Call Assistant Application JavaScript
class AICallAssistant {
    constructor() {
        this.currentSection = 'dashboard';
        this.calls = this.loadData('calls') || this.generateSampleCalls();
        this.customers = this.loadData('customers') || this.generateSampleCustomers();
        this.tasks = this.loadData('tasks') || this.generateSampleTasks();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDashboard();
        this.renderCalls();
        this.renderCustomers();
        this.renderTasks();
        this.initializeCharts();
        this.loadNavigationState();
    }

    // Data Management
    saveData(key, data) {
        localStorage.setItem(`aiCallAssistant_${key}`, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(`aiCallAssistant_${key}`);
        return data ? JSON.parse(data) : null;
    }

    // Sample Data Generation
    generateSampleCalls() {
        return [
            {
                id: 1,
                time: '10:30 AM',
                customer: 'Rajesh Kumar',
                phone: '+91 9876543210',
                type: 'technical',
                issue: 'Internet not working since yesterday',
                status: 'new',
                priority: 'high',
                created: new Date().toISOString()
            },
            {
                id: 2,
                time: '10:15 AM',
                customer: 'Priya Sharma',
                phone: '+91 8765432109',
                type: 'new-connection',
                issue: 'Request for new broadband connection',
                status: 'in-progress',
                priority: 'medium',
                created: new Date().toISOString()
            },
            {
                id: 3,
                time: '09:45 AM',
                customer: 'Amit Patel',
                phone: '+91 7654321098',
                type: 'billing',
                issue: 'Billing amount seems incorrect',
                status: 'callback',
                priority: 'low',
                created: new Date().toISOString()
            },
            {
                id: 4,
                time: '09:30 AM',
                customer: 'Sunita Gupta',
                phone: '+91 6543210987',
                type: 'speed',
                issue: 'Internet speed is very slow',
                status: 'resolved',
                priority: 'medium',
                created: new Date().toISOString()
            },
            {
                id: 5,
                time: '09:00 AM',
                customer: 'Vikram Singh',
                phone: '+91 5432109876',
                type: 'complaint',
                issue: 'Frequent disconnections',
                status: 'in-progress',
                priority: 'high',
                created: new Date().toISOString()
            }
        ];
    }

    generateSampleCustomers() {
        return [
            {
                id: 1,
                customer_id: 'CUST001',
                name: 'Rajesh Kumar',
                phone: '+91 9876543210',
                email: 'rajesh.kumar@email.com',
                service: 'broadband',
                address: '123 MG Road, Bangalore',
                status: 'active'
            },
            {
                id: 2,
                customer_id: 'CUST002',
                name: 'Priya Sharma',
                phone: '+91 8765432109',
                email: 'priya.sharma@email.com',
                service: 'combo',
                address: '456 Brigade Road, Bangalore',
                status: 'active'
            },
            {
                id: 3,
                customer_id: 'CUST003',
                name: 'Amit Patel',
                phone: '+91 7654321098',
                email: 'amit.patel@email.com',
                service: 'cable',
                address: '789 Indiranagar, Bangalore',
                status: 'active'
            },
            {
                id: 4,
                customer_id: 'CUST004',
                name: 'Sunita Gupta',
                phone: '+91 6543210987',
                email: 'sunita.gupta@email.com',
                service: 'wifi',
                address: '321 Koramangala, Bangalore',
                status: 'active'
            },
            {
                id: 5,
                customer_id: 'CUST005',
                name: 'Vikram Singh',
                phone: '+91 5432109876',
                email: 'vikram.singh@email.com',
                service: 'broadband',
                address: '654 Whitefield, Bangalore',
                status: 'suspended'
            }
        ];
    }

    generateSampleTasks() {
        return [
            {
                id: 1,
                title: 'Install new broadband connection',
                description: 'Customer Priya Sharma requested new connection at Brigade Road',
                assignee: 'john',
                priority: 'medium',
                status: 'pending',
                due_date: '2025-11-09',
                created: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Fix internet connectivity issue',
                description: 'Customer Rajesh Kumar reporting no internet since yesterday',
                assignee: 'sarah',
                priority: 'high',
                status: 'in-progress',
                due_date: '2025-11-08',
                created: new Date().toISOString()
            },
            {
                id: 3,
                title: 'Speed optimization for customer',
                description: 'Customer Sunita Gupta requesting speed improvement',
                assignee: 'mike',
                priority: 'low',
                status: 'completed',
                due_date: '2025-11-07',
                created: new Date().toISOString()
            },
            {
                id: 4,
                title: 'Resolve billing dispute',
                description: 'Customer Amit Patel questioning billing amount',
                assignee: 'john',
                priority: 'medium',
                status: 'pending',
                due_date: '2025-11-10',
                created: new Date().toISOString()
            },
            {
                id: 5,
                title: 'Check cable connection',
                description: 'Customer Vikram Singh reporting frequent disconnections',
                assignee: 'sarah',
                priority: 'high',
                status: 'in-progress',
                due_date: '2025-11-08',
                created: new Date().toISOString()
            }
        ];
    }

    // Event Listeners
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.showSection(section);
            });
        });

        // Search and filter events
        this.setupSearchFilters();

        // Form submissions
        this.setupFormHandlers();

        // Modal events
        this.setupModalEvents();

        // AI Assistant events
        this.setupAIAssistantEvents();
    }

    setupSearchFilters() {
        // Call search and filters
        const callSearch = document.getElementById('call-search');
        const callStatusFilter = document.getElementById('call-status-filter');
        const callTypeFilter = document.getElementById('call-type-filter');

        if (callSearch) {
            callSearch.addEventListener('input', () => this.filterCalls());
        }
        if (callStatusFilter) {
            callStatusFilter.addEventListener('change', () => this.filterCalls());
        }
        if (callTypeFilter) {
            callTypeFilter.addEventListener('change', () => this.filterCalls());
        }

        // Customer search and filters
        const customerSearch = document.getElementById('customer-search');
        const serviceTypeFilter = document.getElementById('service-type-filter');
        const statusFilter = document.getElementById('status-filter');

        if (customerSearch) {
            customerSearch.addEventListener('input', () => this.filterCustomers());
        }
        if (serviceTypeFilter) {
            serviceTypeFilter.addEventListener('change', () => this.filterCustomers());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterCustomers());
        }

        // Task search and filters
        const taskSearch = document.getElementById('task-search');
        const taskPriorityFilter = document.getElementById('task-priority-filter');
        const taskStatusFilter = document.getElementById('task-status-filter');
        const assigneeFilter = document.getElementById('assignee-filter');

        if (taskSearch) {
            taskSearch.addEventListener('input', () => this.filterTasks());
        }
        if (taskPriorityFilter) {
            taskPriorityFilter.addEventListener('change', () => this.filterTasks());
        }
        if (taskStatusFilter) {
            taskStatusFilter.addEventListener('change', () => this.filterTasks());
        }
        if (assigneeFilter) {
            assigneeFilter.addEventListener('change', () => this.filterTasks());
        }
    }

    setupFormHandlers() {
        // New call form
        const newCallForm = document.getElementById('new-call-form');
        if (newCallForm) {
            newCallForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewCall(new FormData(newCallForm));
                this.closeModal('new-call-modal');
                newCallForm.reset();
            });
        }

        // New task form
        const newTaskForm = document.getElementById('new-task-form');
        if (newTaskForm) {
            newTaskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewTask(new FormData(newTaskForm));
                this.closeModal('new-task-modal');
                newTaskForm.reset();
            });
        }
    }

    setupModalEvents() {
        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    setupAIAssistantEvents() {
        // AI assistant will be set up in AI section methods
    }

    // Navigation
    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;
        localStorage.setItem('aiCallAssistant_currentSection', sectionName);

        // Section-specific updates
        if (sectionName === 'dashboard') {
            this.updateDashboard();
        } else if (sectionName === 'calls') {
            this.renderCalls();
        } else if (sectionName === 'customers') {
            this.renderCustomers();
        } else if (sectionName === 'tasks') {
            this.renderTasks();
        } else if (sectionName === 'reports') {
            this.updateReports();
        }
    }

    loadNavigationState() {
        const savedSection = localStorage.getItem('aiCallAssistant_currentSection');
        if (savedSection) {
            this.showSection(savedSection);
        }
    }

    // Dashboard Updates
    updateDashboard() {
        // Update statistics
        document.getElementById('total-calls').textContent = this.calls.length;
        
        const pendingTasks = this.tasks.filter(task => 
            task.status === 'pending' || task.status === 'in-progress'
        ).length;
        document.getElementById('pending-tasks').textContent = pendingTasks;
        
        const activeCustomers = this.customers.filter(customer => 
            customer.status === 'active'
        ).length;
        document.getElementById('active-customers').textContent = activeCustomers;

        // Update recent calls
        this.renderRecentCalls();
        
        // Update active tasks
        this.renderActiveTasks();
    }

    renderRecentCalls() {
        const container = document.getElementById('recent-calls');
        if (!container) return;

        const recentCalls = this.calls
            .sort((a, b) => new Date(b.created) - new Date(a.created))
            .slice(0, 5);

        container.innerHTML = recentCalls.map(call => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <div class="activity-content">
                    <h4>${call.customer}</h4>
                    <p>${call.issue}</p>
                </div>
                <div class="activity-time">${call.time}</div>
            </div>
        `).join('');
    }

    renderActiveTasks() {
        const container = document.getElementById('active-tasks');
        if (!container) return;

        const activeTasks = this.tasks
            .filter(task => task.status === 'pending' || task.status === 'in-progress')
            .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
            .slice(0, 5);

        container.innerHTML = activeTasks.map(task => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-tasks"></i>
                </div>
                <div class="activity-content">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                </div>
                <div class="activity-time">${task.due_date}</div>
            </div>
        `).join('');
    }

    // Call Management
    renderCalls(callsToRender = null) {
        const calls = callsToRender || this.calls;
        const tbody = document.getElementById('call-table-body');
        if (!tbody) return;

        tbody.innerHTML = calls.map(call => `
            <tr>
                <td>${call.time}</td>
                <td>${call.customer}</td>
                <td>${call.phone}</td>
                <td>${this.getTypeIcon(call.type)} ${this.formatType(call.type)}</td>
                <td>${call.issue}</td>
                <td><span class="status-tag status-${call.status}">${this.formatStatus(call.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="app.editCall(${call.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="app.createTaskFromCall(${call.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    filterCalls() {
        const searchTerm = document.getElementById('call-search')?.value.toLowerCase() || '';
        const statusFilter = document.getElementById('call-status-filter')?.value || '';
        const typeFilter = document.getElementById('call-type-filter')?.value || '';

        let filteredCalls = this.calls.filter(call => {
            const matchesSearch = call.customer.toLowerCase().includes(searchTerm) ||
                                call.phone.includes(searchTerm) ||
                                call.issue.toLowerCase().includes(searchTerm);
            const matchesStatus = !statusFilter || call.status === statusFilter;
            const matchesType = !typeFilter || call.type === typeFilter;

            return matchesSearch && matchesStatus && matchesType;
        });

        this.renderCalls(filteredCalls);
    }

    handleNewCall(formData) {
        const newCall = {
            id: Date.now(),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            customer: formData.get('customer_name'),
            phone: formData.get('phone'),
            type: formData.get('type'),
            issue: formData.get('issue'),
            status: 'new',
            priority: formData.get('priority'),
            created: new Date().toISOString()
        };

        this.calls.unshift(newCall);
        this.saveData('calls', this.calls);
        this.updateDashboard();
        this.renderCalls();

        // Show success message
        this.showNotification('New call logged successfully!', 'success');
    }

    editCall(callId) {
        // Implementation for editing calls
        console.log('Edit call:', callId);
    }

    createTaskFromCall(callId) {
        const call = this.calls.find(c => c.id === callId);
        if (call) {
            this.openNewTaskModal(call);
        }
    }

    // Customer Management
    renderCustomers(customersToRender = null) {
        const customers = customersToRender || this.customers;
        const tbody = document.getElementById('customer-table-body');
        if (!tbody) return;

        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>${customer.customer_id}</td>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                <td>${customer.email}</td>
                <td>${this.formatService(customer.service)}</td>
                <td>${customer.address}</td>
                <td><span class="status-tag status-${customer.status}">${this.formatStatus(customer.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="app.viewCustomer(${customer.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="app.editCustomer(${customer.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    filterCustomers() {
        const searchTerm = document.getElementById('customer-search')?.value.toLowerCase() || '';
        const serviceFilter = document.getElementById('service-type-filter')?.value || '';
        const statusFilter = document.getElementById('status-filter')?.value || '';

        let filteredCustomers = this.customers.filter(customer => {
            const matchesSearch = customer.name.toLowerCase().includes(searchTerm) ||
                                customer.phone.includes(searchTerm) ||
                                customer.email.toLowerCase().includes(searchTerm) ||
                                customer.address.toLowerCase().includes(searchTerm);
            const matchesService = !serviceFilter || customer.service === serviceFilter;
            const matchesStatus = !statusFilter || customer.status === statusFilter;

            return matchesSearch && matchesService && matchesStatus;
        });

        this.renderCustomers(filteredCustomers);
    }

    viewCustomer(customerId) {
        // Implementation for viewing customer details
        console.log('View customer:', customerId);
    }

    editCustomer(customerId) {
        // Implementation for editing customer
        console.log('Edit customer:', customerId);
    }

    // Task Management
    renderTasks(tasksToRender = null) {
        const tasks = tasksToRender || this.tasks;
        const container = document.getElementById('task-list');
        if (!container) return;

        container.innerHTML = tasks.map(task => `
            <div class="task-item">
                <div class="task-priority">
                    <span class="priority-indicator priority-${task.priority}"></span>
                    <span class="status-tag status-${task.status}">${this.formatStatus(task.status)}</span>
                </div>
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>${task.description}</p>
                </div>
                <div class="task-meta">
                    <div class="task-assignee">
                        <i class="fas fa-user"></i>
                        ${this.formatAssignee(task.assignee)}
                    </div>
                    <div class="task-due-date">
                        <i class="fas fa-calendar"></i>
                        ${task.due_date}
                    </div>
                </div>
                <div class="task-status">
                    <button class="btn btn-sm btn-outline" onclick="app.updateTaskStatus(${task.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="app.deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterTasks() {
        const searchTerm = document.getElementById('task-search')?.value.toLowerCase() || '';
        const priorityFilter = document.getElementById('task-priority-filter')?.value || '';
        const statusFilter = document.getElementById('task-status-filter')?.value || '';
        const assigneeFilter = document.getElementById('assignee-filter')?.value || '';

        let filteredTasks = this.tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm) ||
                                task.description.toLowerCase().includes(searchTerm);
            const matchesPriority = !priorityFilter || task.priority === priorityFilter;
            const matchesStatus = !statusFilter || task.status === statusFilter;
            const matchesAssignee = !assigneeFilter || task.assignee === assigneeFilter;

            return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
        });

        this.renderTasks(filteredTasks);
    }

    handleNewTask(formData) {
        const newTask = {
            id: Date.now(),
            title: formData.get('title'),
            description: formData.get('description'),
            assignee: formData.get('assignee'),
            priority: formData.get('priority'),
            status: 'pending',
            due_date: formData.get('due_date'),
            created: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveData('tasks', this.tasks);
        this.updateDashboard();
        this.renderTasks();

        this.showNotification('New task created successfully!', 'success');
    }

    updateTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            // Cycle through statuses
            const statuses = ['pending', 'in-progress', 'completed', 'cancelled'];
            const currentIndex = statuses.indexOf(task.status);
            task.status = statuses[(currentIndex + 1) % statuses.length];
            
            this.saveData('tasks', this.tasks);
            this.renderTasks();
            this.updateDashboard();
            
            this.showNotification(`Task status updated to ${this.formatStatus(task.status)}`, 'success');
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveData('tasks', this.tasks);
            this.renderTasks();
            this.updateDashboard();
            
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    // AI Assistant
    simulateCall(type) {
        const scenarios = {
            'technical': {
                customer: 'Rajesh Kumar',
                scenario: 'Customer reports internet connection dropping frequently. They need immediate technical support.',
                aiResponse: 'I understand you\'re experiencing internet connection issues. Let me help you troubleshoot this. First, let\'s check if the modem lights are showing the correct status. I\'ll create a priority task for our technical team to visit your location within 2 hours.'
            },
            'new-connection': {
                customer: 'Priya Sharma',
                scenario: 'Customer wants to inquire about new broadband connection for their home office.',
                aiResponse: 'I\'d be happy to help you get connected! Let me check the availability in your area. I can offer our premium broadband package with unlimited data. I\'ll create a new connection request and schedule a free site survey within 24 hours.'
            },
            'billing': {
                customer: 'Amit Patel',
                scenario: 'Customer has questions about their billing amount and wants clarification on charges.',
                aiResponse: 'I understand your concern about the billing. Let me review your account details. I can see the additional charge is for equipment rental. I\'ll create a task for our billing team to provide a detailed breakdown and consider a payment plan if needed.'
            },
            'complaint': {
                customer: 'Sunita Gupta',
                scenario: 'Customer is frustrated with repeated service issues and considering cancellation.',
                aiResponse: 'I sincerely apologize for the service issues you\'ve experienced. Your satisfaction is our priority. I\'m creating a high-priority task for our customer relations team to call you back within 1 hour with a resolution plan. We value you as a customer and want to make this right.'
            },
            'speed': {
                customer: 'Vikram Singh',
                scenario: 'Customer reports internet speed is much slower than what they\'re paying for.',
                aiResponse: 'Let me check your current plan and speed test results. I can see you\'re on a 100 Mbps plan. I\'ll create a task for our network team to investigate and potentially upgrade your connection. In the meantime, let me run some diagnostics.'
            }
        };

        const scenario = scenarios[type];
        if (scenario) {
            this.addAIMessage('customer', `${scenario.customer}: ${scenario.scenario}`);
            setTimeout(() => {
                this.addAIMessage('ai', scenario.aiResponse);
            }, 1000);
        }
    }

    addAIMessage(sender, message) {
        const chatContainer = document.getElementById('ai-chat');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-header">
                    <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
                    <strong>${sender === 'ai' ? 'AI Assistant' : 'Customer'}</strong>
                </div>
                <div class="message-text">${message}</div>
            </div>
        `;

        // Remove welcome message if it exists
        const welcome = chatContainer.querySelector('.ai-welcome');
        if (welcome) {
            welcome.remove();
        }

        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    startAICall() {
        this.addAIMessage('ai', 'Hello! I\'m your AI Call Assistant. I can help handle customer inquiries about technical support, new connections, billing, complaints, and internet speed issues. How can I assist you today?');
    }

    clearChat() {
        const chatContainer = document.getElementById('ai-chat');
        if (chatContainer) {
            chatContainer.innerHTML = `
                <div class="ai-welcome">
                    <i class="fas fa-robot"></i>
                    <h3>AI Assistant Ready</h3>
                    <p>I'm here to help handle customer calls efficiently. I can assist with:</p>
                    <ul>
                        <li>Technical Support (Internet issues, WiFi problems)</li>
                        <li>New Connection Requests</li>
                        <li>Billing Inquiries</li>
                        <li>Service Complaints</li>
                        <li>Speed Optimization</li>
                    </ul>
                </div>
            `;
        }
    }

    // Reports and Analytics
    initializeCharts() {
        // Call Type Chart
        const callTypeCtx = document.getElementById('callTypeChart');
        if (callTypeCtx) {
            new Chart(callTypeCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Technical', 'New Connection', 'Billing', 'Complaint', 'Speed'],
                    datasets: [{
                        data: [35, 25, 20, 15, 5],
                        backgroundColor: [
                            '#0057B7',
                            '#E6F0F8',
                            '#10B981',
                            '#F59E0B',
                            '#EF4444'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        // Response Time Chart
        const responseTimeCtx = document.getElementById('responseTimeChart');
        if (responseTimeCtx) {
            new Chart(responseTimeCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Average Response Time (minutes)',
                        data: [4.5, 4.2, 3.8, 4.0, 4.2, 5.1, 4.8],
                        borderColor: '#0057B7',
                        backgroundColor: 'rgba(0, 87, 183, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    updateReports() {
        const reportContainer = document.getElementById('report-summary');
        if (!reportContainer) return;

        const totalCalls = this.calls.length;
        const resolvedCalls = this.calls.filter(c => c.status === 'resolved').length;
        const pendingTasks = this.tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;
        const activeCustomers = this.customers.filter(c => c.status === 'active').length;
        const resolutionRate = totalCalls > 0 ? Math.round((resolvedCalls / totalCalls) * 100) : 0;

        reportContainer.innerHTML = `
            <div class="report-metric">
                <h4>${totalCalls}</h4>
                <p>Total Calls</p>
            </div>
            <div class="report-metric">
                <h4>${resolutionRate}%</h4>
                <p>Resolution Rate</p>
            </div>
            <div class="report-metric">
                <h4>${pendingTasks}</h4>
                <p>Pending Tasks</p>
            </div>
            <div class="report-metric">
                <h4>${activeCustomers}</h4>
                <p>Active Customers</p>
            </div>
        `;
    }

    // Utility Methods
    getTypeIcon(type) {
        const icons = {
            'technical': '<i class="fas fa-wrench"></i>',
            'new-connection': '<i class="fas fa-plug"></i>',
            'billing': '<i class="fas fa-dollar-sign"></i>',
            'complaint': '<i class="fas fa-exclamation-triangle"></i>',
            'speed': '<i class="fas fa-tachometer-alt"></i>'
        };
        return icons[type] || '<i class="fas fa-phone"></i>';
    }

    formatType(type) {
        return type.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    formatService(service) {
        return service.charAt(0).toUpperCase() + service.slice(1);
    }

    formatStatus(status) {
        return status.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    formatAssignee(assignee) {
        const names = {
            'john': 'John Smith',
            'sarah': 'Sarah Johnson',
            'mike': 'Mike Wilson'
        };
        return names[assignee] || assignee;
    }

    // Modal Management
    openModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    // Public methods for buttons
    openNewCallModal() {
        this.openModal('new-call-modal');
    }

    openNewTaskModal(prefillData = null) {
        this.openModal('new-task-modal');
        
        if (prefillData) {
            const form = document.getElementById('new-task-form');
            if (form) {
                form.querySelector('[name="title"]').value = `Address: ${prefillData.customer} - ${prefillData.issue}`;
                form.querySelector('[name="description"]').value = `Call from ${prefillData.customer} (${prefillData.phone}): ${prefillData.issue}`;
            }
        }
    }

    openAIAssistant() {
        this.showSection('ai');
    }

    // Notifications
    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : '#0057B7'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Global functions for HTML onclick events
function showSection(section) {
    app.showSection(section);
}

function openNewCallModal() {
    app.openNewCallModal();
}

function openNewTaskModal() {
    app.openNewTaskModal();
}

function openAIAssistant() {
    app.openAIAssistant();
}

function simulateCall(type) {
    app.simulateCall(type);
}

function startAICall() {
    app.startAICall();
}

function clearChat() {
    app.clearChat();
}

function closeModal(modalId) {
    app.closeModal(modalId);
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new AICallAssistant();
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .ai-message {
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 8px;
    }
    
    .ai-message-customer {
        background: #f3f4f6;
        margin-left: 2rem;
    }
    
    .ai-message-ai {
        background: #e6f0f8;
        margin-right: 2rem;
    }
    
    .message-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #0057B7;
    }
    
    .message-text {
        line-height: 1.5;
    }
`;
document.head.appendChild(notificationStyles);