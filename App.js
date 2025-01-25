import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './components/Card';
import StartBtn from './components/StartBtn';
import { pokemonsArr } from './data';

export default function App() {
    const [shouldDistribute, setShouldDistribute] = useState(false);
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState([]);

    const evaluate = () => {
        if (openCards[0].type === openCards[1].type) {
            setClearedCards((prev) => [...prev, openCards[0].type]);
            setOpenCards([]);
        } else {
            setOpenCards([]);
        }
    };

    const handleCardPress = (card) => {
        setOpenCards((prev) => [...prev, card]);
    };

    useEffect(() => {
        if (openCards.length === 2) {
            setTimeout(evaluate, 500);
        }
    }, [openCards]);

    const startGame = () => {
        setShouldDistribute(true);
    };

    return (
        <View style={styles.container}>
            {pokemonsArr
                .sort(() => 0.5 - Math.random())
                .map((card, index) => (
                    <Card
                        key={card.id}
                        index={index}
                        shouldDistribute={shouldDistribute}
                        card={card}
                        onPressCard={handleCardPress}
                        isFlipped={!!openCards.find((el) => el.id === card.id)}
                        isCleared={clearedCards.includes(card.type)}
                    />
                ))}
            <StartBtn startGame={startGame} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
