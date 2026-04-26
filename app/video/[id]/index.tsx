import Header from "@/components/Header";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ChannelAvatar from "../../../components/ChannelAvatar";
import VideoCard from "../../../components/VideoCard";
import { videos } from "../../../constants/data";
import { useTheme } from "../../../hooks/useTheme";
import { VideoItem } from "../../../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const VideoDetailScreen = () => {
  // ✅ Expo Router se id lo
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();




  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(true);
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);

  const video = useMemo(
    () => videos.find((item) => item.id === id),
    [id]
  );

  const player = useVideoPlayer(video?.videoUrl ?? "", (player) => {
    player.play();
  });


  const relatedVideos = useMemo(
    () => videos.filter((v) => v.id !== id),
    [id]
  );

  const handleRelatedVideoPress = useCallback((relatedVideo: VideoItem) => {
    router.push({
      pathname: "/video/[id]",
      params: { id: relatedVideo.id },
    });
  }, []);



  // ✅ Agar video nahi mila to error screen dikhao
  if (!video) {
    return (
      <SafeAreaView
        className={`flex-1 items-center justify-center ${isDark ? "bg-ytBlack" : "ytWhite"
          }`}
        edges={["top"]}
      >
        <StatusBar style={isDark ? "light" : "dark"} />
        <Ionicons
          name="alert-circle-outline"
          size={60}
          color={isDark ? "#AAAAAA" : "#606060"}
        />
        <Text
          className={`text-[16px] font-medium mt-3 ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
            }`}
        >
          Video not found
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="mt-4 px-6 py-2 bg-[#FF0000] rounded-full"
        >
          <Text className="text-white font-bold text-[14px]">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-ytBlack" : "ytWhite"}`}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <Header onSearchPress={() => router.push('/search')} />

      {/* ✅ Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        activeOpacity={0.7}
        className={`absolute top-20 left-3 z-20 p-1.5 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
          }`}
      >
        <Ionicons
          name="arrow-back"
          size={20}
          color={isDark ? "ytWhite" : "ytBlack"}
        />
      </TouchableOpacity>

      {/* Video Player */}
      <View
        className="relative"
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.5625 }}
      >
        {isVideoLoading && (
          <View
            className="absolute inset-0 z-10 items-center justify-center"
            style={{ backgroundColor: isDark ? "ytBlack" : "#000000" }}
          >
            <ActivityIndicator size="large" color="#FF0000" />
          </View>
        )}
        <VideoView
          player={player}
          style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.5625 }}
          allowsFullscreen
          allowsPictureInPicture
          onFirstFrameRender={() => setIsVideoLoading(false)}
          onError={(e) => {
            console.log("VIDEO ERROR:", e);
            setIsVideoLoading(false);
          }}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className={`flex-1 ${isDark ? "bg-ytBlack" : "ytWhite"}`}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Title */}
        <View className="px-4 pt-3">
          <Text
            className={`text-[16px] font-bold leading-[22px] ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
              }`}
          >
            {video.title}
          </Text>

          {/* Views and Timestamp */}
          <Text
            className={`text-[12px] mt-1 ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
              }`}
          >
            {video.views} • {video.timestamp}
          </Text>
        </View>

        {/* Action Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-3 px-4"
          contentContainerStyle={{ gap: 8 }}
        >
          {/* Like + Dislike combined */}
          <TouchableOpacity

            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-2 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
              }`}
          >
            <Ionicons
              name='thumbs-up-outline'
              size={18}
              color={isDark ? "#F1F1F1" : "ytBlack"}
            />
            <Text
              className={`text-[12px] font-medium ml-1.5 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                }`}
            >
              {video.likes}
            </Text>
            <View
              className={`w-[1px] h-5 mx-3 ${isDark ? "bg-[#505050]" : "bg-[#CCCCCC]"
                }`}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Ionicons
                name='thumbs-down-outline'
                size={18}
                color={isDark ? "#F1F1F1" : "ytBlack"}
              />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Share */}
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-2 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
              }`}
          >
            <Ionicons
              name="arrow-redo-outline"
              size={18}
              color={isDark ? "#F1F1F1" : "ytBlack"}
            />
            <Text
              className={`text-[12px] font-medium ml-1.5 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                }`}
            >
              Share
            </Text>
          </TouchableOpacity>

          {/* Download */}
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-2 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
              }`}
          >
            <MaterialIcons
              name="download"
              size={18}
              color={isDark ? "#F1F1F1" : "ytBlack"}
            />
            <Text
              className={`text-[12px] font-medium ml-1.5 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                }`}
            >
              Download
            </Text>
          </TouchableOpacity>

          {/* Clip */}
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-2 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
              }`}
          >
            <MaterialCommunityIcons
              name="content-cut"
              size={18}
              color={isDark ? "#F1F1F1" : "ytBlack"}
            />
            <Text
              className={`text-[12px] font-medium ml-1.5 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                }`}
            >
              Clip
            </Text>
          </TouchableOpacity>

          {/* Save */}
          <TouchableOpacity
            activeOpacity={0.7}
            className={`flex-row items-center px-4 py-2 rounded-full ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
              }`}
          >
            <MaterialIcons
              name="playlist-add"
              size={18}
              color={isDark ? "#F1F1F1" : "ytBlack"}
            />
            <Text
              className={`text-[12px] font-medium ml-1.5 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                }`}
            >
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Divider */}
        <View
          className={`h-[1px] mx-4 mt-3 ${isDark ? "bg-[#373737]" : "bg-[#E5E5E5]"
            }`}
        />

        {/* Channel Info */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="flex-row items-center flex-1">
            <ChannelAvatar uri={video.channelAvatar} size={40} />
            <View className="ml-3 flex-1">
              <Text
                className={`text-[14px] font-medium ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
                  }`}
                numberOfLines={1}
              >
                {video.channelName}
              </Text>
              <Text
                className={`text-[12px] ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                  }`}
              >
                {video.subscribers}
              </Text>
            </View>
          </View>

          <TouchableOpacity

            activeOpacity={0.7}
            className={`px-4 py-2 rounded-full bg-[#FF0000]`}
          >
            <Text
              className={`text-[13px] font-bold text-white`}
            >
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View
          className={`h-[1px] mx-4 ${isDark ? "bg-[#373737]" : "bg-[#E5E5E5]"
            }`}
        />

        {/* Description */}
        <TouchableOpacity
          onPress={() => setShowFullDescription(!showFullDescription)}
          activeOpacity={0.8}
          className={`mx-4 mt-3 p-3 rounded-xl ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
            }`}
        >
          <Text
            className={`text-[13px] leading-[18px] ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
              }`}
            numberOfLines={showFullDescription ? undefined : 3}
          >
            {video.description}
          </Text>
          <Text
            className={`text-[13px] font-medium mt-1 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
              }`}
          >
            {showFullDescription ? "Show less" : "...more"}
          </Text>
        </TouchableOpacity>

        {/* Comments Section Placeholder */}
        <TouchableOpacity
          activeOpacity={0.8}
          className={`mx-4 mt-3 p-3 rounded-xl ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"
            }`}
        >
          <Text
            className={`text-[14px] font-bold mb-2 ${isDark ? "text-[#F1F1F1]" : "text-ytBlack"
              }`}
          >
            Comments
          </Text>
          <View className="flex-row items-center">
            <ChannelAvatar
              uri="https://picsum.photos/seed/commenter/100/100"
              size={24}
            />
            <Text
              className={`text-[12px] ml-2 flex-1 ${isDark ? "text-[#AAAAAA]" : "text-[#606060]"
                }`}
              numberOfLines={1}
            >
              Add a comment...
            </Text>
          </View>
        </TouchableOpacity>

        {/* Divider */}
        <View
          className={`h-2 mt-4 ${isDark ? "bg-[#272727]" : "bg-[#F2F2F2]"}`}
        />

        {/* Related Videos */}
        <View className="mt-2">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard
              key={relatedVideo.id}
              video={relatedVideo}
              onPress={handleRelatedVideoPress}
            />
          ))}
        </View>

        {/* Bottom spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoDetailScreen;