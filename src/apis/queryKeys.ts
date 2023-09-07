const queryKey = {
  auth: ['auth'] as const,
  users: {
    all: ['users'] as const,
    detail: (id: number) => ['users', id] as const
  }
};

export default queryKey;
