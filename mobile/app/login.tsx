import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { saveToken } from "../lib/auth";
import { apiFetch } from "../lib/api";
import { router } from "expo-router";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (data.token) {
            await saveToken(data.token);
            router.replace("/me");
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

            <Button title="Login" onPress={login} />
            <Button title="Register" onPress={() => router.push("/register")} />
        </View>
    );
}
