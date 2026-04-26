import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { VideoItem } from "../types";
import ChannelAvatar from "./ChannelAvatar";

const { width: SCREEN_WIDTH } = Dimensions.get("window");


interface VideoCardProps {
    video: VideoItem;
    onPress: (video: VideoItem) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPress }) => {
    const { isDark } = useTheme();

    return (
        <TouchableOpacity
            onPress={() => onPress(video)}
            activeOpacity={0.9}
            className="mb-3"
        >
            {/* Thumbnail */}
            <View className="relative">
                <Image
                    source={{ uri: video.thumbnail }}
                    style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * (9 / 16) }}
                    resizeMode="cover"
                />
                {/* Duration Badge */}
                <View className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded">
                    <Text className="text-white text-[11px] font-medium">
                        {video.duration}
                    </Text>
                </View>
            </View>

            {/* Info Section */}
            <View className="flex-row px-3 pt-3 pb-2">
                {/* Channel Avatar */}
                <View className="mr-3 mt-0.5">
                    <ChannelAvatar uri={video.channelAvatar} size={36} />
                </View>

                {/* Text Info */}
                <View className="flex-1">
                    <Text
                        className={`text-[14px] font-medium leading-[18px] ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                            }`}
                        numberOfLines={2}
                    >
                        {video.title}
                    </Text>

                    <View className="flex-row items-center mt-1.5 flex-wrap">
                        <Text
                            className={`text-[12px] ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                                }`}
                        >
                            {video.channelName}
                        </Text>
                        <Text
                            className={`text-[12px] mx-1 ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                                }`}
                        >
                            •
                        </Text>
                        <Text
                            className={`text-[12px] ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                                }`}
                        >
                            {video.views}
                        </Text>
                        <Text
                            className={`text-[12px] mx-1 ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                                }`}
                        >
                            •
                        </Text>
                        <Text
                            className={`text-[12px] ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                                }`}
                        >
                            {video.timestamp}
                        </Text>
                    </View>
                </View>

                {/* More options */}
                <TouchableOpacity className="mt-0.5 ml-1" activeOpacity={0.7}>
                    <Ionicons
                        name="ellipsis-vertical"
                        size={16}
                        color={isDark ? "#AAAAAA" : "#606060"}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(VideoCard);