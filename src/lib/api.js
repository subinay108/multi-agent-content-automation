export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  startWorkflow: async (userId, form) => {
    const res = await fetch(`${API_URL}/workflow/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      },
      body: JSON.stringify({
        input: form.input,
        type: form.type,
        audience: form.audience,
        tone: form.tone,
        language: form.language
      })
    });
    if (!res.ok) throw new Error('Failed to start workflow');
    return res.json();
  },

  getWorkflow: async (workflowId) => {
    const res = await fetch(`${API_URL}/workflow/${workflowId}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch workflow');
    }
    return res.json();
  },

  approveStep: async (workflowId, stepId) => {
    const res = await fetch(`${API_URL}/workflow/${workflowId}/step/${stepId}/approve`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to approve step');
    return res.json();
  },

  rejectStep: async (workflowId, stepId) => {
    const res = await fetch(`${API_URL}/workflow/${workflowId}/step/${stepId}/reject`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to reject step');
    return res.json();
  }
};
