"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/state/notificationSlice";
import { useNotificationSocket } from "@/hooks/use-noti-socket";
import { useGetAuthUserQuery } from "@/state/api";
import { fetchAuthSession } from "@aws-amplify/auth";

export function useNotificationListener() {
  const dispatch = useDispatch();
  const { data: user } = useGetAuthUserQuery();
  const [idToken, setIdToken] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    async function getToken() {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString() || "";
        if (isMounted) setIdToken(token);
      } catch (e) {
        if (isMounted) setIdToken("");
      }
    }
    if (user) getToken();
    else setIdToken("");
    return () => { isMounted = false; };
  }, [user]);

  const handleNotification = useCallback(
    (notification: any) => {
      dispatch(addNotification(notification));
    },
    [dispatch]
  );

  useNotificationSocket(idToken, handleNotification);
}
