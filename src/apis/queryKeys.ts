const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: string) => ['posts', 'detail', id] as const,
    list: ['posts', 'list'] as const,
    search: (userId: string) => ['posts', 'list', userId] as const
  }
};

export default queryKey;
