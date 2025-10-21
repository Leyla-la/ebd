// src/lib/amplify-config.ts
import { Amplify } from 'aws-amplify';

export const configureAmplify = () => {
  if (typeof window !== 'undefined') {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || '',
          userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID || '',
        }
      }
    }, { ssr: true });
  }
};
