declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL: string;
    VERCEL_STORAGE_URL: string;
    NOTION_API_KEY: string;
    DATABASE_ID: string;
  }
}
