# Quick Git Setup for Presentation

## Initial Setup (Do This First)

```bash
# 1. Initialize Git repository
git init

# 2. Create .gitignore
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo ".env" >> .gitignore

# 3. Create main branch
git checkout -b main

# 4. Initial commit
git add .
git commit -m "chore: initial project setup with Vue 3, Vite, and base structure"

# 5. Create develop branch
git checkout -b develop
```

## Create Feature Branches

```bash
# Feature 1: Authentication
git checkout -b feature/auth
# ... make changes ...
git add src/stores/auth.js src/views/Login.vue
git commit -m "feat: implement authentication store with login and tenant registration"
git add src/router/index.js
git commit -m "feat: add route guards for authentication protection"
git checkout develop
git merge feature/auth
git branch -d feature/auth

# Feature 2: Pinia Integration
git checkout -b feature/pinia-integration
# ... make changes ...
git add src/stores/
git commit -m "feat: migrate state management to Pinia stores"
git add src/main.js
git commit -m "feat: integrate Pinia into application"
git checkout develop
git merge feature/pinia-integration
git branch -d feature/pinia-integration

# Feature 3: Vue Router
git checkout -b feature/vue-router
# ... make changes ...
git add src/router/
git commit -m "feat: implement Vue Router with protected routes"
git add src/App.vue
git commit -m "refactor: update App.vue to use router-view"
git checkout develop
git merge feature/vue-router
git branch -d feature/vue-router

# Feature 4: Tenant Role
git checkout -b feature/tenant-role
# ... make changes ...
git add src/views/TenantView.vue
git commit -m "feat: create tenant view for property browsing with images"
git add src/stores/auth.js
git commit -m "feat: add tenant registration functionality"
git checkout develop
git merge feature/tenant-role
git branch -d feature/tenant-role

# Feature 5: Booking System
git checkout -b feature/booking-system
# ... make changes ...
git add src/stores/property.js
git commit -m "feat: implement booking request system in property store"
git add src/views/BookingManagement.vue
git commit -m "feat: create booking management view for landlords"
git checkout develop
git merge feature/booking-system
git branch -d feature/booking-system

# Feature 6: UI Enhancements
git checkout -b feature/ui-enhancements
# ... make changes ...
git add src/views/Dashboard.vue
git commit -m "style: apply purple gradient theme to sidebar navigation"
git add src/views/PropertyManagement.vue
git commit -m "style: add color-coded buttons and status badges"
git checkout develop
git merge feature/ui-enhancements
git branch -d feature/ui-enhancements

# Feature 7: Documentation
git checkout -b feature/documentation
git add SECURITY.md
git commit -m "docs: add comprehensive security and threat modeling documentation"
git add GIT_WORKFLOW.md
git commit -m "docs: create Git workflow guide with examples"
git add TECHNICAL_COMPLIANCE.md
git commit -m "docs: document technical requirements compliance"
git checkout develop
git merge feature/documentation
git branch -d feature/documentation
```

## Push to GitHub/GitLab

```bash
# 1. Create repository on GitHub/GitLab
# Name: Rental-Property-Management-System

# 2. Add remote
git remote add origin https://github.com/YOUR_USERNAME/Rental-Property-Management-System.git

# 3. Push main branch
git checkout main
git merge develop
git push -u origin main

# 4. Push develop branch
git checkout develop
git push -u origin develop

# 5. Create tags for releases
git tag -a v1.0.0 -m "Release v1.0.0: Complete rental management system with tenant booking"
git push origin v1.0.0
```

## Demonstrate During Presentation

### 1. Show Commit History
```bash
# Beautiful graph view
git log --oneline --graph --all --decorate

# Detailed view
git log --pretty=format:"%h - %an, %ar : %s"

# Show specific feature branch
git log --oneline feature/tenant-role
```

### 2. Show Branches
```bash
# List all branches
git branch -a

# Show branch structure
git log --graph --oneline --all
```

### 3. Show Commit Details
```bash
# Show specific commit
git show <commit-hash>

# Show file changes
git diff <commit-hash>^!
```

### 4. Show Merge History
```bash
# Show all merges
git log --merges --oneline

# Show merge details
git show <merge-commit-hash>
```

### 5. Show Remote Repository
```bash
# Show remote URL
git remote -v

# Show remote branches
git branch -r
```

## Simulating Conflict Resolution

```bash
# Create conflict scenario
git checkout -b feature/conflict-demo
# Edit same file in different way
git add .
git commit -m "feat: modify property validation"

git checkout develop
# Edit same file differently
git add .
git commit -m "feat: update property validation rules"

# Try to merge - conflict occurs
git merge feature/conflict-demo

# Resolve conflict in file
# Remove conflict markers
# Keep desired changes

git add <resolved-file>
git commit -m "merge: resolve property validation conflicts"
git branch -d feature/conflict-demo
```

## Pull Request Demonstration

### On GitHub/GitLab:

1. **Create Pull Request**
   - Go to repository
   - Click "New Pull Request"
   - Base: `develop`, Compare: `feature/tenant-role`
   - Title: "Add Tenant Role and Booking System"
   - Description: Detailed changes
   - Assign reviewers

2. **Review Process**
   - Code review comments
   - Request changes if needed
   - Approve when ready

3. **Merge Pull Request**
   - Click "Merge Pull Request"
   - Choose merge strategy
   - Delete branch after merge

## Presentation Script

### Opening
"I'll now demonstrate my Git workflow for this project."

### Show Repository
```bash
# Show we're in a Git repository
git status

# Show remote connection
git remote -v
```

### Show Commit History
```bash
# Show beautiful commit history
git log --oneline --graph --all --decorate
```

**Say:** "As you can see, I have clear, descriptive commit messages following the conventional commits format. No generic 'update' or 'fix' messages."

### Show Feature Branches
```bash
# List branches
git branch -a
```

**Say:** "I used feature branches for each major functionality: authentication, Pinia integration, Vue Router, tenant role, booking system, and UI enhancements."

### Show Specific Feature
```bash
# Show tenant role feature commits
git log --oneline --grep="tenant"
```

**Say:** "Here are the commits related to the tenant role feature, showing incremental development."

### Show Merge Process
```bash
# Show merge commits
git log --merges --oneline
```

**Say:** "Each feature was merged into develop through a proper merge process, maintaining a clean history."

### Show GitHub/GitLab
**Say:** "And here's the repository on GitHub/GitLab with all branches, pull requests, and commit history visible."

### Show Conflict Resolution (if applicable)
```bash
# Show resolved merge commit
git show <merge-commit-hash>
```

**Say:** "Here's an example where I resolved merge conflicts between two features."

## Quick Commands Reference

```bash
# View history
git log --oneline --graph --all

# View specific file history
git log --follow <file>

# View changes
git diff

# View branches
git branch -a

# View remote
git remote -v

# View tags
git tag

# View specific commit
git show <hash>

# Search commits
git log --grep="keyword"

# Show who changed what
git blame <file>
```

## Tips for Presentation

1. **Prepare beforehand**: Have terminal ready with repository open
2. **Use aliases**: Set up git aliases for common commands
3. **Clean terminal**: Clear screen before demonstrating
4. **Explain as you go**: Don't just show, explain why
5. **Have backup**: Screenshots of GitHub/GitLab ready
6. **Practice**: Run through demonstration before presentation

## Common Questions & Answers

**Q: Why did you use feature branches?**
A: To isolate features, enable parallel development, and maintain a clean main branch.

**Q: How did you handle conflicts?**
A: I resolved them manually by reviewing both changes and keeping the correct implementation.

**Q: Why Pinia instead of Vuex?**
A: Pinia is the official state management for Vue 3, with better TypeScript support and simpler API.

**Q: How do you ensure code quality?**
A: Through code reviews, pull requests, validation, and following Vue.js best practices.
