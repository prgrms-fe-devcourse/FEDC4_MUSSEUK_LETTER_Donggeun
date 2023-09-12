const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const,
    search: (keyword: string) => ['users', 'search', keyword] as const
  }
};

export default queryKey;
