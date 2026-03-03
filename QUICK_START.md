# 🚀 Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd Rental-Property-Management-System
npm install
```

### Step 2: Run the Application
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: **http://localhost:5173**

---

## 🎯 First Time User Guide

### Login as Admin
1. Use credentials: `admin` / `admin123`
2. You'll see the dashboard with all system data
3. Try adding a new property, tenant, or payment

### Login as Landlord
1. Use credentials: `landlord1` / `land123`
2. You'll see only your own properties and tenants
3. Notice you cannot see landlord2's data

---

## 📝 Common Tasks

### Add a Property
1. Click "Manage Properties"
2. Click "+ Add Property"
3. Fill in: Name, Address, Rent
4. Click "Add"

### Add a Tenant
1. Click "Manage Tenants"
2. Click "+ Add Tenant"
3. Fill in: Name, Email, Contact, Property
4. Note: Only "Available" properties can be selected
5. Click "Add"
6. Property status automatically changes to "Occupied"

### Record a Payment
1. Click "Manage Payments"
2. Click "+ Add Payment"
3. Select: Tenant, Property
4. Enter: Amount, Date
5. Click "Add"

### Edit/Delete Records
1. Navigate to any management page
2. Click "Edit" to modify a record
3. Click "Delete" to remove (with confirmation)

---

## ⚠️ Testing Validation Rules

### Test Email Validation
- Try entering: `invalidemail` → Error
- Valid format: `user@example.com` → Success

### Test Contact Validation
- Try entering: `123` → Error (too short)
- Valid format: `1234567890` → Success

### Test Occupied Property Rule
- Try assigning tenant to "Ocean View Apt" → Error (already occupied)
- Assign to "Sunset Villa" → Success (available)

### Test Payment Amount
- Try entering: `0` or `-100` → Error
- Valid amount: `1500` → Success

### Test Landlord Access
- Login as landlord1
- You won't see landlord2's properties → Access controlled

---

## 🎨 UI Features

- **Dashboard Stats**: View property, tenant, and payment counts
- **Role Badge**: See your role (admin/landlord) in header
- **Status Indicators**: Green = Available, Orange = Occupied
- **Alert Dialogs**: Success ✓, Error ✕, Warning ⚠, Info ℹ
- **Confirmation Dialogs**: Before deleting any record

---

## 🔧 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing
Try:
```bash
npm cache clean --force
npm install
```

### Page Not Loading
1. Check console for errors
2. Ensure Node.js version is 16+
3. Clear browser cache

---

## 📚 Learn More

- Read `README.md` for full documentation
- Check `VALIDATION_RULES.md` for validation details
- Explore `src/store/index.js` for business logic

---

**Happy Managing! 🏠**
