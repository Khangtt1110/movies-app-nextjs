import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieDetailState {
    detail: {
        category: string;
        id: number;
    };
}

const initialState: MovieDetailState = {
    detail: {
        category: "",
        id: 0,
    },
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setDetailState: (state: MovieDetailState, { payload }: PayloadAction<any>) => {
            return {
                ...state,
                detail: payload,
            };
        },
    },
});

export const { setDetailState } = movieSlice.actions;
export const selectMovieDetail = (state: any) => state.movie.detail;
export default movieSlice.reducer;
