import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { clearToken } from "../lib/auth";
import { router } from "expo-router";

export default function Me() {
    const [user, setUser] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setError(null);

        try {
            const data = await apiFetch("/auth/me");
            setUser(data);
        } catch (err: any) {
            // Token invalid / expired → force logout
            if (err.message.toLowerCase().includes("token")) {
                await clearToken();
                router.replace("/login");
                return;
            }

            setError(err.message);
        }
    };

    const logout = async () => {
        await clearToken();
        router.replace("/login");
    };

    if (error) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ color: "red" }}>{error}</Text>
                <Button title="Retry" onPress={load} />
                <Button title="Logout" onPress={logout} />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={{ padding: 20 }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>ID: {user.id}</Text>
            <Text>Username: {user.username}</Text>

            <Button title="Products" onPress={() => router.push("/products")} />
            <Button title="Logout" onPress={logout} />
        </View>
    );
}

