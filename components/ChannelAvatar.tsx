import React from "react";
import { Image, View } from "react-native";

interface ChannelAvatarProps {
    uri: string;
    size?: number;
}

const ChannelAvatar: React.FC<ChannelAvatarProps> = ({ uri, size = 36 }) => {
    return (
        <View
            style={{ width: size, height: size, borderRadius: size / 2, overflow: "hidden" }}
        >
            <Image
                source={{ uri }}
                style={{ width: size, height: size }}
                className="rounded-full"
            />
        </View>
    );
};

export default React.memo(ChannelAvatar);