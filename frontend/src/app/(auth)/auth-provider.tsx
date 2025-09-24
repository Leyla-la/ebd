"use client";

import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  Heading,
  useAuthenticator,
  View
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter, usePathname } from "next/navigation";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="!text-2xl !font-bold">
          EBD
          <span className="text-secondary-500 font-light hover:!text-primary-300">
            Corp
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please sign in to continue
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      return null; // Không cho chuyển sang SignUp
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password",
      label: "Password",
      isRequired: true,
    },
  },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin)$/);

  if (!isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200/60 via-white/80 to-green-50/80 relative overflow-hidden">
      {/* Animated glassy blobs for liquid glass effect */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-green-300/40 via-white/60 to-green-100/30 rounded-full blur-3xl opacity-70 animate-pulse z-0" />
      <div className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-green-400/30 via-white/50 to-green-200/40 rounded-full blur-2xl opacity-60 animate-pulse z-0" />
      <div className="relative w-full max-w-2xl min-w-0 p-0 md:p-12 rounded-[3rem] shadow-2xl backdrop-blur-[36px] bg-white/60 border border-green-200 flex flex-col items-center justify-center overflow-visible z-10"
        style={{
          boxShadow: '0 16px 64px 0 rgba(34,197,94,0.22), 0 2px 12px 0 rgba(16,185,129,0.10)',
          fontFamily: 'inherit',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.90) 60%, rgba(16,185,129,0.12) 100%)',
          border: '2px solid #bbf7d0',
        }}>
        {/* Content z-10 để luôn nằm trên glass */}
        <div className="w-full flex flex-col items-center justify-center relative z-10 min-w-0 max-w-full px-2 md:px-0">
          <div className="w-full max-w-md mx-auto">
            <Authenticator
              initialState="signIn"
              components={components}
              formFields={formFields}
              hideSignUp
              className="!font-sans"
            >
              {({ user }: any) => {
                useEffect(() => {
                  if (user && isAuthPage) {
                    router.push("/");
                  }
                }, [user, isAuthPage, router]);
                return <>{children}</>;
              }}
            </Authenticator>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .amplify-Authenticator, .amplify-Authenticator__container, .amplify-View, .amplify-Flex, .amplify-Card {
          font-family: inherit !important;
          background: transparent !important;
          border-radius: 2.5rem !important;
          box-shadow: none !important;
          border: none !important;
          position: static !important;
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .amplify-Authenticator *, .amplify-Card *, .amplify-View *, .amplify-Flex * {
          font-family: inherit !important;
          background: transparent !important;
          border-radius: 2.5rem !important;
          box-shadow: none !important;
          border: none !important;
        }
        .amplify-Card, .amplify-View, .amplify-Flex {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
        }
        .amplify-Heading {
          color: #16a34a !important;
          font-family: inherit !important;
          font-weight: 700 !important;
        }
        .amplify-Field, .amplify-TextField, .amplify-PasswordField {
          margin-bottom: 1.25rem !important;
          border-radius: 1.25rem !important;
          background: transparent !important;
          border: none !important;
        }
        .amplify-TextField__input, .amplify-PasswordField__input {
          border-radius: 1.25rem !important;
          border: 1.5px solid #bbf7d0 !important;
          background: rgba(255,255,255,0.85) !important;
          font-size: 1rem;
          box-shadow: none !important;
        }
        .amplify-Label {
          color: #166534 !important;
          font-weight: 600 !important;
          font-family: inherit !important;
        }
        .amplify-Button--primary {
          background: linear-gradient(90deg, #22c55e 0%, #4ade80 100%) !important;
          color: #fff !important;
          border-radius: 9999px !important;
          font-weight: 700 !important;
          box-shadow: 0 2px 16px 0 rgba(34,197,94,0.15) !important;
          transition: background 0.2s, box-shadow 0.2s;
          border: none !important;
        }
        .amplify-Button--primary:hover {
          background: linear-gradient(90deg, #16a34a 0%, #22d3ee 100%) !important;
          box-shadow: 0 4px 24px 0 rgba(16,185,129,0.22) !important;
        }
        .amplify-Authenticator__section, .amplify-Authenticator__header, .amplify-Authenticator__content {
          border: none !important;
          box-shadow: none !important;
          background: transparent !important;
          border-radius: 2.5rem !important;
        }
        .amplify-Authenticator__header {
          border-bottom: none !important;
          margin-bottom: 0.5rem !important;
        }
        .amplify-Authenticator__content {
          border-top: none !important;
        }
      `}</style>
    </div>
  );
};

export default AuthProvider;
