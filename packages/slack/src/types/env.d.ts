declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    PORT: string;
    LOCAL_API_ENDPOINT: string;
    DEPLOY_API_ENDPOINT: string;
    LOCAL_CLIENT_ENDPOINT: string;
    DEPLOY_CLIENT_ENDPOINT: string;
    LOCAL_REDIS_ENDPOINT: string;
    DEPLOY_REDIS_ENDPOINT: string;
    DEPLOY_REDIS_PASSWORD: string;
    SNS_API_ENDPOINT: string;
    SLACK_API_ENDPOINT: string;
    SLACK_HOOK_ENDPOINT: string;
    SLACK_BOT_TOKEN: string;
    SLACK_SIGNING_SECRET: string;
    SESSION_SECRET: string;
  }
}
