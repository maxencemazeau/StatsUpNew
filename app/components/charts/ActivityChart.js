import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getActivityChartData } from '../../axiosPath/axiosPath';
import { months } from '../../data/months';
import { weekDay } from '../../data/weekDay';

export default function ActivityChart({ UserId, ChartTimeFrame, ActivityId }) {

    const [chartData, setChartData] = useState([])
    const screenWidth = Dimensions.get("window").width;
    const [chartLabel, setChartLabel] = useState([])
    const [xDataArray, setXDataArray] = useState([])
    const thisMonthLabel = []
    let i = 1

    useEffect(() => {
        const getActivityData = async () => {
            const response = await axios.get(getActivityChartData, { params: { UserId: UserId, ChartFrame: ChartTimeFrame, ActivityId: ActivityId } })
            console.log(response.data)
            setChartData(response.data)
        }

        getActivityData()
    }, [ChartTimeFrame])


    useEffect(() => {
        const createData = () => {
            setXDataArray([])
            setChartLabel(weekDay)
            let matching = false
            switch (ChartTimeFrame) {
                case 1:
                    setChartLabel(weekDay)
                    for (i = 0; i < weekDay.length; i++) {
                        matching = false
                        for (j = 0; j < chartData.length; j++) {
                            let chartDate = chartData[j].TimeStamp
                            let newDate = new Date(chartDate)
                            let theDay = newDate.getUTCDay() - 1
                            if (parseInt(theDay) === i) {
                                let NbActivity = chartData[j].NbActivity
                                setXDataArray(prevState => [...prevState, NbActivity])
                                matching = true
                            }
                        }

                        if (!matching) {
                            setXDataArray(prevState => [...prevState, 0])
                        }
                    }
                    break;
                case 2:
                    setChartLabel("")
                    matching = false
                    let newArrayTest = []
                    let todayDate = new Date()
                    let dayMax = todayDate.getDate()
                    let halfMonthDate = Math.ceil(dayMax / 2)
                    while (i <= dayMax) {
                        matching = false
                        for (j = 0; j < chartData.length; j++) {
                            let chartDate = chartData[j].TimeStamp
                            let NbActivity = chartData[j].NbActivity
                            chartDate = new Date(chartDate).getDate()
                            if (chartDate === i) {
                                setXDataArray(prevState => [...prevState, NbActivity])
                                matching = true
                            }
                        }
                        if (!matching) {
                            setXDataArray(prevState => [...prevState, 0])
                        }

                        if (dayMax < 25) {
                            if (i === halfMonthDate || i === 1 || i === dayMax) {
                                newArrayTest.push(i)
                            } else {
                                newArrayTest.push("")
                            }
                        }
                        i++
                    }
                    setChartLabel(newArrayTest)
                    break;
                case 3:
                    setChartLabel(months)
                    for (i = 0; i < months.length; i++) {
                        matching = false
                        for (j = 0; j < chartData.length; j++) {
                            let theMonth = chartData[j].TimeStamp.substring(6, 7)
                            if (parseInt(theMonth) === i) {
                                let NbActivity = chartData[j].NbActivity
                                setXDataArray(prevState => [...prevState, NbActivity])
                                matching = true
                            }
                        }

                        if (!matching) {
                            setXDataArray(prevState => [...prevState, 0])
                        }
                    }
                    break;
                case 4:

                    break;

            }
        }

        console.log(xDataArray)

        createData()
    }, [chartData])


    const data = {
        labels: chartLabel,
        datasets: [
            {
                data: xDataArray,
                color: (opacity = 1) => `rgba(221, 122, 52, ${opacity})`, // optional
                strokeWidth: 3 // optional
            }
        ],
    };

    return (
        <>
            <LineChart
                data={data}
                width={screenWidth} // from react-native
                height={300}
                chartConfig={{
                    backgroundColor: "#191919",
                    backgroundGradientFrom: "#191919",
                    backgroundGradientTo: "#191919",
                    color: (opacity = 1) => `rgba(221, 122, 52, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                }}
                bezier
            />
        </>
    )
}

