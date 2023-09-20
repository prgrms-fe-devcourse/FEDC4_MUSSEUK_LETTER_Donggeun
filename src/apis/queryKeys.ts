const queryKey = {
  auth: ['auth'] as const,
  slack: {
    all: ['slack'] as const,
    token: (token: string) => ['slack', token] as const
  },
  users: {
    all: ['users'] as const,
    detail: (userId: number) => ['users', userId] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  },
  posts: {
    all: ['posts'] as const,
    detail: (postId: string) => ['posts', postId] as const,
    list: ['posts', 'list'] as const,
    search: (userId: string) => ['posts', 'search', userId] as const
  }
};

export default queryKey;
