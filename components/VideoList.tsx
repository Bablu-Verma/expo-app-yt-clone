import React, { useCallback } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { VideoItem } from "../types";
import VideoCard from "./VideoCard";

interface VideoListProps {
    videos: VideoItem[];
    onVideoPress: (video: VideoItem) => void;
    refreshing: boolean;
    onRefresh: () => void;
    ListHeaderComponent?: React.ReactElement;
}

const VideoList: React.FC<VideoListProps> = ({
    videos,
    onVideoPress,
    refreshing,
    onRefresh,
    ListHeaderComponent,
}) => {
    const { isDark } = useTheme();

    const renderVideoCard = useCallback(
        ({ item }: { item: VideoItem }) => (
            <VideoCard video={item} onPress={onVideoPress} />
        ),
        [onVideoPress]
    );

    const keyExtractor = useCallback((item: VideoItem) => item.id, []);

    const ItemSeparator = () => (
        <View
            className={`h-[1px] ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"}`}
        />
    );

    return (
        <FlatList
            data={videos}
            renderItem={renderVideoCard}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            ItemSeparatorComponent={ItemSeparator}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={isDark ? "ytWhite" : "ytBlack"}
                    colors={["#FF0000"]}
                    progressBackgroundColor={isDark ? "#272727" : "ytWhite"}
                />
            }
            removeClippedSubviews
            maxToRenderPerBatch={5}
            windowSize={5}
            initialNumToRender={3}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
    );
};

export default React.memo(VideoList);