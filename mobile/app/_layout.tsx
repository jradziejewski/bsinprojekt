import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";
import "react-native-reanimated";

export default function RootLayout() {
    const [ready, setReady] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getToken().then(token => {
            setLoggedIn(!!token);
            setReady(true);
        });
    }, []);

    if (!ready) return null;

    return (
        <ThemeProvider value={DefaultTheme}>
            <Stack>
                {/* Always define routes */}
                <Stack.Screen name="login" options={{ title: "Login" }} />
                <Stack.Screen name="register" options={{ title: "Register" }} />
                <Stack.Screen name="me" options={{ title: "Profile" }} />
            </Stack>

            {/* Redirect based on auth */}
            {!loggedIn ? <Redirect href="/login" /> : <Redirect href="/me" />}

            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

