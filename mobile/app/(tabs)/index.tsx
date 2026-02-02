import { Text, View, Button } from "react-native";
import { useState } from "react";

export default function App() {
    const [status, setStatus] = useState("idle");

    const login = async () => {
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "test",
                password: "1234",
            }),
        });

        const data = await res.json();
        console.log(data);
    };

    const pingBackend = async () => {
        const res = await fetch("http://localhost:3000/health");
        const data = await res.json();
        setStatus(JSON.stringify(data));
    };

    return (
        <View style={{ padding: 20 }}>
            <Button title="Ping backend" onPress={pingBackend} />
            <Text>{status}</Text>

            <Button title="Login" onPress={login} />
        </View>
    );
}

