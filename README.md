# 📺 YouTube Clone - React Native

A pixel-perfect **YouTube Mobile App Clone** built with **React Native (Expo)**, **TypeScript**, and **NativeWind (Tailwind CSS)**. This project replicates the core UI and UX of YouTube's mobile application with multiple screens, dark/light mode, search with debouncing, and video playback.

![React Native](https://img.shields.io/badge/React_Native-0.74-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-51-black?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![NativeWind](https://img.shields.io/badge/NativeWind-4.0-purple)

## 🎯 About the Project

This project is a **YouTube Mobile App UI Clone** created as a technical assessment for **Tech World Digital Solution**. The goal was to evaluate:

- ✅ UI/UX skills
- ✅ Component structuring
- ✅ Code quality
- ✅ TypeScript proficiency
- ✅ State management
- ✅ Performance optimization

The app uses **static JSON data** (no API calls) and focuses entirely on building a **clean, modern, and production-ready** mobile UI.

### UI/UX Features

- 🌙 **Dark Mode / Light Mode** - Toggle with persistence (AsyncStorage)
- 💀 **Skeleton/Shimmer Loading** - Animated loading placeholders
- 🔄 **Pull-to-Refresh** - On home feed
- 📱 **Responsive Design** - Works on all screen sizes
- 🎨 **Clean Typography** - Proper font sizes, weights, spacing
- 🧭 **Bottom Tab Navigation** - 5 tabs like YouTube
- ⚡ **Performance Optimized** - FlatList with optimization props

### Technical Features

- 📝 **100% TypeScript** - Full type safety
- 🎨 **NativeWind (Tailwind CSS)** - Utility-first styling
- 🪝 **Custom Hooks** - useTheme, useDebounce
- 🧩 **Reusable Components** - Modular architecture
- 📂 **Clean Folder Structure** - Organized and scalable
- 🗂️ **Expo Router** - File-based navigation

---

## 📱 Screens Built

|  #  |      Screen      |          File           | Description                                                                                                                  |
| :-: | :--------------: | :---------------------: | :--------------------------------------------------------------------------------------------------------------------------- |
|  1  |     **Home**     |    `HomeScreen.tsx`     | YouTube home feed with header, category tabs, video list, skeleton loading, pull-to-refresh                                  |
|  2  |    **Search**    |   `SearchScreen.tsx`    | Search with debouncing, recent searches, trending searches, suggestions, video results                                       |
|  3  | **Video Detail** | `VideoDetailScreen.tsx` | Video player (expo-av), title, like/dislike, share, download, channel info, subscribe, description, comments, related videos |

---

## 🛠 Tech Stack

|             Technology             | Version | Purpose                         |
| :--------------------------------: | :-----: | :------------------------------ |
|          **React Native**          |  0.74+  | Mobile app framework            |
|              **Expo**              | SDK 51  | Development platform            |
|          **Expo Router**           |   v3    | File-based navigation           |
|           **TypeScript**           |  5.0+   | Type safety                     |
|           **NativeWind**           |   4.0   | Tailwind CSS for React Native   |
|          **Tailwind CSS**          |  3.3.2  | Utility-first CSS framework     |
|            **expo-av**             | Latest  | Video playback                  |
|       **@expo/vector-icons**       | Latest  | Icons (Ionicons, MaterialIcons) |
|          **AsyncStorage**          | Latest  | Theme persistence               |
| **react-native-safe-area-context** | Latest  | Safe area handling              |
|      **react-native-screens**      | Latest  | Native screen optimization      |
|    **react-native-reanimated**     | Latest  | Animations                      |

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

|        Tool         | Version |         Check Command          |
| :-----------------: | :-----: | :----------------------------: |
|     **Node.js**     |   18+   |        `node --version`        |
| **npm** or **yarn** | Latest  |        `npm --version`         |
|    **Expo CLI**     | Latest  |      `npx expo --version`      |
|       **Git**       | Latest  |        `git --version`         |
| **Android Studio**  | Latest  |      For Android emulator      |
|      **Xcode**      |   15+   | For iOS simulator (macOS only) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Bablu-Verma/expo-app-yt-clone.git

# 2. Navigate to project directory
cd expo-app-yt-clone

# 4. Install Expo dependencies
npx expo install

npx expo start

```
