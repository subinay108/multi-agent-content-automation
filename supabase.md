# Supabase Setup Guide

This guide provides instructions on how to set up your Supabase project for the Multi-Agent Content Automation System.

---

## 🏗️ 1. Create a New Project

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard/projects).
2. Click **New Project** and select your organization.
3. Fill in the project details (Name, Database Password, Region).
4. Wait for the database to be provisioned.

---

## 📊 2. Database Schema (SQL)

Go to the **SQL Editor** in the Supabase Dashboard and run the following commands to create the required tables.

### 2.1 Create Tables

```sql
-- 1. Workflows table
CREATE TABLE IF NOT EXISTS public.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    type TEXT,
    audience TEXT,
    tone TEXT,
    status TEXT DEFAULT 'in_progress',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Workflow Steps table
CREATE TABLE IF NOT EXISTS public.workflow_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    input TEXT,
    output TEXT,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMPTZDEFAULT now()
);

-- 3. Logs table
CREATE TABLE IF NOT EXISTS public.logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT now()
);
```

### 2.2 Configure Row Level Security (RLS)

To ensure users can only see their own data, enable RLS on the tables:

```sql
-- Enable RLS
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

-- Policies for Workflows
CREATE POLICY "Users can view their own workflows" ON public.workflows
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workflows" ON public.workflows
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for Workflow Steps (Access via Workflow ownership)
CREATE POLICY "Users can view steps of their own workflows" ON public.workflow_steps
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.workflows 
            WHERE workflows.id = workflow_steps.workflow_id 
            AND workflows.user_id = auth.uid()
        )
    );

-- Policies for Logs (Access via Workflow ownership)
CREATE POLICY "Users can view logs of their own workflows" ON public.logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.workflows 
            WHERE workflows.id = logs.workflow_id 
            AND workflows.user_id = auth.uid()
        )
    );
```

---

## 🔑 3. Environment Variables

Once the database is ready, go to **Project Settings → API** and copy the following:

- **Project URL**: `SUPABASE_URL`
- **Anon Public Key**: `VITE_SUPABASE_ANON_KEY` (for Frontend)
- **Service Role Key**: `SUPABASE_KEY` (for Backend - **KEEP SECRET**)

Add these to your `.env` files in both the root and `backend/` directories.

---

## 🔐 4. Authentication

The system uses Supabase Auth. By default, **Email confirmation** is enabled.
- If you want to allow users to log in immediately after signing up without confirming their email, go to **Authentication → Providers → Email** and toggle off "Confirm email".
