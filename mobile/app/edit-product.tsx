import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import { apiFetch } from "../lib/api";
import { router, useLocalSearchParams } from "expo-router";

export default function EditProduct() {
    const { id, name: initialName, spec: initialSpec } =
        useLocalSearchParams();

    const [name, setName] = useState(String(initialName));
    const [spec, setSpec] = useState(String(initialSpec));

    const save = async () => {
        await apiFetch(`/products/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, spec }),
        });

        router.back();
    };

    return (
        <View style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8}}>
            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                value={spec}
                onChangeText={setSpec}
            />
            <Button title="Save" onPress={save} />
        </View>
    );
}
