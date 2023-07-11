import {
  cursorWaitOff,
  cursorWaitOn,
  hideLoader,
  hideSmallLoader, removeRequestGetWorkouts,
  setError, setRequestGetWorkouts,
  showLoader,
  showSmallLoader
} from "../reducers/appReducer.js";
import {
  addChartsData,
  addPolyline, addPowerCurve,
  addWorkout, addWorkouts,
  changeWorkoutAction,
  deleteWorkoutAction, removeFilesToDelete, setNumberOfFiles, setOneWorkout,
  setWorkouts
} from "../reducers/workoutsReducer.js";
import axios from "axios";
import {API_URL} from "../../config/config";
import {logout} from "../reducers/userReducer";
import {auth} from "./user";


export function uploadWorkouts(files) {
  return async dispatch => {
    dispatch(cursorWaitOn())
    async function upload(file){

      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post(`${API_URL}api/workouts/upload`, formData, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        });
        dispatch(addWorkout(response.data))
      } catch (e) {
        if (e?.response?.status === 400) {
          dispatch(addWorkout(e.response.data?.message))
        } else if (e?.response?.status === 500) {
          console.log("server error", e?.response)
          dispatch(addWorkout("error"))
        } else {
          dispatch(addWorkout("unknown error"))
          console.log("unknown error", e)
        }
      }
    }
    let time = Date.now();
    for (const file of files) {
      const index = files.indexOf(file);
      await upload(file)
        .then(() => console.log(index, Date.now() - time));
    }
    dispatch(cursorWaitOff())
  }
}

export function getWorkouts(sport, sort, direction, page, limit, search, _id) {
  return async dispatch => {
    try {
      console.log('get')
      dispatch(setRequestGetWorkouts())
      dispatch(showLoader())
      let url = `${API_URL}api/workouts`

      sport = sport ? `sport=${sport}&` : ''
      sort = sort ? `sort=${sort}&` : ''
      direction = direction ? `direction=${direction}&` : ''
      let pageNum = page ? `page=${page}&` : ''
      limit = limit ? `limit=${limit}&` : ''
      search = search ? `search=${search}&` : ''
      _id = _id ? `id=${_id}` : ''

      if(sport || sort || direction || pageNum || limit || search){
        url = url + '?' + sport + sort + direction + pageNum + limit + search + _id
      }

      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch(setNumberOfFiles(response.headers['file-length']))
      if(page === 1){
        dispatch(setWorkouts(response.data))
      } else {
        dispatch(addWorkouts(response.data))
      }
      // dispatch(removeRequest())
      // console.timeEnd(a)
     } catch (e) {
      console.log(e)
    } finally {
      dispatch(removeRequestGetWorkouts())
      dispatch(hideLoader())
      // dispatch(removeRequest())
    }
  }
}


export function getStats(sport, startDate, endDate) {
  return async dispatch => {
    try {
      // dispatch(setRequestGetWorkouts())
      dispatch(showLoader())
      // dispatch(showLoader())
      let url = `${API_URL}api/workouts/stats`

      sport = sport ? `sport=${sport}&` : ''
      startDate = startDate ? `startDate=${startDate}&` : ''
      endDate = endDate ? `endDate=${endDate}&` : ''

      if(sport || startDate || endDate){
        url = url + '?' + sport + startDate + endDate
      }

      const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      });
      dispatch(setNumberOfFiles(response.headers['file-length']))
      dispatch(setWorkouts(response.data))

    } catch (e) {
      console.log(e)
    } finally {
      // dispatch(removeRequestGetWorkouts())
      // dispatch(hideLoader())
      dispatch(hideLoader())
      // dispatch(removeRequest())
    }
  }
}


export function getPolyline(_id){
  return async dispatch => {
    try {
        const response = await axios.get(`${API_URL}api/workouts/polyline?id=${_id}`,
          {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addPolyline(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
    }
  }
}

export function getChartsData(_id){
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.get(`${API_URL}api/workouts/chartsdata?id=${_id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addChartsData(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function getPowerCurve(_id){
  return async dispatch => {
    // dispatch(showLoader());
    try {
      const response = await axios.get(`${API_URL}api/workouts/powercurve?id=${_id}`,
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
      dispatch(addPowerCurve(response.data))
    } catch (e) {
      console.log(e?.response?.data?.message)
    } finally {
      // dispatch(hideLoader())
    }
  }
}

export function deleteOneWorkout(_id) {
  console.log('deleteOneWorkout', _id)
  return async dispatch => {
    try {
      // dispatch(showSmallLoader(_id));
      const response = await axios.delete(`${API_URL}api/workouts?id=${_id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response)
      if (response.status === 200){
        dispatch(deleteWorkoutAction(_id))
      }
      return response.statusText
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(removeFilesToDelete(_id))
      dispatch(auth())
      dispatch(hideSmallLoader(_id))
    }
  }
}


export function deleteAllWorkouts() {
  console.log('deleteAllWorkouts')
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.delete(`${API_URL}api/workouts/all`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        dispatch(setWorkouts([]))
        dispatch(auth())
        return 'OK'
      }
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideLoader())
    }
  }
}

export function deleteUserWorkouts() {
  console.log('deleteUserWorkouts')
  return async dispatch => {
    try {
      dispatch(showLoader());
      const response = await axios.delete(`${API_URL}api/workouts/user`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.status === 200){
        dispatch(dispatch(logout()))
        return 'OK'
      }
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(auth())
      dispatch(hideLoader())
    }
  }
}


export function editWorkout(id, field, text) {
  return async dispatch => {
    try {
      dispatch(showSmallLoader(id));
      const response = await axios.post(`${API_URL}api/workouts/edit`, {
        id,
        field,
        text
      },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      if(response.status === 200)
        dispatch(changeWorkoutAction(response.data.workout))
    } catch (e) {
      console.log(e)
      dispatch(setError(e))
    } finally {
      dispatch(hideSmallLoader(id))
    }
  }
}

// export function uploadWorkouts(file) {
//   return async dispatch => {
//     try {
//       const formData = new FormData()
//       formData.append('file', file)
//       // const uploadWorkouts = {name: file.name, progress: 0, id: Date.now()}
//       // dispatch(addUploadFile(uploadWorkouts))
//       const response = await axios.post(`${API_URL}api/workouts/upload`, formData, {
//         headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
//         // onUploadProgress: progressEvent => {
//         //   let totalLength = progressEvent.event.lengthComputable
//         //     ? progressEvent.total
//         //     : progressEvent.event.target.getResponseHeader('content-length')
//         //     || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
//         //   if (totalLength) {
//         //     uploadWorkouts.progress = Math.round((progressEvent.loaded * 100) / totalLength)
//             // dispatch(changeUploadFile(uploadWorkouts))
//             // console.log(uploadWorkouts.progress)
//         //   }
//         // }
//       });
//       dispatch(addWorkout(response.data))
//       dispatch(addSport(response.data.sport))
//     } catch (e) {
//       if(e?.response?.status === 400){
//         dispatch(addWorkout(e.response.data?.message))
//       }
//       else if(e?.response?.status === 500){
//         console.log("server error", e?.response)
//         dispatch(addWorkout("error"))
//       }
//       else {
//         dispatch(addWorkout("unknown error"))
//         console.log("unknown error", e)
//       }
//     } finally {
//     }
//   }
// }



// export function getOneFile(_id){
//   return async dispatch => {
//     try {
//       // console.time('getOneFile')
//       dispatch(showLoader())
//       const response = await fetch(`${API_URL}api/workouts/download?id=${_id}`,{
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//       if (response.status === 200) {
//         const blob = await response.blob()
//         const parseFile = await parseFit(blob)
//         dispatch(setOneWorkout(parseFile))
//         // dispatch(addSport(parseFile.sport))
//       }
//
//     } catch (e) {
//       console.log(e?.response?.data?.message)
//       alert(e?.response?.data?.message)
//     } finally {
//       dispatch(hideLoader())
//       // console.timeEnd('getOneFile')
//     }
//   }
// }





