export {};

declare global {
  namespace Express {
    interface Request {
      accessToken?: string;
      user?: {
        id: number;
        username: string;
        role: string;
      };
    }
  }
}
