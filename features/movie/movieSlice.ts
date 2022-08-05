import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieDetailState {
    category: string;
    id: number;
}

const initialState: MovieDetailState = {
    category: "",
    id: 0,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setDetailState: (state: MovieDetailState, { payload }: PayloadAction<any>) => {
            state.id = payload.id;
            state.category = payload.category;
        },
    },
});

export const { setDetailState } = movieSlice.actions;
export const selectMovieDetail = (state: any) => state.movie;
export default movieSlice.reducer;
