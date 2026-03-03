# Security Design & Threat Modeling

## Assets to Protect

1. **User Credentials** - Usernames and passwords
2. **Personal Information** - Tenant emails, contact numbers, names
3. **Financial Data** - Payment records and amounts
4. **Property Information** - Property details and ownership
5. **Session Data** - Current user authentication state

## Possible Attackers

1. **Malicious Users** - Attempting unauthorized access to other users' data
2. **External Attackers** - Trying to inject malicious code or steal data
3. **Insider Threats** - Landlords trying to access other landlords' properties
4. **Automated Bots** - Attempting SQL injection or XSS attacks

## Identified Threats

### 1. Cross-Site Scripting (XSS)
**Risk**: Attackers inject malicious scripts through input fields
**Impact**: Session hijacking, data theft, malicious redirects

### 2. Unauthorized Access
**Risk**: Users accessing data they don't own
**Impact**: Privacy breach, data manipulation

### 3. Input Validation Bypass
**Risk**: Malformed data causing application errors
**Impact**: Data corruption, application crashes

### 4. Session Hijacking
**Risk**: Stealing user sessions
**Impact**: Unauthorized access to accounts

### 5. Data Exposure
**Risk**: Sensitive data visible in client-side code
**Impact**: Privacy violations, credential theft

## Mitigation Strategies

### 1. XSS Prevention
- **Vue.js Built-in Protection**: Using `{{ }}` syntax which auto-escapes HTML
- **No v-html Usage**: Avoided `v-html` directive that allows raw HTML injection
- **Input Sanitization**: All user inputs are bound with v-model which sanitizes data
- **Content Security**: No inline JavaScript execution

### 2. Role-Based Access Control (RBAC)
- **Route Guards**: Vue Router beforeEach guards check authentication
- **Store-Level Filtering**: Pinia stores filter data based on user role
- **Component-Level Checks**: UI elements hidden based on permissions
- **Backend Simulation**: Access control enforced in store methods

### 3. Input Validation
- **Client-Side Validation**: HTML5 validation attributes (required, type, pattern)
- **Store-Level Validation**: Email regex, contact number validation
- **Business Rule Validation**: Property occupancy checks, payment amount validation
- **Error Handling**: Try-catch blocks with user-friendly error messages

### 4. Authentication Security
- **Session Management**: Pinia stores maintain authentication state
- **Logout Functionality**: Proper session cleanup on logout
- **Route Protection**: Unauthenticated users redirected to login
- **Password Fields**: Using type="password" for credential inputs

### 5. Data Privacy
- **Data Isolation**: Landlords only see their own properties/tenants
- **Computed Properties**: Dynamic data filtering based on current user
- **No Sensitive Data in URLs**: Using POST-like patterns, not query params
- **Minimal Data Exposure**: Only necessary data sent to components

## Secure Coding Decisions

### Why We Avoided Inline HTML Injection
```javascript
// ❌ DANGEROUS - Avoided
<div v-html="userInput"></div>

// ✅ SAFE - Used instead
<div>{{ userInput }}</div>
```
Vue's template syntax automatically escapes HTML, preventing XSS attacks.

### How We Validated User Input
```javascript
// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!emailRegex.test(email)) throw new Error('Invalid email format')

// Contact validation
if (!/^\d{10,15}$/.test(contact)) throw new Error('Contact must be 10-15 digits')

// Business rule validation
if (property.status === 'Occupied') {
  throw new Error('Property is already occupied')
}
```

### Why We Avoided Exposing Sensitive Data
- **No Passwords in State**: Passwords only used for authentication, not stored in reactive state
- **Role-Based Filtering**: Data filtered before reaching components
- **Computed Properties**: Dynamic filtering prevents data leaks
- **No Console Logs**: Production code has no sensitive data logging

### Access Control Implementation
```javascript
// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

// Store-level filtering
const getProperties = computed(() => {
  if (authStore.currentUser.role === 'admin') return properties.value
  if (authStore.currentUser.role === 'tenant') return properties.value
  return properties.value.filter(p => p.ownerId === authStore.currentUser.id)
})
```

## Security Thinking Process

### Attack Surface Analysis
1. **Login Form**: Validated credentials, no SQL injection (no real DB)
2. **Registration Form**: Email/contact validation, duplicate username check
3. **Property Forms**: Required fields, numeric validation for rent
4. **Booking System**: Status checks prevent double-booking
5. **Data Access**: Role-based filtering at multiple layers

### Defense in Depth
- **Layer 1**: HTML5 form validation
- **Layer 2**: Vue.js automatic escaping
- **Layer 3**: Pinia store validation
- **Layer 4**: Component-level permission checks
- **Layer 5**: Router-level authentication guards

### Principle of Least Privilege
- Tenants: Can only view properties and create booking requests
- Landlords: Can only manage their own properties, tenants, and bookings
- Admins: Full system access for management purposes

## Future Security Enhancements

1. **HTTPS**: Deploy with SSL/TLS certificates
2. **Password Hashing**: Use bcrypt for password storage
3. **JWT Tokens**: Implement token-based authentication
4. **Rate Limiting**: Prevent brute force attacks
5. **CSRF Protection**: Add CSRF tokens to forms
6. **Security Headers**: Implement CSP, X-Frame-Options, etc.
7. **Audit Logging**: Track all security-relevant actions
8. **Two-Factor Authentication**: Add 2FA for sensitive operations

## Compliance Considerations

- **WCAG 3.0**: Accessibility compliance ensures inclusive security
- **Data Privacy**: Minimal data collection, role-based access
- **Input Validation**: Prevents injection attacks and data corruption
- **Error Handling**: No sensitive information in error messages
