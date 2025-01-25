import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Card from './components/Card';
import StartBtn from './components/StartBtn';
import { pokemonsArr } from './data';

export default function App() {
    const [shouldDistribute, setShouldDistribute] = useState(false);

    const startGame = () => {
        setShouldDistribute(true);
    };
    return (
        <View style={styles.container}>
            {pokemonsArr.map((card, index) => (
                <Card key={card.id} index={index} shouldDistribute={shouldDistribute} />
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
