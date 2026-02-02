import {
    View,
    Text,
    Button,
    TextInput,
    FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { router } from "expo-router";


export default function Products() {
    const [products, setProducts] = useState<any[]>([]);
    const [me, setMe] = useState<any>(null);
    const [name, setName] = useState("");
    const [spec, setSpec] = useState("");

    const load = async () => {
        const data = await apiFetch("/products");
        setProducts(data);

        try {
            const user = await apiFetch("/auth/me");
            setMe(user);
        } catch {
            setMe(null); // not logged in
        }
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
            {me && (
                <>
                    <Text>Create product</Text>
                    <TextInput
                        style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={{ padding: 4, backgroundColor: "#fff", borderWidth: 2, borderColor: "black" }}
                        placeholder="Spec"
                        value={spec}
                        onChangeText={setSpec}
                    />
                    <Button title="Create" onPress={create} />
                </>
            )}

            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    const isOwner = me && item.userId === me.id;

                    return (
                        <View style={{ marginVertical: 12 }}>
                            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                            <Text>{item.spec}</Text>

                            <Text>
                                Added by:{" "}
                                {item.user ? item.user.username : "System"}
                            </Text>

                            {isOwner && (
                                <>
                                    <Button
                                        title="Edit"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/edit-product",
                                                params: {
                                                    id: item.id,
                                                    name: item.name,
                                                    spec: item.spec,
                                                },
                                            })
                                        }
                                    />
                                    <Button
                                        title="Delete"
                                        onPress={() => remove(item.id)}
                                    />
                                </>
                            )}
                        </View>
                    );
                }}
            />
        </View>
    );
}

