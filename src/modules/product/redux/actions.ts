// import { Dispatch } from "redux";
// import {
//   FETCH_DATA_FAILURE,
//   FETCH_DATA_REQUEST,
//   FETCH_DATA_SUCCESS,
//   SEARCH_VALUE_ITEM,
// } from "./types";
// import axios from "axios";
// import { Data, SearchDataType } from "../components/interface";

// export const fetchDataRequest = () => ({
//   type: FETCH_DATA_REQUEST,
// });

// export const fetchDataSuccess = (data: Data) => ({
//   type: FETCH_DATA_SUCCESS,
//   payload: data,
// });

// export const fetchDataFailure = (error: any) => ({
//   type: FETCH_DATA_FAILURE,
//   payload: error,
// });

// type ValueOldTodoPayload = {
//   id?: string;
//   status?: string;
//   from?: string;
//   to?: string;
//   client?: string;
//   invoice?: string;
// };

// type ValueOldTodoAction = {
//   type: "SEARCH_VALUE_ITEM";
//   payload: ValueOldTodoPayload;
// };

// export const searchData = (
//   status?: string,
//   from?: string,
//   to?: string,
//   client?: string,
//   invoice?: string
// ): ValueOldTodoAction => ({
//   type: "SEARCH_VALUE_ITEM",
//   payload: {
//     status,
//     from,
//     to,
//     client,
//     invoice,
//   },
// });

// export const fetchData = (page: any) => {
//   return (dispatch: Dispatch) => {
//     dispatch(fetchDataRequest());
//     axios
//       .get("https://64425e4633997d3ef90e5bbe.mockapi.io/datas")
//       .then((response) => {
//         const data = response.data;
//         const startIndex = (page - 1) * 10;
//         const endIndex = startIndex + 10;
//         const pageData = data.slice(startIndex, endIndex);
//         dispatch(fetchDataSuccess(pageData));
//       })
//       .catch((error) => {
//         const errorMessage = error.message;
//         dispatch(fetchDataFailure(errorMessage));
//       });
//   };
// };

// export const deleteData = (id: string) => {
//   return (dispatch: Dispatch) => {
//     dispatch(fetchDataRequest());
//     axios.delete(`https://64425e4633997d3ef90e5bbe.mockapi.io/datas/${id}`);
//   };
// };
