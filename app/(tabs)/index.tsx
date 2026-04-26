import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryTabs from "../../components/CategoryTabs";
import Header from "../../components/Header";
import SkeletonLoader from "../../components/SkeletonLoader";
import VideoList from "../../components/VideoList";
import { categories, videos } from "../../constants/data";
import { useTheme } from "../../hooks/useTheme";
import { VideoItem } from "../../types";

// ✅ Koi props nahi chahiye - Expo Router me navigation prop nahi aata
const HomeScreen: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✅ router.push use karo navigation.navigate ki jagah
  const handleVideoPress = useCallback((video: VideoItem) => {
    router.push({
      pathname: "/video/[id]",
      params: { id: video.id },
    });
  }, []);

  const handleCategorySelect = useCallback((id: string) => {
    setSelectedCategory(id);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 ${isDark ? "bg-ytBlack" : "ytWhite"}`}
      edges={["top"]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <Header onSearchPress={() => router.push('/search')} />

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Video List or Skeleton */}
      {isLoading ? (
        <SkeletonLoader count={5} />
      ) : (
        <View className={`flex-1 pt-0.5 ${isDark ? "bg-ytBlack" : "ytWhite"}`}>
          <VideoList
            videos={videos}
            onVideoPress={handleVideoPress}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;