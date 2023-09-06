import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type MutationOptions<T> = Omit<UseMutationOptions<T>, 'mutationKey' | 'mutationFn'>;
