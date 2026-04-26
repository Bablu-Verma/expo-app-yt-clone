import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { CategoryItem } from "../types";

interface CategoryTabsProps {
    categories: CategoryItem[];
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    selectedCategory,
    onSelectCategory,
}) => {
    const { isDark } = useTheme();
    const flatListRef = useRef<FlatList<CategoryItem>>(null);

    const renderCategory = ({ item }: { item: CategoryItem }) => {
        const isSelected = item.id === selectedCategory;

        return (
            <TouchableOpacity
                onPress={() => onSelectCategory(item.id)}
                activeOpacity={0.7}
                className={`px-3 py-1.5 rounded-lg mr-2 ${isSelected
                    ? isDark
                        ? "bg-[#F1F1F1]"
                        : "bg-ytBlack"
                    : isDark
                        ? "bg-[#373737]"
                        : "bg-[#F2F2F2]"
                    }`}
            >
                <Text
                    className={`text-[13px] font-medium ${isSelected
                        ? isDark
                            ? "text-ytBlack"
                            : "text-white"
                        : isDark
                            ? "text-[#F1F1F1]"
                            : "text-ytBlack"
                        }`}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View
            className={`border-b ${isDark ? "bg-ytBlack border-[#373737]" : "ytWhite border-[#E5E5E5]"
                }`}
        >
            <View className="flex-row items-center">
                {/* Explore / Compass icon */}
                <TouchableOpacity
                    className={`pl-4 pr-3 py-2 border-r ${isDark ? "border-[#373737]" : "border-[#E5E5E5]"
                        }`}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="compass-outline"
                        size={22}
                        color={isDark ? "#FFFFFF" : "#030303"}
                    />
                </TouchableOpacity>

                {/* Scrollable categories */}
                <FlatList
                    ref={flatListRef}
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
                />
            </View>
        </View>
    );
};

export default React.memo(CategoryTabs);