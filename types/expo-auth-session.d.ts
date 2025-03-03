declare module 'expo-auth-session' {
  export function openAuthSessionAsync(
    authUrl: string,
    redirectUri: string
  ): Promise<AuthSessionResult>;

  export function parseResponseAsync(
    url: string
  ): Promise<AuthSessionResult>;
  
  export function makeRedirectUri(options: {
    useProxy?: boolean;
    path?: string;
  }): string;
  
  export function parseRedirectResult(url: string): Promise<{
    params: Record<string, string>;
    error: string | null;
  }>;
  
  interface AuthSessionResult {
    type: 'success' | 'cancel' | 'dismiss';
    params: Record<string, string>;
  }
} 