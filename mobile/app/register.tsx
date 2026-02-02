import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { apiFetch } from "../lib/api";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ username, password }),
        });

        router.replace("/login");
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

            <Button title="Register" onPress={register} />
        </View>
    );
}
