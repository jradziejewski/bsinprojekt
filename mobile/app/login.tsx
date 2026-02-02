import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { saveToken } from "../lib/auth";
import { apiFetch } from "../lib/api";
import { router } from "expo-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const login = async () => {
        setError(null);

        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({username, password}),
            })

            await saveToken(data.token);
            router.replace("/me");
        } catch(err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8}}>
            <Text>Username</Text>
            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                value={username} onChangeText={setUsername}
            />

            <Text>Password</Text>
            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            { error && (
                <Text style={{ color: "red", marginVertical: 10 }}>
                    {error}
                </Text>
            )}

            <Button title="Login" onPress={login} />
            <Button title="Register" onPress={() => router.push("/register")} />
        </View>
    );
}
