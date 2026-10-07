const API_BASE_URL = 'http://localhost:3001';

// Posts API
export const postsApi = {
  getAll: async (filters?: { category?: string; author?: string; tag?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.author) params.append('author', filters.author);
    if (filters?.tag) params.append('tag', filters.tag);
    
    const response = await fetch(`${API_BASE_URL}/posts${params.toString() ? '?' + params.toString() : ''}`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  create: async (postData: any) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  },

  update: async (id: string, postData: any) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    if (!response.ok) throw new Error('Failed to update post');
    return response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete post');
    return response.json();
  },

  incrementClaps: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/clap`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to increment claps');
    return response.json();
  },

  togglePublish: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}/publish`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to toggle publish');
    return response.json();
  },
};

// Authors API
export const authorsApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/authors`);
    if (!response.ok) throw new Error('Failed to fetch authors');
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  getByName: async (name: string) => {
    const response = await fetch(`${API_BASE_URL}/authors/${name}`);
    if (!response.ok) throw new Error('Failed to fetch author');
    return response.json();
  },
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },
};

// Comments API
export const commentsApi = {
  getByPost: async (postSlug: string) => {
    const response = await fetch(`${API_BASE_URL}/comments/post/${postSlug}`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  },

  create: async (commentData: any) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) throw new Error('Failed to create comment');
    return response.json();
  },
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to subscribe');
    return response.json();
  },

  unsubscribe: async (email: string) => {
    const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error('Failed to unsubscribe');
    return response.json();
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Failed to login');
    return response.json();
  },

  register: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Failed to register');
    return response.json();
  },
};
