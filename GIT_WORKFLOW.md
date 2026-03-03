# Git Workflow Guide

## Repository Setup

```bash
# Initialize repository
git init

# Add remote repository
git remote add origin <your-github-url>

# Create .gitignore
echo "node_modules/" > .gitignore
echo "dist/" >> .gitignore
echo ".DS_Store" >> .gitignore
```

## Branch Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Integration branch for features

### Feature Branches
- `feature/auth` - Authentication and registration
- `feature/dashboard` - Dashboard implementation
- `feature/property-management` - Property CRUD operations
- `feature/tenant-role` - Tenant user role and booking system
- `feature/booking-system` - Booking request management
- `feature/pinia-integration` - State management with Pinia
- `feature/vue-router` - Routing implementation
- `feature/ui-enhancements` - UI/UX improvements

## Workflow Example

### 1. Create Feature Branch
```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/auth
```

### 2. Make Changes with Clear Commits
```bash
# Add authentication store
git add src/stores/auth.js
git commit -m "feat: implement authentication store with login and registration"

# Add login component
git add src/views/Login.vue
git commit -m "feat: create login component with tenant registration"

# Add route guards
git add src/router/index.js
git commit -m "feat: add route guards for authentication protection"
```

### 3. Push Feature Branch
```bash
git push origin feature/auth
```

### 4. Create Pull Request
- Go to GitHub/GitLab
- Create Pull Request from `feature/auth` to `develop`
- Add description of changes
- Request code review
- Merge after approval

### 5. Merge to Develop
```bash
git checkout develop
git merge feature/auth
git push origin develop
```

### 6. Delete Feature Branch
```bash
git branch -d feature/auth
git push origin --delete feature/auth
```

## Commit Message Convention

### Format
```
<type>: <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

### Examples
```bash
# Good commit messages
git commit -m "feat: add tenant booking request functionality"
git commit -m "fix: resolve property status update bug"
git commit -m "docs: update security documentation"
git commit -m "style: apply purple gradient to sidebar"
git commit -m "refactor: migrate from reactive store to Pinia"

# Bad commit messages (AVOID)
git commit -m "update"
git commit -m "fix"
git commit -m "test"
git commit -m "changes"
```

## Handling Merge Conflicts

### When Conflicts Occur
```bash
# Pull latest changes
git pull origin develop

# Conflicts will be marked in files
# Open conflicted files and resolve manually

# After resolving
git add <resolved-files>
git commit -m "merge: resolve conflicts from develop branch"
git push origin feature/your-feature
```

### Conflict Example
```javascript
<<<<<<< HEAD
const user = authStore.currentUser
=======
const user = store.state.currentUser
>>>>>>> develop
```

Resolve to:
```javascript
const user = authStore.currentUser
```

## Pull & Push Workflow

### Before Starting Work
```bash
# Always pull latest changes
git checkout develop
git pull origin develop

# Create/switch to feature branch
git checkout -b feature/new-feature
```

### During Development
```bash
# Commit frequently with clear messages
git add .
git commit -m "feat: implement property image upload"

# Push to remote regularly
git push origin feature/new-feature
```

### Before Merging
```bash
# Update from develop
git checkout develop
git pull origin develop

# Rebase feature branch
git checkout feature/new-feature
git rebase develop

# Resolve any conflicts
# Push updated branch
git push origin feature/new-feature --force-with-lease
```

## Demonstration Checklist

### Local Commits History
```bash
# View commit history
git log --oneline --graph --all

# View specific branch history
git log --oneline feature/auth
```

### Clear Commit Messages
```bash
# View commit messages
git log --pretty=format:"%h - %s (%an, %ar)"
```

### Feature Branches
```bash
# List all branches
git branch -a

# Show branch structure
git log --graph --oneline --all --decorate
```

### Merge Process
```bash
# Show merge commits
git log --merges

# Show merge details
git show <merge-commit-hash>
```

### Pull & Push Workflow
```bash
# Show remote tracking
git remote -v

# Show push/pull history
git reflog
```

### Conflict Resolution
```bash
# Show resolved conflicts
git log --grep="merge"
```

## GitHub/GitLab Setup

### Create Repository
1. Go to GitHub/GitLab
2. Click "New Repository"
3. Name: "Rental-Property-Management-System"
4. Make it public or private
5. Don't initialize with README (we have one)

### Push Existing Repository
```bash
git remote add origin https://github.com/username/Rental-Property-Management-System.git
git branch -M main
git push -u origin main
git push origin develop
```

### Create Pull Request
1. Push feature branch
2. Go to repository on GitHub/GitLab
3. Click "New Pull Request"
4. Select base: `develop`, compare: `feature/your-feature`
5. Add title and description
6. Assign reviewers
7. Create pull request
8. Merge after approval

## Best Practices

1. **Commit Often**: Small, focused commits are better than large ones
2. **Clear Messages**: Describe what and why, not how
3. **Pull Before Push**: Always pull latest changes before pushing
4. **Feature Branches**: Never commit directly to main or develop
5. **Code Review**: Always create pull requests for review
6. **Resolve Conflicts**: Handle conflicts immediately
7. **Clean History**: Use rebase for cleaner history
8. **Tag Releases**: Tag important milestones

## Example Complete Workflow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/tenant-role

# 2. Implement feature
# ... make changes ...
git add src/views/TenantView.vue
git commit -m "feat: create tenant view for property browsing"

git add src/stores/property.js
git commit -m "feat: add booking request system to property store"

# 3. Keep updated with develop
git checkout develop
git pull origin develop
git checkout feature/tenant-role
git rebase develop

# 4. Push feature branch
git push origin feature/tenant-role

# 5. Create Pull Request on GitHub/GitLab
# ... create PR ...

# 6. After approval, merge
git checkout develop
git merge feature/tenant-role
git push origin develop

# 7. Clean up
git branch -d feature/tenant-role
git push origin --delete feature/tenant-role

# 8. Tag release
git tag -a v1.0.0 -m "Release version 1.0.0 with tenant role"
git push origin v1.0.0
```

## Troubleshooting

### Undo Last Commit
```bash
git reset --soft HEAD~1
```

### Discard Local Changes
```bash
git checkout -- <file>
git reset --hard HEAD
```

### View File History
```bash
git log --follow <file>
```

### Compare Branches
```bash
git diff develop..feature/auth
```

### Stash Changes
```bash
git stash
git stash pop
```
