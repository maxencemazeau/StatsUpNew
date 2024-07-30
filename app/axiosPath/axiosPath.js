const baseUrl = `http://localhost:8080/`
//const baseUrl = `https://statsuptest.onrender.com/`
//const baseUrl = `http://192.168.0.13:8080/`;

export const getActivity = baseUrl + `userActivity`;
export const getUserGoals = baseUrl + `userGoal`;
export const userSignUp = baseUrl + `userSignUp`;
export const addActivity = baseUrl + `addActivity`;
export const addGoal = baseUrl + `addGoal`;
export const userLogin = baseUrl + `userLogin`;
export const activityWithNoGoal = baseUrl + `activityWithNoGoal`;
export const checkActivityNameDuplicate = baseUrl + `CheckActivityDuplicate`;
export const checkGoalNameDuplicate = baseUrl + `CheckGoalDuplicate`;
export const deleteActivity = baseUrl + `deleteActivity`
export const deleteGoal = baseUrl + `deleteGoal`
export const updateActivity = baseUrl + `updateActivity`
export const updateGoal = baseUrl + `updateGoal`
export const getAllUserGoal = baseUrl + `getAllUserGoal`
export const deleteActivityHistory = baseUrl + `deleteActivityHistory`
export const addActivityHistory = baseUrl + `addActivityHistory`
export const getUserActivityByID = baseUrl + `getUserActivityByID`
export const getTotalActivityCompleted = baseUrl + `getTotalActivityCompleted`