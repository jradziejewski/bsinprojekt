import { useEffect } from "react";
import { router } from "expo-router";
import { getToken } from "@/lib/auth";

export default function Index() {
    useEffect(() => {
        getToken().then(token => {
            if (token) {
                router.replace("/me");
            } else {
                router.replace("/login");
            }
        });
    }, []);

    return null;
}
