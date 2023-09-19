const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => ['posts', id] as const,
    search: (userId: string) => ['posts', 'search', userId] as const
  }
};

export default queryKey;
