# 📐 Visual Layout Guide

## Application Structure Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PROPERTY RENTAL MANAGEMENT SYSTEM                 │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────────────────────┐
│              │                                                      │
│   SIDEBAR    │              MAIN CONTENT AREA                       │
│              │                                                      │
│  Navigation  │         (Dashboard or Management Views)              │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## Detailed Dashboard Layout

```
┌──────────────┬──────────────────────────────────────────────────────┐
│              │  ┌────────────────────────────────────────────────┐  │
│   ┌─────┐    │  │  Dashboard                                     │  │
│   │ PRS │ ☰  │  │  Overview of your rental business              │  │
│   └─────┘    │  └────────────────────────────────────────────────┘  │
│              │                                                      │
│ ┌──────────┐ │  ┌────────────────────────────────────────────────┐  │
│ │📊Dashboard│ │  │  Welcome back, John! 👋                        │  │
│ └──────────┘ │  │  Here's what's happening with your properties  │  │
│              │  │                          [+ Add Property]       │  │
│ ┌──────────┐ │  └────────────────────────────────────────────────┘  │
│ │🏠Properties│ │                                                      │
│ └──────────┘ │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│              │  │  🏠  │ │  👥  │ │  💳  │ │  📈  │              │
│ ┌──────────┐ │  │  12  │ │   8  │ │ $$$  │ │ $$$  │              │
│ │👥 Tenants │ │  │Props │ │Tenant│ │Total │ │Month │              │
│ └──────────┘ │  └──────┘ └──────┘ └──────┘ └──────┘              │
│              │                                                      │
│ ┌──────────┐ │  ┌─────────────────┐ ┌─────────────────┐          │
│ │💳 Payments│ │  │ Recent Props    │ │ Quick Info      │          │
│ └──────────┘ │  │                 │ │                 │          │
│              │  │ • Property A    │ │ ✓ System OK     │          │
│ ┌──────────┐ │  │ • Property B    │ │ ℹ Role Access   │          │
│ │👤 Users   │ │  │ • Property C    │ │ ! WCAG 3.0      │          │
│ └──────────┘ │  └─────────────────┘ └─────────────────┘          │
│              │                                                      │
│ ┌──────────┐ │                                                      │
│ │   JD     │ │                                                      │
│ │John Doe  │ │                                                      │
│ │landlord  │ │                                                      │
│ └──────────┘ │                                                      │
│              │                                                      │
│ [🚪 Logout] │                                                      │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## Property Management View

```
┌──────────────┬──────────────────────────────────────────────────────┐
│              │  ┌────────────────────────────────────────────────┐  │
│   SIDEBAR    │  │  Property Management                           │  │
│   (Same as   │  │  Manage your property portfolio                │  │
│   Dashboard) │  └────────────────────────────────────────────────┘  │
│              │                                                      │
│              │  ┌────────────────────────────────────────────────┐  │
│              │  │  ← Back to Dashboard      [+ Add Property]     │  │
│              │  └────────────────────────────────────────────────┘  │
│              │                                                      │
│              │  ┌────────────────────────────────────────────────┐  │
│              │  │ ID │ NAME    │ ADDRESS  │ RENT │ STATUS │ ACT │  │
│              │  ├────┼─────────┼──────────┼──────┼────────┼─────┤  │
│              │  │ 1  │ Villa A │ 123 Main │ $$$  │ ●●●●   │ E D │  │
│              │  │ 2  │ Apt B   │ 456 Oak  │ $$$  │ ●●●●   │ E D │  │
│              │  │ 3  │ Loft C  │ 789 Pine │ $$$  │ ●●●●   │E D A│  │
│              │  └────────────────────────────────────────────────┘  │
│              │                                                      │
│              │  Legend:                                             │
│              │  E = Edit   D = Delete   A = Assign Tenant          │
│              │  ●●●● Available (Green)  ●●●● Occupied (Orange)     │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## Modal Form (Add/Edit Property)

```
                    ┌─────────────────────────────┐
                    │  Add Property          [×]  │
                    ├─────────────────────────────┤
                    │                             │
                    │  Property Name *            │
                    │  ┌─────────────────────┐    │
                    │  │ Sunset Villa        │    │
                    │  └─────────────────────┘    │
                    │                             │
                    │  Address *                  │
                    │  ┌─────────────────────┐    │
                    │  │ 123 Main Street     │    │
                    │  └─────────────────────┘    │
                    │                             │
                    │  Monthly Rent *             │
                    │  ┌─────────────────────┐    │
                    │  │ 1500                │    │
                    │  └─────────────────────┘    │
                    │                             │
                    ├─────────────────────────────┤
                    │  [  Cancel  ]  [   Add   ]  │
                    └─────────────────────────────┘
```

---

## Tenant Assignment Flow

### Step 1: Property List with Available Property
```
┌────────────────────────────────────────────────────────┐
│ ID │ NAME         │ STATUS      │ ACTIONS              │
├────┼──────────────┼─────────────┼──────────────────────┤
│ 1  │ Sunset Villa │ ●●●● Avail. │ [Edit] [Delete] [Assign]│
└────────────────────────────────────────────────────────┘
                                        ↓ Click
```

### Step 2: Tenant Assignment Modal
```
                    ┌─────────────────────────────┐
                    │  Assign Tenant to           │
                    │  Sunset Villa          [×]  │
                    ├─────────────────────────────┤
                    │                             │
                    │  Tenant Name *              │
                    │  ┌─────────────────────┐    │
                    │  │ Alice Smith         │    │
                    │  └─────────────────────┘    │
                    │                             │
                    │  Email *                    │
                    │  ┌─────────────────────┐    │
                    │  │ alice@email.com     │    │
                    │  └─────────────────────┘    │
                    │                             │
                    │  Contact *                  │
                    │  ┌─────────────────────┐    │
                    │  │ 1234567890          │    │
                    │  └─────────────────────┘    │
                    │                             │
                    ├─────────────────────────────┤
                    │  [Cancel] [Assign Tenant]   │
                    └─────────────────────────────┘
```

### Step 3: Updated Property Status
```
┌────────────────────────────────────────────────────────┐
│ ID │ NAME         │ STATUS      │ ACTIONS              │
├────┼──────────────┼─────────────┼──────────────────────┤
│ 1  │ Sunset Villa │ ●●●● Occup. │ [Edit] [Delete]      │
└────────────────────────────────────────────────────────┘
                    Status changed to Occupied!
                    Assign button removed
```

---

## User Management View (Admin Only)

```
┌──────────────┬──────────────────────────────────────────────────────┐
│              │  ┌────────────────────────────────────────────────┐  │
│   SIDEBAR    │  │  User Management                               │  │
│              │  │  Manage system users and landlords             │  │
│ ┌──────────┐ │  └────────────────────────────────────────────────┘  │
│ │📊Dashboard│ │                                                      │
│ └──────────┘ │  ┌────────────────────────────────────────────────┐  │
│              │  │  ← Back to Dashboard      [+ Add Landlord]     │  │
│ ┌──────────┐ │  └────────────────────────────────────────────────┘  │
│ │🏠Properties│ │                                                      │
│ └──────────┘ │  ┌────────────────────────────────────────────────┐  │
│              │  │ ID │ NAME      │ USERNAME  │ ROLE │ ACTIONS   │  │
│ ┌──────────┐ │  ├────┼───────────┼───────────┼──────┼───────────┤  │
│ │👥 Tenants │ │  │ 2  │ John Doe  │ landlord1 │ ●●●● │ [E] [D]  │  │
│ └──────────┘ │  │ 3  │ Jane Smith│ landlord2 │ ●●●● │ [E] [D]  │  │
│              │  └────────────────────────────────────────────────┘  │
│ ┌──────────┐ │                                                      │
│ │💳 Payments│ │  Note: Admin user cannot be edited or deleted      │
│ └──────────┘ │                                                      │
│              │                                                      │
│ ┌──────────┐ │                                                      │
│ │👤 Users   │ ← Admin Only                                         │
│ └──────────┘ │                                                      │
│              │                                                      │
└──────────────┴──────────────────────────────────────────────────────┘
```

---

## Responsive Mobile View

```
┌─────────────────────────┐
│  ☰  PRS      [Profile]  │  ← Hamburger menu
├─────────────────────────┤
│                         │
│  Dashboard              │
│  Overview               │
│                         │
│  ┌─────────────────┐    │
│  │ Welcome, John!  │    │
│  │ [+ Add Property]│    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │  Stats stack
│  │  🏠  12 Props   │    │  vertically
│  └─────────────────┘    │
│  ┌─────────────────┐    │
│  │  👥  8 Tenants  │    │
│  └─────────────────┘    │
│  ┌─────────────────┐    │
│  │  💳  $12,000    │    │
│  └─────────────────┘    │
│  ┌─────────────────┐    │
│  │  📈  $15,000    │    │
│  └─────────────────┘    │
│                         │
│  Recent Properties      │
│  • Property A           │
│  • Property B           │
│                         │
└─────────────────────────┘
```

---

## Navigation Flow Diagram

```
                    ┌─────────────┐
                    │   LOGIN     │
                    └──────┬──────┘
                           │
                           ↓
                    ┌─────────────┐
                    │  DASHBOARD  │ ← Default landing page
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┬──────────────┐
        │                  │                  │              │
        ↓                  ↓                  ↓              ↓
┌───────────────┐  ┌───────────────┐  ┌──────────────┐  ┌─────────┐
│  PROPERTIES   │  │    TENANTS    │  │   PAYMENTS   │  │  USERS  │
│               │  │               │  │              │  │ (Admin) │
│ • View List   │  │ • View List   │  │ • View List  │  │         │
│ • Add New     │  │ • Add New     │  │ • Add New    │  │• Add    │
│ • Edit        │  │ • Edit        │  │ • Edit       │  │• Edit   │
│ • Delete      │  │ • Delete      │  │ • Delete     │  │• Delete │
│ • Assign      │  │               │  │              │  │         │
│   Tenant      │  │               │  │              │  │         │
└───────┬───────┘  └───────┬───────┘  └──────┬───────┘  └────┬────┘
        │                  │                  │              │
        └──────────────────┴──────────────────┴──────────────┘
                           │
                           ↓
                    [Back to Dashboard]
                           │
                           ↓
                    ┌─────────────┐
                    │   LOGOUT    │
                    └─────────────┘
```

---

## Color Legend

```
┌─────────────────────────────────────────────────────────┐
│  COLOR CODING SYSTEM                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🔵 BLUE (#4f46e5)                                      │
│     • Primary actions (Add, Submit)                     │
│     • Active navigation items                           │
│     • Links and interactive elements                    │
│                                                         │
│  🟢 GREEN (#22c55e)                                     │
│     • Success messages                                  │
│     • Available status                                  │
│     • Positive indicators                               │
│                                                         │
│  🟠 ORANGE (#f59e0b)                                    │
│     • Warning messages                                  │
│     • Occupied status                                   │
│     • Admin-only features                               │
│                                                         │
│  🔴 RED (#ef4444)                                       │
│     • Error messages                                    │
│     • Delete actions                                    │
│     • Critical alerts                                   │
│                                                         │
│  ⚪ GRAY (#6b7280)                                      │
│     • Secondary text                                    │
│     • Borders and dividers                              │
│     • Disabled states                                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Accessibility Features Visualization

```
┌─────────────────────────────────────────────────────────┐
│  ACCESSIBILITY FEATURES                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ⌨️  KEYBOARD NAVIGATION                                │
│     Tab → Next element                                  │
│     Shift+Tab → Previous element                        │
│     Enter → Activate button/link                        │
│     Esc → Close modal                                   │
│     Arrow keys → Navigate lists                         │
│                                                         │
│  👁️  VISUAL INDICATORS                                  │
│     ┌─────────────┐                                     │
│     │   Button    │ ← 2px blue outline on focus        │
│     └─────────────┘                                     │
│                                                         │
│  🔊 SCREEN READER SUPPORT                               │
│     • Semantic HTML (nav, main, article)                │
│     • ARIA labels on icon buttons                       │
│     • ARIA current for active page                      │
│     • Descriptive link text                             │
│                                                         │
│  📏 CONTRAST RATIOS                                     │
│     Text on Background: 7:1 (WCAG AAA)                  │
│     Large Text: 4.5:1 (WCAG AAA)                        │
│     Interactive Elements: 3:1 minimum                   │
│                                                         │
│  👆 TOUCH TARGETS                                       │
│     Minimum size: 44×44 pixels                          │
│     Adequate spacing between elements                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Status Badge Examples

```
Available Property:  ┌──────────────┐
                     │ ● Available  │  ← Green background
                     └──────────────┘

Occupied Property:   ┌──────────────┐
                     │ ● Occupied   │  ← Orange background
                     └──────────────┘

User Role:           ┌──────────────┐
                     │ ● Landlord   │  ← Blue background
                     └──────────────┘
```

---

## Button States

```
Normal State:     ┌──────────────┐
                  │  Add Property │  ← Blue background
                  └──────────────┘

Hover State:      ┌──────────────┐
                  │  Add Property │  ← Darker blue + lift
                  └──────────────┘
                        ↑ 2px

Focus State:      ┌──────────────┐
                  ║  Add Property ║  ← 2px outline
                  └──────────────┘

Disabled State:   ┌──────────────┐
                  │  Add Property │  ← Gray, no pointer
                  └──────────────┘
```

---

**This visual guide helps understand the layout and navigation structure of the application** 📐
