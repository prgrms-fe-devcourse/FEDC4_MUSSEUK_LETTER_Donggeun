import { SlackWorkspace } from '@common/types';

interface SlackItem {
  accessToken: string;
  slackId: string;
  slackWorkspace: SlackWorkspace;
  expiresAt: number;
}

interface UserTokenItem {
  accessToken: string;
}

export type ItemTypeMap = {
  SLACK: SlackItem;
  USER_TOKEN: UserTokenItem;
};

export type ItemType = keyof ItemTypeMap;
export type ItemValue<T extends ItemType> = T extends ItemType ? ItemTypeMap[T] : never;
