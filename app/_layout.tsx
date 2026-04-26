import { Stack } from "expo-router";
import React from "react";
import { Colors } from "../constants/colors";
import { ThemeProvider } from "../context/ThemeContext";
import "../global.css";

import { useTheme } from "../hooks/useTheme";

function RootLayoutNav() {
  const { isDark } = useTheme();
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="video/[id]" />
      <Stack.Screen
        name="search"
        options={{
          animation: "fade",
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}