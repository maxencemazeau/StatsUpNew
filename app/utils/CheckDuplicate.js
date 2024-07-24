import { checkGoalNameDuplicate, checkActivityNameDuplicate } from "../axiosPath/axiosPath";
import axios from "axios";

export const CheckDuplicate = async (tableName, Name, UserId) => {
    let duplicate = 0
    if (tableName === "Activity") {
        const response = await axios.get(checkActivityNameDuplicate, { params: { UserID: UserId, ActivityName: Name } })
        if (response.data == 1) {
            duplicate = 1
        }
    } else {
        const response = await axios.get(checkGoalNameDuplicate, { params: { UserID: UserId, GoalName: Name } })
        if (response.data == 1) {
            duplicate = 1
        }
    }
    return duplicate
}