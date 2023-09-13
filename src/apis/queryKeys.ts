const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: number) => ['posts', id] as const,
    search: (userId: number) => ['posts', 'search', userId] as const
  }
};

export default queryKey;
