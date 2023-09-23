import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';
import type { User } from '@common/types';
import type { QueryOptions } from '@/apis/types';

const useIsNotLoggedIn = (options?: QueryOptions<User>) => {
  const { data: auth } = useAuthCheckQuery(options);

  return {
    auth,
    isNotLoggedIn: !auth && !storage('local').getItem(AUTH_TOKEN, null)
  };
};

export default useIsNotLoggedIn;
