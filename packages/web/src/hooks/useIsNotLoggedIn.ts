import { useQuery } from '@tanstack/react-query';
import { authCheckOption } from '@/apis/queries/useAuthCheckQuery';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';

const useIsNotLoggedIn = () => {
  const { data: auth } = useQuery({
    ...authCheckOption
  });

  return {
    auth,
    isNotLoggedIn: !auth && !storage('local').getItem(AUTH_TOKEN, null)
  };
};

export default useIsNotLoggedIn;
