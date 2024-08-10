import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { getActivityChartData } from '../../axiosPath/axiosPath';

export default function ActivityChart({ UserId, ChartTimeFrame, ActivityId }) {

    const [chartData, setChartData] = useState([])
    const screenWidth = Dimensions.get("window").width;
    const chartLabel = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [chartsData, setChartsData] = useState([])

    useEffect(() => {
        const getActivityData = async () => {
            const response = await axios.get(getActivityChartData, { params: { UserId: UserId, ChartFrame: ChartTimeFrame, ActivityId: ActivityId } })
            console.log("the data" + response.data)
            setChartData(response.data)
        }

        getActivityData()
    }, [ChartTimeFrame])


    useEffect(() => {
        const createData = () => {
            switch (ChartTimeFrame) {
                case 1:
                    const datas = Array(chartLabel.length).fill(0);
                    if (chartData.length > 0) {
                        chartData.forEach(item => {
                            const index = chartLabel.indexOf(item.days);
                            if (index !== -1) {
                                datas[index] = item.activityCount;
                            }
                        });
                        setChartsData([0, 0, 0, 0, 0, 0, 0]);
                    } else {
                        setChartsData([0, 0, 0, 0, 0, 0, 0])
                    }
                    break;
                case 2:
                    break;

            }
        }

        createData()
    }, [chartData])


    const data = {
        labels: chartLabel,
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0],
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

