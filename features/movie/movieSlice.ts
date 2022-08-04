import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieDetailState {
    category: string;
    id: number;
}

const initialState: MovieDetailState = {
    category: "123213",
    id: 0,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setDetailState: (state: MovieDetailState, payload: PayloadAction<MovieDetailState>) => {
            // {
            //     state.category = payload;
            // }
        },
    },
});

export const { setDetailState } = movieSlice.actions;
export const selectMovieDetail = (state: any) => state.movie.category;
export default movieSlice.reducer;
