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
    const [segmentNumber, setSegmentNumber] = useState(0)
    const [fromZero, setFromZero] = useState(false)
    let i = 1

    useEffect(() => {
        const getActivityData = async () => {
            const response = await axios.get(getActivityChartData, { params: { UserId: UserId, ChartFrame: ChartTimeFrame, ActivityId: ActivityId } })
            setChartData(response.data)
        }

        getActivityData()
    }, [ChartTimeFrame])


    useEffect(() => {
        const createData = () => {
            setXDataArray([])
            setChartLabel([])
            let newXDataArray = []
            let matching = false
            let NbActivity = 0
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
                                NbActivity = chartData[j].NbActivity
                                newXDataArray.push(NbActivity)
                                matching = true
                            }
                        }

                        if (!matching) {
                            newXDataArray.push(0)
                        }
                    }
                    setXDataArray(newXDataArray)
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
                            NbActivity = chartData[j].NbActivity
                            chartDate = new Date(chartDate).getDate()
                            if (chartDate === i) {
                                newXDataArray.push(NbActivity)
                                matching = true
                            }
                        }
                        if (!matching) {
                            newXDataArray.push(0)
                        }

                        i++
                    }
                    setXDataArray(newXDataArray)
                    setChartLabel(months)
                    break;
                case 3:
                    setChartLabel(months)
                    for (i = 0; i < months.length; i++) {
                        matching = false
                        for (j = 0; j < chartData.length; j++) {
                            let theMonth = chartData[j].TimeStamp.substring(6, 7)
                            if (parseInt(theMonth) === i + 1) {
                                NbActivity = chartData[j].NbActivity
                                newXDataArray.push(NbActivity)
                                matching = true
                            }
                        }

                        if (!matching) {
                            newXDataArray.push(0)
                        }
                    }
                    setXDataArray(newXDataArray)
                    break;
                case 4:
                    const today = new Date();
                    const currentMonth = today.getMonth(); // 0-11 (Janvier est 0)

                    for (let i = 0; i < 3; i++) {
                        matching = false
                        const monthIndex = (currentMonth - i + 12) % 12;
                        setChartLabel(prevState => [...prevState, months[monthIndex]])
                        for (j = 0; j < chartData.length; j++) {
                            NbActivity = chartData[j].NbActivity
                            const realMonthIndex = monthIndex + 1

                            let chartMonth = chartData[j].TimeStamp.substring(6, 7)

                            if (parseInt(chartMonth) === realMonthIndex) {
                                newXDataArray.push(NbActivity)
                                matching = true
                            }
                        }
                        if (!matching) {
                            newXDataArray.push(0)
                        }
                    }
                    setXDataArray(newXDataArray)
                    break;
                case 5:
                    let year = ""
                    setChartLabel(prevState => [...prevState, ""])
                    setXDataArray(prevState => [...prevState, 0])
                    for (i = 0; i < chartData.length; i++) {
                        NbActivity = chartData[i].NbActivity
                        year = chartData[i].TimeStamp
                        newXDataArray.push(NbActivity)
                        setXDataArray(prevState => [...prevState, parseInt(NbActivity)])
                        setChartLabel(prevState => [...prevState, year])
                    }
                    break
            }
            let maxNbActivity = Math.max(...newXDataArray.map(item => item))
            if (maxNbActivity === 1) {
                setSegmentNumber(1)
                setFromZero(false)
            } else {
                setSegmentNumber(maxNbActivity)
                setFromZero(true)
            }
        }

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
            {xDataArray.length > 0 && chartLabel.length > 0 && (
                <LineChart
                    data={data}
                    width={screenWidth - 20} // from react-native
                    height={300}
                    chartConfig={{
                        backgroundColor: "#191919",
                        backgroundGradientFrom: "#191919",
                        decimalPlaces: 0,
                        propsForBackgroundLines: {
                            strokeDasharray: '' // Make sure background lines are not visible if not needed
                        },
                        backgroundGradientTo: "#191919",
                        color: (opacity = 1) => `rgba(221, 122, 52, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                    }}
                    segments={segmentNumber}
                    withInnerLines={false} // add this line
                    fromZero={fromZero}
                    bezier
                />
            )}
        </>
    )
}

