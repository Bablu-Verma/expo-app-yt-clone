import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { useTheme } from "../hooks/useTheme";

const DRAWER_WIDTH = Math.min(Dimensions.get("window").width * 0.78, 320);

const drawerLinks = [
    { id: "1", title: "Trending", icon: "flame-outline" },
    { id: "2", title: "Music", icon: "musical-notes-outline" },
    { id: "3", title: "Gaming", icon: "game-controller-outline" },
    { id: "4", title: "News", icon: "newspaper-outline" },
    { id: "5", title: "Sports", icon: "football-outline" },
    { id: "6", title: "Learning", icon: "school-outline" },
    { id: "7", title: "Fashion & Beauty", icon: "shirt-outline" },
    { id: "8", title: "Settings", icon: "settings-outline" },
    { id: "9", title: "Help & Feedback", icon: "help-circle-outline" },
];

interface ExploreSidebarProps {
    visible: boolean;
    onClose: () => void;
}

const ExploreSidebar: React.FC<ExploreSidebarProps> = ({ visible, onClose }) => {
    const { isDark } = useTheme();
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    const openDrawer = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(slideAnim, {
            toValue: -DRAWER_WIDTH,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    useEffect(() => {
        if (visible) {
            slideAnim.setValue(-DRAWER_WIDTH);
            openDrawer();
        }
    }, [visible]);

    if (!visible) return null;

    const drawerBgClass = isDark ? "bg-[#0F0F0F]" : "bg-white";
    const borderClass = isDark ? "border-[#2A2A2A]" : "border-[#E5E5E5]";
    const textClass = isDark ? "text-white" : "text-[#030303]";
    const mutedTextClass = isDark ? "text-[#AAAAAA]" : "text-[#666666]";
    const itemBgClass = isDark ? "bg-white/5" : "bg-[#F8F8F8]";
    const iconColor = isDark ? "#FFFFFF" : "#030303";
    const arrowColor = isDark ? "#666666" : "#999999";

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={closeDrawer}
        >
            <View className="flex-1">
                {/* Overlay */}
                <Pressable
                    onPress={closeDrawer}
                    className="absolute inset-0 bg-black/45"
                />

                {/* Drawer */}
                <Animated.View
                    className={`absolute bottom-0 left-0 top-0 px-4 pt-[55px] ${drawerBgClass} border-r ${borderClass}`}
                    style={{
                        width: DRAWER_WIDTH,
                        transform: [{ translateX: slideAnim }],
                        elevation: 10,
                        shadowColor: "#000",
                        shadowOffset: { width: 2, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                    }}
                >
                    {/* Header */}
                    <View className={`mb-5 flex-row items-center justify-between pb-4`}>
                        <View className="flex-row items-center">
                            <Ionicons name="logo-youtube" size={26} color="#FF0000" />
                            <Text className={`ml-2 text-[20px] font-bold ${textClass}`}>
                                You Tube
                            </Text>
                        </View>

                        <TouchableOpacity onPress={closeDrawer} activeOpacity={0.7}>
                            <Ionicons name="close" size={26} color={iconColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Menu Items */}
                    <View className="gap-1">
                        {drawerLinks.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.7}
                                // onPress={() => {
                                //     Alert.alert(item.title, "Coming soon!");
                                //     closeDrawer();
                                // }}
                                className={`flex-row items-center rounded-[10px] px-3 py-[13px] ${itemBgClass}`}
                            >
                                <Ionicons
                                    name={item.icon as any}
                                    size={22}
                                    color={iconColor}
                                />

                                <Text className={`ml-[14px] text-[15px] font-medium ${textClass}`}>
                                    {item.title}
                                </Text>

                                <Ionicons
                                    name="chevron-forward"
                                    size={16}
                                    color={arrowColor}
                                    style={{ marginLeft: "auto" }}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Footer */}
                    <View className={`mt-auto border-t pt-[18px] pb-[30px] ${borderClass}`}>
                        <Text className={`text-[12px] ${mutedTextClass}`}>
                            App Version
                        </Text>

                        <Text className={`mt-1 text-[16px] font-semibold ${textClass}`}>
                            v1.0.0
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default React.memo(ExploreSidebar);