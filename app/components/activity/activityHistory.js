import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import { Text, Button } from "tamagui"
import { useQuery, useQueryClient } from "react-query";
import axios from "axios"
import { getActiviHistory } from '../../axiosPath/axiosPath';
import { Circle, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from '@tamagui/lucide-icons';

export default function ActivityHistory({ activityID }) {

    const [offset, setOffset] = useState(0)
    const [numberOfPage, setNumberOfPage] = useState(0)
    const [actualPageNumber, setActualPageNumber] = useState(1)
    const [noMoreHistory, setNoMoreHistory] = useState(false)
    const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(false)
    const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false)
    const queryClient = useQueryClient()


    const { data: activityHistory, isLoading } = useQuery({
        queryFn: async () => LoadActivityHistory(),
        queryKey: ["activityHistory"],
    })

    const LoadActivityHistory = async () => {
        const response = await axios.get(getActiviHistory, { params: { ActivityID: activityID, Offset: offset } });
        setNumberOfPage(response.data.numberOfPage)
        setNoMoreHistory(response.data.noMoreData)
        setIsLeftButtonDisabled(true)
        if (response.data.numberOfPage === 1) {
            setIsRightButtonDisabled(true)
        }
        return response.data.activityHistory
    };

    const previousHistoryData = async () => {
        if (actualPageNumber > 1) {
            const response = await axios.get(getActiviHistory, { params: { ActivityID: activityID, Offset: offset - 5 } });
            queryClient.setQueryData("activityHistory", response.data.activityHistory);
            setOffset(prevState => prevState - 5)
            setActualPageNumber(prevState => prevState - 1)
            setIsRightButtonDisabled(false)
            setNoMoreHistory(false)
            const isFirstPage = actualPageNumber - 1
            if (isFirstPage === 1) {
                setIsLeftButtonDisabled(true)
            }
        }
    }

    const nextHistoryData = async () => {
        if (noMoreHistory === false) {
            const response = await axios.get(getActiviHistory, { params: { ActivityID: activityID, Offset: offset + 5 } });
            queryClient.setQueryData("activityHistory", response.data.activityHistory);
            setNoMoreHistory(response.data.noMoreData)
            setActualPageNumber(prevState => prevState + 1)
            setOffset(prevState => prevState + 5)
            setIsLeftButtonDisabled(false)
            setIsRightButtonDisabled(response.data.noMoreData)
        }
    }

    return (
        <View>
            <Text style={{ fontSize: 18, color: "black", paddingTop: 15, paddingBottom: 5 }}>History</Text>
            {activityHistory?.map(history => (
                <View key={history.ActivityHistoryID} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", padding: 10, backgroundColor: "white", borderRadius: 10, marginBottom: 10 }}>
                    {history.Succeed === 1 ? (
                        <>
                            <CheckCircle2 color={"green"} />
                            <Text style={{ fontSize: 14, color: 'green' }}>
                                {history.Count}/{history.Frequence}
                            </Text>
                        </>
                    ) : history.Succeed === -1 ? (
                        <>
                            <XCircle color={"#D34146"} />
                            <Text style={{ fontSize: 14, color: '#D34146' }}>
                                {history.Count}/{history.Frequence}
                            </Text>
                        </>
                    ) : (
                        <>
                            <Circle color={"grey"} />
                            <Text style={{ fontSize: 14, color: 'grey' }}>
                                {history.Count}/{history.Frequence}
                            </Text>
                        </>
                    )}
                    <Text style={{ fontSize: 14, color: "black" }}>{history.TimeStamp}</Text>
                </View>
            ))}
            <View style={{ display: "flex", flexDirection: "row", alignItems: 'center', gap: 10 }}>
                <Button icon={<ChevronLeft size={"$1"} />} onPress={() => previousHistoryData()} disabled={isLeftButtonDisabled} />
                <View style={{ ...styles.flexContainer, backgroundColor: "#191919", height: 44, width: 60, borderRadius: 10 }}>
                    <Text style={{ fontSize: 16, color: "white" }}>{actualPageNumber}/{numberOfPage}</Text>
                </View>
                <Button icon={<ChevronRight size={"$1"} />} onPress={() => nextHistoryData()} disabled={isRightButtonDisabled} />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex', flexDirection: 'row',
        alignItems: 'center', justifyContent: "center",
    },
    pageButton: {
        backgroundColor: "#DD7A34"
    }

});