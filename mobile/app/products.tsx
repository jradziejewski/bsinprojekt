import { View, Text, Button, TextInput, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";

export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [spec, setSpec] = useState("");

    const load = async () => {
        const data = await apiFetch("/products");
        setProducts(data);
    };

    useEffect(() => {
        load();
    }, []);

    const create = async () => {
        await apiFetch("/products", {
            method: "POST",
            body: JSON.stringify({ name, spec }),
        });
        setName("");
        setSpec("");
        load();
    };

    const remove = async (id: number) => {
        await apiFetch(`/products/${id}`, { method: "DELETE" });
        load();
    };

    return (
        <View style={{ padding: 20, display: "flex", flexDirection: "column", gap: 8}}>
            <Text>Create product</Text>

            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                placeholder="Name" value={name}
                onChangeText={setName}
            />
            <TextInput
                style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                placeholder="Spec" value={spec}
                onChangeText={setSpec}
            />
            <Button title="Create" onPress={create} />

            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 10 }}>
                        <Text>{item.name}</Text>
                        <Text>{item.spec}</Text>
                        {item.userId && (
                            <Button title="Delete" onPress={() => remove(item.id)} />
                        )}
                    </View>
                )}
            />
        </View>
    );
}
