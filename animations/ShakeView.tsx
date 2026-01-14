import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
    children: React.ReactNode;
    trigger: boolean;
}

const ShakeView = ({ children, trigger }: Props) => {
    
    const shakeValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (trigger) {

            shakeValue.setValue(0);

            Animated.sequence([
                Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeValue, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();

        }
    }, [trigger]);

    return (
        <Animated.View style={{ transform: [{ translateX: shakeValue }] }}>
            {children}
        </Animated.View>
    );
};

export default ShakeView;