import React from "react"
import { View, StyleSheet } from "react-native";
import { Button } from "tamagui";
import { ArrowLeft } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router'
import useGetUserId from '../../hooks/useGetUserId';
import { useDispatch, useSelector } from "react-redux";

export default function HeadProfilSkeleton() {

    const dispatch = useDispatch()
    const myUserID = useGetUserId()
    const router = useRouter()
    const routes = useSelector((state) => state.globalNavigation.value)

    const navigateBack = () => {
        const index = routes.length - 1
        const path = routes[index]
        dispatch(DeleteRoute())
        if (path === '/pages/friendList/friendList') {
            router.push({
                pathname: path,
                params: { UserIdParams: myUserID }
            });
        } else {
            router.push(path);
        }
    }

    return (
        <>
            <View style={{ padding: 20, marginTop: 20 }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Button
                        icon={<ArrowLeft size="$2" color={`black`} />}
                        onPress={() => navigateBack()}
                        style={{ backgroundColor: 'transparent' }}
                    />
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <View style={styles.image} />
                    <View style={styles.skeletonText}></View>
                </View>
            </View >
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
    },
    image: {
        backgroundColor: "#E1E9EE",
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20
    }

})