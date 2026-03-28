# MACAS — Multi-Agent Content Automation System

A React + Vite + Tailwind CSS + Supabase frontend for orchestrating multi-agent AI content workflows.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase project credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these in your [Supabase dashboard](https://supabase.com/dashboard) under **Project Settings → API**.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── AuthBrand.jsx       # Left panel on auth pages
│   ├── ProtectedRoute.jsx  # Auth guard for private routes
│   ├── Spinner.jsx         # Loading spinner
│   ├── StatusBadge.jsx     # Workflow/agent status badge
│   └── TopBar.jsx          # App header + nav tabs
├── context/
│   └── AuthContext.jsx     # Global auth state + helpers
├── hooks/
│   └── useWorkflows.js     # Data hook (swap mock → Supabase)
├── lib/
│   ├── mockData.js         # Mock workflows, agents, logs
│   └── supabaseClient.js   # Supabase client initialisation
├── pages/
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── Dashboard.jsx
│   ├── CreatePage.jsx
│   ├── WorkflowPage.jsx    # 3-panel workflow UI
│   └── ProfilePage.jsx
├── App.jsx                 # Route definitions
├── main.jsx                # React entry point
└── index.css               # Tailwind + global styles
```

---

## 🔐 Auth Flow

- **Signup** → `supabase.auth.signUp` → redirect to `/dashboard`
- **Login** → `supabase.auth.signInWithPassword` → redirect to `/dashboard`
- **Logout** → `supabase.auth.signOut` → redirect to `/login`
- **Protected routes** → `ProtectedRoute` component redirects unauthenticated users to `/login`
- Session persistence is handled automatically by the Supabase JS client.

> **Email confirmation**: If your Supabase project has email confirmation enabled, users will need to verify their email before they can log in. The signup page handles this case and shows a message.

---

## 📄 Pages

| Route            | Page            | Protected |
|------------------|-----------------|-----------|
| `/login`         | Login           | ✗         |
| `/signup`        | Signup          | ✗         |
| `/dashboard`     | Dashboard       | ✓         |
| `/create`        | Create Workflow | ✓         |
| `/workflow/:id`  | Workflow View   | ✓         |
| `/profile`       | Profile         | ✓         |

---

## 🔌 Wiring to a Real Backend

### Workflows (Supabase DB)

In `src/hooks/useWorkflows.js`, replace the mock data with a real Supabase query:

```js
import { supabase } from '../lib/supabaseClient'

const { data, error } = await supabase
  .from('workflows')
  .select('*')
  .order('created_at', { ascending: false })
```

### Create Workflow API

In `src/pages/CreatePage.jsx`, replace the mock timeout with a real POST:

```js
const res = await fetch('/api/workflows', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
})
const { id } = await res.json()
navigate(`/workflow/${id}`)
```

### Real-time Agent Updates

Use Supabase Realtime to push agent status updates to the workflow page:

```js
supabase
  .channel('workflow-' + id)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'agents' }, payload => {
    // update agent state
  })
  .subscribe()
```

---

## 🏗 Build for Production

```bash
npm run build
```

Output is in `dist/`. Deploy to Vercel, Netlify, or any static host.

---

## 🎨 Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **React Router v6**
- **Supabase JS v2** (Auth + Database)
