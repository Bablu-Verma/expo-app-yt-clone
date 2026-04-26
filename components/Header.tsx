import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
    onSearchPress?: () => void;
    onCastPress?: () => void;
    onNotificationPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
    onSearchPress,
    onCastPress,
    onNotificationPress,
}) => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <View
            className={`flex-row items-center justify-between px-4 py-2.5 ${isDark ? "bg-ytBlack" : "ytWhite"
                }`}
        >
            {/* Left - Logo */}
            <View className="flex-row items-center">
                <Ionicons name="logo-youtube" size={28} color="#FF0000" />
                <Text
                    className={`text-[18px] font-bold ml-2 tracking-tighter ${isDark ? "text-white" : "text-ytBlack"
                        }`}
                >
                    YouTube
                </Text>
            </View>

            {/* Right - Icons */}
            <View className="flex-row items-center gap-5">
                {/* Cast */}
                <TouchableOpacity onPress={onCastPress} activeOpacity={0.7}>
                    <MaterialIcons
                        name="cast"
                        size={22}
                        color={isDark ? "#FFFFFF" : "#030303"}
                    />
                </TouchableOpacity>

                {/* Notification */}
                <TouchableOpacity onPress={onNotificationPress} activeOpacity={0.7}>
                    <Ionicons
                        name="notifications-outline"
                        size={22}
                        color={isDark ? "#FFFFFF" : "#030303"}
                    />
                </TouchableOpacity>

                {/* Search */}
                <TouchableOpacity onPress={onSearchPress} activeOpacity={0.7}>
                    <Ionicons
                        name="search"
                        size={22}
                        color={isDark ? "#FFFFFF" : "#030303"}
                    />
                </TouchableOpacity>

                {/* Dark/Light mode toggle */}
                <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
                    <Ionicons
                        name={isDark ? "sunny-outline" : "moon-outline"}
                        size={22}
                        color={isDark ? "#FFFFFF" : "#030303"}
                    />
                </TouchableOpacity>


            </View>
        </View>
    );
};

export default React.memo(Header);