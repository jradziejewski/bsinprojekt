import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { clearToken } from "../lib/auth";
import { router } from "expo-router";

export default function Me() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        apiFetch("/auth/me")
            .then(res => res.json())
            .then(setUser);
    }, []);

    const logout = async () => {
        await clearToken();
        router.replace("/login");
    };

    if (!user) return <Text>Loading...</Text>;

    return (
        <View style={{ padding: 20 }}>
            <Text>ID: {user.id}</Text>
            <Text>Username: {user.username}</Text>

            <Button title="Logout" onPress={logout} />
        </View>
    );
}
