import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from "react-native-responsive-dimensions";
import { Colors } from "../../constants/colors";
import { useTheme } from "../../hooks/useTheme";

export default function TabLayout() {
    const { isDark } = useTheme();
    const colors = isDark ? Colors.dark : Colors.light;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                    height: responsiveHeight(6),
                    overflow: "visible",
                },
                tabBarActiveTintColor: "#FF0000",
                tabBarInactiveTintColor: colors.textSecondary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="home"
                            size={responsiveFontSize(3)}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="shorts"
                options={{
                    title: "Shorts",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="play"
                            size={responsiveFontSize(3)}
                            color={color}
                        />
                    ),
                }}
            />


            <Tabs.Screen
                name="add"
                options={{
                    title: "",
                    tabBarLabel: () => null,
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                width: responsiveFontSize(5.5),
                                height: responsiveFontSize(5.5),
                                borderRadius: responsiveFontSize(5.5) / 2,
                                top: responsiveHeight(.6),
                                alignSelf: "center",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name="add-circle"
                                size={responsiveFontSize(5.5)}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="subscriptions"
                options={{
                    title: "Library",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="albums"
                            size={responsiveFontSize(3)}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "You",
                    tabBarIcon: ({ color }) => (
                        <View className="border-[1px] rounded-full overflow-hidden flex justify-center items-center " style={{ borderColor: color, borderRadius: responsiveWidth(7) / 2, width: responsiveWidth(6.5), height: responsiveWidth(6.5) }}>
                            <Image
                                source={{
                                    uri: "https://picsum.photos/seed/profile/100/100",
                                }}

                                style={{
                                    width: '100%',
                                    height: '100%',


                                }}
                            />
                        </View>

                    ),
                }}
            />
        </Tabs>
    );
}