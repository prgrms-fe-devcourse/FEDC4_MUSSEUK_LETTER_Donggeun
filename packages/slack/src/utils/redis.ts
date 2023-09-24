import redisClient from '@/configs/redis';
import type { ItemType, ItemValue, ItemTypeMap } from '@/types/redis';

const redis = <T extends ItemType>(itemType: T) => {
  const exists = async (key: string) => {
    return await redisClient.exists(itemType + '_' + key);
  };

  const get = async (key: string) => {
    const result = await redisClient.get(itemType + '_' + key);
    return result ? (JSON.parse(result) as ItemTypeMap[T]) : undefined;
  };

  const set = async (key: string, value: ItemValue<T>) => {
    return await redisClient.set(itemType + '_' + key, JSON.stringify(value));
  };

  const del = async (key: string) => {
    return await redisClient.del(itemType + '_' + key);
  };

  const setTemporarily = async (key: string, value: ItemValue<T>, duration: number) => {
    await set(key, value);

    setTimeout(() => del(key), duration);
  };

  return { exists, get, set, setTemporarily, del };
};

export default redis;
