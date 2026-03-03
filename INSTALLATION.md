# 📦 Installation Instructions

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** (comes with Node.js)

To check if you have Node.js installed:
```bash
node --version
npm --version
```

---

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd Rental-Property-Management-System
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- Vue 3
- Vite
- @vitejs/plugin-vue

**Installation time:** ~1-2 minutes depending on your internet connection

---

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on: **http://localhost:5173**

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

---

## First Login

Once the application is running:

1. Open your browser
2. Navigate to `http://localhost:5173`
3. You'll see the login page

### Try Admin Account
- **Username:** admin
- **Password:** admin123
- **Access:** Full system control

### Try Landlord Account
- **Username:** landlord1
- **Password:** land123
- **Access:** Own properties only

---

## Troubleshooting

### Issue: Port 5173 Already in Use
**Solution:** Run on a different port
```bash
npm run dev -- --port 3000
```

### Issue: npm install fails
**Solution:** Clear cache and retry
```bash
npm cache clean --force
npm install
```

### Issue: Module not found errors
**Solution:** Delete node_modules and reinstall
```bash
rmdir /s /q node_modules
npm install
```

### Issue: Vite not found
**Solution:** Install Vite globally
```bash
npm install -g vite
```

---

## Verify Installation

After installation, check that these files exist:
- ✅ `node_modules/` folder (created after npm install)
- ✅ `package-lock.json` (created after npm install)
- ✅ All source files in `src/` folder

---

## Next Steps

After successful installation:

1. ✅ Read `QUICK_START.md` for usage guide
2. ✅ Read `README.md` for full documentation
3. ✅ Check `VALIDATION_RULES.md` for validation details
4. ✅ Review `FEATURES_CHECKLIST.md` for feature list

---

## System Requirements

- **OS:** Windows, macOS, or Linux
- **RAM:** 2GB minimum
- **Disk Space:** 500MB for project + dependencies
- **Browser:** Modern browser (Chrome, Firefox, Safari, Edge)

---

## Development Tools (Optional)

Recommended for development:
- **VS Code** with Vue extension
- **Vue DevTools** browser extension
- **Git** for version control

---

## Quick Command Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Success Indicators

You'll know installation was successful when:
- ✅ No error messages during `npm install`
- ✅ `node_modules/` folder is created
- ✅ `npm run dev` starts without errors
- ✅ Browser opens and shows login page
- ✅ You can login with demo accounts

---

## Getting Help

If you encounter issues:
1. Check the error message carefully
2. Review this installation guide
3. Check Node.js and npm versions
4. Ensure all files are present
5. Try clearing cache and reinstalling

---

**Installation complete! You're ready to start managing properties!** 🎉
