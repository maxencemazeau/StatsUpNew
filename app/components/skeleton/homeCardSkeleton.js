import React from "react"
import { View, StyleSheet } from "react-native";
import { Card } from "tamagui";

export default function HomeCardSkeleton() {

    return (
        <>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View>
                        <View style={styles.skeletonTitle} />
                        <View style={styles.skeletonText} />
                    </View>
                    <View style={styles.skeletonCircular} />
                </Card.Header>
            </Card>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        marginBottom: 15
    },
    cardHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 10
    },
    skeletonTitle: {
        backgroundColor: "#E1E9EE",
        borderRadius: 15,
        height: 40,
        width: 150,
        marginBottom: 10
    },
    skeletonText: {
        backgroundColor: "#E1E9EE",
        borderRadius: 15,
        height: 25,
        width: 200,
        marginBottom: 10
    },
    skeletonCircular: {
        backgroundColor: "#E1E9EE",
        borderRadius: 50,
        height: 75,
        width: 75
    }

})