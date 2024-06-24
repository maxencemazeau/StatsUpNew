// import React from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { loadingError } from "../../reduxState/error/loadingErrorSlice";

// export default function PopUpAxiosError() {

//     const dispatch = useDispatch()

//     const closeErrorMessage = () => {
//         dispatch(loadingError(false))
//     }

//     return(
//         <Container sx={{position:"absolute", display:"flex", justifyContent:"center", alignContent:"center", padding:0, bottom:20, width:"100%", left:0}}>
//             <Alert sx={{ fontSize:16}} severity="error" onClose={() => {closeErrorMessage()}}>An error occurred please try again.</Alert>
//         </Container>    
//     )
// }