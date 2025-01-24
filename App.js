import { StyleSheet, View } from 'react-native';
import StartBtn from './components/StartBtn';

export default function App() {
    return (
        <View style={styles.container}>
            <StartBtn />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
