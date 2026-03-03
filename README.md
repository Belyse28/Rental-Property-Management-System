# 🏠 Property Rental Management System (PRS)

A complete Vue.js-based property rental management system with role-based access control for Admins and Landlords.

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based access control** (Admin, Landlord & Tenant)
- Secure login system
- Tenant registration functionality
- Session management with Vue Router guards

### 👥 User Roles

#### Admin
- Full system access
- Manage all properties, tenants, and payments
- View all system data
- Manage landlord accounts

#### Landlord
- Manage only their own properties
- Manage only their own tenants
- Manage only their own payment records
- Approve/reject tenant booking requests
- Cannot access other landlords' data

#### Tenant (NEW)
- Register and create account
- Browse all available properties with images
- View property details (name, address, rent, status)
- Create booking requests for available properties
- Track booking request status (Pending/Approved/Rejected)
- Cannot book occupied properties

### 📋 Core Modules

1. **Property Management** - Full CRUD operations
   - Add, edit, delete properties
   - Track property status (Available/Occupied)
   - Automatic status updates
   - Property image support

2. **Tenant Management** - Full CRUD operations
   - Add, edit, delete tenants
   - Assign tenants to properties
   - Email and contact validation

3. **Payment Management** - Full CRUD operations
   - Record payments
   - Track payment history
   - Link payments to tenants and properties

4. **Booking System** (NEW)
   - Tenants can request property bookings
   - Landlords approve/reject requests
   - Status tracking (Pending/Approved/Rejected)
   - Automatic property status updates on approval

5. **User Management** (Admin only)
   - Add, edit, delete landlord accounts
   - View all system users

### ✅ Validation Rules

#### Business Rules (5)
1. ✓ Property cannot be added without owner ID
2. ✓ Tenant cannot be assigned to occupied property
3. ✓ Payment amount must be greater than zero
4. ✓ Landlord can only access their own records
5. ✓ Property status automatically updates to "Occupied" when tenant moves in

#### Technical Rules (5)
1. ✓ Email must follow valid format (regex validation)
2. ✓ Contact must be numeric and 10-15 digits
3. ✓ Required fields cannot be empty
4. ✓ No duplicate usernames allowed
5. ✓ Date fields must contain proper date formats

### 🎨 User Interface
- Clean, modern design
- Role-based dashboard
- Modal forms for data entry
- Confirmation dialogs for destructive actions
- Success/Error/Warning notifications
- Responsive tables

## ✨ Design Features
- **WCAG 3.0 Compliant** - Accessible to all users
- **Professional UI** - Modern sidebar navigation with collapsible menu
- **Comprehensive Dashboard** - Statistics cards, recent activity, quick actions
- **Intuitive Navigation** - Easy back-to-dashboard from any view
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Human-Centered** - Focus on usability and user experience
- **Color-Coded** - Visual hierarchy with semantic colors
- **Keyboard Accessible** - Full keyboard navigation support

📖 **[View Complete UI/UX Design Documentation](UI_UX_DESIGN.md)**

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory**
```bash
cd Rental-Property-Management-System
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:5173`

## 🔑 Demo Accounts

### Admin Account
- **Username:** admin
- **Password:** admin123
- **Access:** Full system access

### Landlord Accounts
- **Username:** landlord1
- **Password:** land123
- **Access:** Own properties only

- **Username:** landlord2
- **Password:** land123
- **Access:** Own properties only

### Tenant Account
- **Username:** tenant1
- **Password:** tenant123
- **Access:** View properties and create booking requests

**Note:** Tenants can also register new accounts through the registration form.

## 📁 Project Structure

```
Rental-Property-Management-System/
├── src/
│   ├── components/
│   │   └── AlertDialog.vue       # Notification component
│   ├── views/
│   │   ├── Login.vue             # Login & Registration page
│   │   ├── Dashboard.vue         # Main dashboard
│   │   ├── PropertyManagement.vue
│   │   ├── TenantManagement.vue
│   │   ├── PaymentManagement.vue
│   │   ├── BookingManagement.vue # NEW: Booking requests
│   │   ├── TenantView.vue        # NEW: Tenant property browsing
│   │   └── UserManagement.vue
│   ├── stores/               # NEW: Pinia stores
│   │   ├── auth.js              # Authentication store
│   │   ├── property.js          # Property & booking store
│   │   ├── tenant.js            # Tenant store
│   │   └── payment.js           # Payment store
│   ├── router/               # NEW: Vue Router
│   │   └── index.js             # Route configuration
│   ├── App.vue               # Root component
│   └── main.js               # Entry point
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── SECURITY.md           # NEW: Security documentation
└── GIT_WORKFLOW.md       # NEW: Git workflow guide
```

## 🎯 Usage Guide

### For Admins
1. Login with admin credentials
2. Access all management modules
3. View system-wide statistics
4. Manage all properties, tenants, and payments
5. Manage landlord accounts
6. Review all booking requests

### For Landlords
1. Login with landlord credentials
2. View only your properties and tenants
3. Add new properties with images
4. Assign tenants to available properties
5. Record payments from tenants
6. Review and approve/reject booking requests

### For Tenants
1. Register a new account or login
2. Browse all available properties
3. View property details and images
4. Request booking for available properties
5. Track your booking request status
6. Cannot book occupied properties

## 🛠️ Technology Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **State Management:** Pinia (centralized stores)
- **Routing:** Vue Router 4
- **Styling:** Scoped CSS with gradient themes
- **Validation:** Custom validation rules
- **Security:** XSS protection, RBAC, input sanitization

## 📝 Key Implementation Details

### State Management
- Centralized reactive store
- Validation rules integrated with CRUD operations
- Role-based data filtering

### Security Features
- Role-based access control
- Data isolation between landlords
- Validation on all inputs
- Confirmation dialogs for destructive actions

### User Experience
- Instant feedback with alert dialogs
- Form validation with clear error messages
- Responsive design
- Intuitive navigation

## 🔄 CRUD Operations

All modules support complete CRUD:
- **Create:** Add new records with validation
- **Read:** View filtered data based on role
- **Update:** Edit existing records
- **Delete:** Remove records with confirmation

## 📊 Business Logic

- Properties automatically marked as "Occupied" when tenant assigned
- Properties return to "Available" when tenant removed
- Landlords can only see/modify their own data
- Admins have unrestricted access
- All operations validated against business rules

## 🎨 UI Components

1. **Login Form** - Secure authentication
2. **Dashboard** - Role-based overview with statistics
3. **Property Management** - Property CRUD interface
4. **Tenant Management** - Tenant CRUD interface
5. **Payment Management** - Payment CRUD interface
6. **Alert Dialog** - User feedback system

## 🚦 Validation Messages

The system provides clear feedback:
- ✅ Success: "Property added successfully"
- ❌ Error: "Email must follow a valid format"
- ⚠️ Warning: "Field cannot be empty"
- ℹ️ Info: "Logged out successfully"

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development

To build for production:
```bash
npm run build
```

To preview production build:
```bash
npm run preview
```

---

**Built with Vue.js 3 + Vite** 🚀
