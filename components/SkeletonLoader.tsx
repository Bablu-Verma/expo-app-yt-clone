import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SkeletonItem: React.FC = () => {
    const { isDark } = useTheme();
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(shimmerAnim, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.start();

        return () => animation.stop();
    }, [shimmerAnim]);

    const opacity = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    const skeletonColor = isDark ? "#373737" : "#E5E5E5";

    return (
        <Animated.View style={{ opacity }} className="mb-4">
            {/* Thumbnail skeleton */}
            <View
                style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH * 0.5625,
                    backgroundColor: skeletonColor,
                }}
            />

            {/* Info skeleton */}
            <View className="flex-row px-3 pt-3">
                {/* Avatar skeleton */}
                <View
                    style={{ backgroundColor: skeletonColor }}
                    className="w-9 h-9 rounded-full mr-3"
                />

                <View className="flex-1">
                    {/* Title skeleton */}
                    <View
                        style={{ backgroundColor: skeletonColor }}
                        className="h-3.5 rounded-sm w-[90%] mb-2"
                    />
                    <View
                        style={{ backgroundColor: skeletonColor }}
                        className="h-3.5 rounded-sm w-[60%] mb-2"
                    />
                    {/* Channel info skeleton */}
                    <View
                        style={{ backgroundColor: skeletonColor }}
                        className="h-3 rounded-sm w-[75%]"
                    />
                </View>
            </View>
        </Animated.View>
    );
};

interface SkeletonLoaderProps {
    count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 3 }) => {
    const { isDark } = useTheme();

    return (
        <View className={`flex-1 gap-2 ${isDark ? "bg-ytBlack" : "ytWhite"}`}>
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonItem key={index} />
            ))}
        </View>
    );
};

export default React.memo(SkeletonLoader);