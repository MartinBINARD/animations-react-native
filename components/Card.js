import { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const MARGIN_VERTICAL = 120;
const MARGIN_HORIZONTAL = 16;
const SPACE_BETWEEN_CARDS = 12;
const CARD_WIDTH = (SCREEN_WIDTH - MARGIN_HORIZONTAL * 2 - SPACE_BETWEEN_CARDS * 2) / 3;
const CARD_HEIGHT = (SCREEN_HEIGHT - MARGIN_VERTICAL * 2 - SPACE_BETWEEN_CARDS * 3) / 4;

export default function Card({ index, shouldDistribute, card }) {
    const animatedLeft = useRef(new Animated.Value(SCREEN_WIDTH / 2 - CARD_WIDTH / 2)).current;
    const animatedTop = useRef(new Animated.Value(SCREEN_HEIGHT / 2 - CARD_HEIGHT / 2)).current;
    const animatedRotation = useRef(new Animated.Value(0)).current;

    const distribute = () => {
        Animated.parallel([
            Animated.timing(animatedLeft, {
                toValue:
                    (index + 1) % 3 === 0 // troisième colonne
                        ? MARGIN_HORIZONTAL + CARD_WIDTH * 2 + SPACE_BETWEEN_CARDS * 2
                        : (index + 1) % 2 === 0 // 2ème colonne
                          ? MARGIN_HORIZONTAL + CARD_WIDTH + SPACE_BETWEEN_CARDS
                          : MARGIN_HORIZONTAL, // 1ère colonne
                duration: 1000,
                delay: index * 100, // Augmente le délai à chaque carte
                useNativeDriver: true,
            }),
            Animated.timing(animatedTop, {
                toValue:
                    index < 3 // 1ère ligne
                        ? MARGIN_VERTICAL
                        : index < 6 // 2ème ligne
                          ? MARGIN_VERTICAL + CARD_HEIGHT + SPACE_BETWEEN_CARDS
                          : index < 9 // 3ème ligne
                            ? MARGIN_VERTICAL + CARD_HEIGHT * 2 + SPACE_BETWEEN_CARDS * 2
                            : MARGIN_VERTICAL + CARD_HEIGHT * 3 + SPACE_BETWEEN_CARDS * 3, // 41me ligne
                duration: 1000,
                delay: index * 100, // Augmente le délai à chaque carte
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        if (shouldDistribute) {
            distribute();
        }
    }, [shouldDistribute]);

    const flipCard = () => {
        Animated.timing(animatedRotation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const spin = animatedRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateX: animatedLeft }, { translateY: animatedTop }],
                },
            ]}
        >
            <Pressable style={styles.cardContainer} onPress={flipCard}>
                <Animated.Image
                    style={[
                        styles.card,
                        styles.frontCard,
                        {
                            transform: [{ rotateY: spin }, { perspective: 1000 }],
                        },
                    ]}
                    resizeMode="contain"
                    source={card.source}
                />
                <Animated.Image
                    style={[
                        styles.card,
                        styles.backCard,
                        {
                            transform: [{ rotateY: spin }, { perspective: 1000 }],
                        },
                    ]}
                    resizeMode="contain"
                    source={require('../assets/pokeball.png')}
                />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: 'absolute',
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 8,
        backgroundColor: 'powderblue',
        position: 'absolute',
    },
    frontCard: {
        backgroundColor: 'coral',
    },
    backCard: {
        backgroundColor: 'powderblue',
    },
});
