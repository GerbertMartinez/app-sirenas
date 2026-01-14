import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

interface Props {
    children: React.ReactNode;
    trigger: number;
    primary: string;
    secondary: string;
}

const PulseView = ({ children, trigger, primary, secondary }: Props) => {

    const borderAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (trigger > 0) {

            Animated.loop(
                Animated.sequence([
                    Animated.timing(borderAnim, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: false
                    }),
                    Animated.timing(borderAnim, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: false
                    })
                ])
            ).start();

        } else {
            borderAnim.setValue(0);
        }
    }, [trigger]);

    const animatedBorderColor = borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [secondary, primary]
    });

    return (
        <View>
            <Animated.View
                style={{
                    borderWidth: trigger ? 2 : 0,
                    borderColor: animatedBorderColor,
                    borderRadius: 24
                }}
            >
                {children}
            </Animated.View>
        </View>
    );
};

export default PulseView;