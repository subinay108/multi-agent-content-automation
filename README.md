# Multi-Agent Content Automation System (Frontend)

This is the **React + Vite** frontend for the Multi-Agent Content Automation System. It provides a sleek, modern dashboard for orchestrating AI agents in various content workflows.

---

## 🛠️ Prerequisites

Before you start, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) project (refer to [supabase.md](./supabase.md) for table setup)

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.example .env
```

Edit your `.env` file with your Supabase credentials:

```bash
# src/lib/supabaseClient.js reads these
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 🔗 Connecting to the Backend

The frontend is designed to work in tandem with a **FastAPI backend** that handles the actual agent execution. 

> [!IMPORTANT]
> To enable real-world workflow automation, you **must** also set up the backend. Follow the instructions in [backend/README.md](./backend/README.md).

---

## 📁 Frontend structure

```text
src/
├── components/         # Reusable UI components (Shared layout, TopBar, etc)
├── context/            # AuthContext for global user state
├── hooks/              # Custom React hooks (useWorkflows, etc)
├── lib/                # Config files (supabaseClient) and mock data
├── pages/              # Application pages (Dashboard, WorkflowPage, Auth)
├── App.jsx             # React Router routing
├── main.jsx            # React root entry point
└── index.css           # Styling with Tailwind CSS and custom tokens
```

---

## 🔐 Auth Flow

- **Signup** → `supabase.auth.signUp`
- **Login** → `supabase.auth.signInWithPassword`
- **Protected Routes** → `ProtectedRoute` component ensures only authenticated users access the dashboard.
- Sessions are persisted automatically via the Supabase guest client.

---

## 🎨 Tech Stack

- **Framework**: React 18 + Vite 5
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **Database/Auth**: Supabase JS v2
- **Markdown**: React-Markdown (for displaying agent outputs)

---

## 🏗 Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be deployed to platforms like Vercel or Netlify.
