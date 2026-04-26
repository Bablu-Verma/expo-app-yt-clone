import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { videos } from "../constants/data";
import { useDebounce } from "../hooks/useDebounce";
import { VideoItem } from "../types";

const SearchScreen = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<VideoItem[]>([]);


    const debouncedQuery = useDebounce(query, 400);


    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setResults([]);
            return;
        }

        const filtered = videos.filter((video) =>
            video.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );

        setResults(filtered);
    }, [debouncedQuery]);

    const isTyping = query !== debouncedQuery;

    return (
        <SafeAreaView className="flex-1 bg-white">

            {/* 🔍 Search Bar */}
            <View className="flex-row items-center px-3 py-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} />
                </TouchableOpacity>

                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="Search..."
                    className="flex-1 ml-2 px-3 py-2 bg-gray-200 rounded-full"
                />
            </View>

            {/* 🔄 Searching indicator */}
            {isTyping && (
                <Text className="text-center mt-2 text-gray-400">
                    Searching...
                </Text>
            )}

            {/* 📹 Results */}
            <FlatList
                data={results}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/video/${item.id}`)}
                        className="px-4 py-3 border-b"
                    >
                        <Text className="font-bold">{item.title}</Text>
                        <Text className="text-gray-500 text-sm">
                            {item.channelName}
                        </Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    debouncedQuery ? (
                        <Text className="text-center mt-10 text-gray-500">
                            No results found
                        </Text>
                    ) : (
                        <Text className="text-center mt-10 text-gray-400">
                            Start typing to search
                        </Text>
                    )
                }
            />
        </SafeAreaView>
    );
};

export default SearchScreen;