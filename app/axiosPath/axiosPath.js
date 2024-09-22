//const baseUrl = `http://localhost:8080/`
//const baseUrl = process.env.EXPO_PUBLIC_RENDER_API_URL
const baseUrl = process.env.EXPO_PUBLIC_PANEL_API_URL
//const baseUrl = `http://0.0.0.0:10000`
//const baseUrl = process.env.EXPO_PUBLIC_LOCAL_API_URL
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
export const getActivityChartData = baseUrl + `getActivityChartData`
export const getActiviHistory = baseUrl + `getActivityHistory`
export const getUserGoalByID = baseUrl + `getUserGoalByID`
export const linkedActivityToGoal = baseUrl + `getLinkedActivityToGoal`
export const getAllActivityGoalStats = baseUrl + `getAllActivityGoalStats`
export const updateTimeActivityHistory = baseUrl + `updateActivityHistory`

//SearchFriend
export const getSearchUser = baseUrl + `getSearchUser`
export const followUser = baseUrl + `followUser`
export const unFollowUser = baseUrl + `unFollowUser`

//Profil
export const getProfilInfoAndStats = baseUrl + `getProfilInfoAndStats`
export const getActivityProfilList = baseUrl + `getActivityProfilList`
export const getBestGoalStreak = baseUrl + `getBestGoalStreak`
export const changeProfilPhoto = baseUrl + `changeProfilPhoto`

//Friend
export const getFriendList = baseUrl + `getFriendList`

//Feed
export const getFeed = baseUrl + `getFeed`