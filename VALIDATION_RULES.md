# 📋 Validation Rules Reference

## Business Validation Rules

### 1. Property Owner Requirement
**Rule:** A property cannot be added without the owner's ID.
**Implementation:** `validatePropertyOwner(ownerId)`
**Error Message:** "Property cannot be added without owner ID"
**Location:** Property creation

### 2. Occupied Property Check
**Rule:** A tenant cannot be assigned to an occupied property.
**Implementation:** `validateTenantAssignment(propertyId)`
**Error Message:** "Tenant cannot be assigned to an occupied property"
**Location:** Tenant creation

### 3. Payment Amount Validation
**Rule:** Payment amount must be greater than zero.
**Implementation:** `validatePaymentAmount(amount)`
**Error Message:** "Payment amount must be greater than zero"
**Location:** Payment creation/update

### 4. Landlord Access Control
**Rule:** A landlord can only access or modify their own records.
**Implementation:** `validateLandlordAccess(resourceOwnerId, currentUserId)`
**Error Message:** "Landlord can only access their own records"
**Location:** All update/delete operations

### 5. Automatic Status Update
**Rule:** Property status automatically updates to "Occupied" when a tenant moves in.
**Implementation:** `updatePropertyStatus(propertyId, status)`
**Behavior:** Status changes from "Available" to "Occupied" on tenant assignment
**Location:** Tenant creation

---

## Technical Validation Rules

### 1. Email Format Validation
**Rule:** Email must follow a valid format.
**Implementation:** `validateEmail(email)`
**Pattern:** `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
**Error Message:** "Email must follow a valid format"
**Location:** Tenant creation/update

### 2. Contact Number Validation
**Rule:** Contact must be numeric and have valid length (10-15 digits).
**Implementation:** `validateContact(contact)`
**Pattern:** `/^\d{10,15}$/`
**Error Message:** "Contact must be numeric and 10-15 digits"
**Location:** Tenant creation/update

### 3. Required Field Validation
**Rule:** Required fields (name, amount, property, etc.) must not be empty.
**Implementation:** `validateRequired(value, fieldName)`
**Error Message:** "{fieldName} is required"
**Location:** All forms

### 4. Unique Username Validation
**Rule:** No duplicate usernames allowed.
**Implementation:** `validateUniqueUsername(username, excludeId)`
**Error Message:** "Username already exists"
**Location:** User creation/update

### 5. Date Format Validation
**Rule:** Date fields must contain proper date formats.
**Implementation:** `validateDate(date)`
**Error Message:** "Invalid date format"
**Location:** Payment creation/update

---

## Validation Flow

```
User Input → Form Validation → Business Rules → Technical Rules → Database Operation
                    ↓                ↓                ↓
                  Error          Error            Error
                    ↓                ↓                ↓
              Alert Dialog    Alert Dialog    Alert Dialog
```

## Testing Validation Rules

### Test Business Rule #2 (Occupied Property)
1. Login as landlord1
2. Try to assign a new tenant to "Ocean View Apt" (already occupied)
3. Expected: Error message "Tenant cannot be assigned to an occupied property"

### Test Technical Rule #1 (Email Format)
1. Add a new tenant
2. Enter invalid email: "notanemail"
3. Expected: Error message "Email must follow a valid format"

### Test Technical Rule #2 (Contact Validation)
1. Add a new tenant
2. Enter contact: "123" (too short)
3. Expected: Error message "Contact must be numeric and 10-15 digits"

### Test Business Rule #4 (Landlord Access)
1. Login as landlord1
2. Try to edit/delete landlord2's property
3. Expected: Property not visible in list (filtered by role)

### Test Business Rule #3 (Payment Amount)
1. Add a new payment
2. Enter amount: 0 or negative
3. Expected: Error message "Payment amount must be greater than zero"

---

## Code Location

All validation rules are implemented in:
`src/store/index.js` → `validators` object

Each CRUD operation calls appropriate validators before executing.
