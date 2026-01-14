import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface Props {
    color: string;
    sounding: number;
};

const SirenPulse = ({ color, sounding }: Props) => {

    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {

        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(scale, {
                        toValue: 1.3,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(scale, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.4,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
        
    }, []);

    return (
        <Animated.View
            style={{
                marginLeft: 10,
                transform: [{ scale }],
                opacity,
            }}
        >
            <Ionicons name="megaphone-outline" size={20} color={color} />
        </Animated.View>
    );
    
};

export default SirenPulse;