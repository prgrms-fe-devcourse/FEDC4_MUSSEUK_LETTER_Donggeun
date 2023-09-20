import useAuthCheckQuery from '@/apis/queries/useAuthCheckQuery';
import storage from '@/utils/storage';
import { AUTH_TOKEN } from '@/constants/storageKey';

const useIsNotLoggedIn = () => {
  const { data: auth } = useAuthCheckQuery();

  return {
    auth,
    isNotLoggedIn: !auth && !storage('session').getItem(AUTH_TOKEN, null)
  };
};

export default useIsNotLoggedIn;
