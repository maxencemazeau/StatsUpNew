import React from "react"
import { View, StyleSheet } from "react-native";
import { Card } from "tamagui";

export default function FeedSkeleton() {


    return (
        <>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View style={styles.skeletonCircular} />
                    <View style={styles.skeletonTitle} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View style={styles.skeletonCircular} />
                    <View style={styles.skeletonTitle} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View style={styles.skeletonCircular} />
                    <View style={styles.skeletonTitle} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View style={styles.skeletonCircular} />
                    <View style={styles.skeletonTitle} />
                </Card.Header>
            </Card>
            <Card style={styles.card}>
                <Card.Header style={styles.cardHeader}>
                    <View style={styles.skeletonCircular} />
                    <View style={styles.skeletonTitle} />
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
        gap: 20,
        paddingBottom: 10
    },
    skeletonTitle: {
        backgroundColor: "#E1E9EE",
        borderRadius: 15,
        height: 60,
        width: 245,
        marginBottom: 10
    },
    skeletonCircular: {
        backgroundColor: "#E1E9EE",
        borderRadius: 50,
        height: 60,
        width: 60
    }

})