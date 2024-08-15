import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Progress } from 'tamagui';

export default function ProgressBar() {
    const [progress, setProgress] = React.useState(45);


    return (
        <>
            <View style={styles.container}>
                <Text style={styles.typography}>Next reward</Text>
                <Text style={styles.typography}>{progress}%</Text>
            </View>
            <View style={styles.progressBar}>
                <Progress size={"$6"} value={progress} max={100}>
                    <Progress.Indicator style={{ backgroundColor: "#DD7A34" }} animation="bouncy" />
                </Progress>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20
    },
    typography: {
        color: "black",
        marginBottom: 8
    },
    progressBar: {
        paddingRight: 20,
        paddingLeft: 20
    }
})
