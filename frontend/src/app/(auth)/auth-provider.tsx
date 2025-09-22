"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setAuthStatus } from "@/state/authSlice";
import { configureAmplify } from "@/lib/amplify-config";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

// Configure Amplify on initial load
configureAmplify();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        dispatch(setAuthStatus({ isAuthenticated: true, user }));
      } catch (error) {
        dispatch(setAuthStatus({ isAuthenticated: false, user: null }));
      }
    };

    checkCurrentUser();

    const hubListener = (data: any) => {
      switch (data.payload.event) {
        case "signedIn":
          checkCurrentUser();
          break;
        case "signedOut":
          dispatch(setAuthStatus({ isAuthenticated: false, user: null }));
          break;
      }
    };

    // Listen for auth events
    const unsubscribe = Hub.listen("auth", hubListener);

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  if (isLoading) {
    // You can replace this with a proper loading spinner component
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
