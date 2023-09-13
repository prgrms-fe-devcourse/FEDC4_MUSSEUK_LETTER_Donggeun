const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  },
  posts: {
    all: ['posts'] as const,
    detail: (id: number) => ['posts', 'detail', id] as const
  }
};

export default queryKey;
