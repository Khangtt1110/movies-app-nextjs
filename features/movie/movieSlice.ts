import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryDetailState {
    category: string;
    id: number;
    isLoading: boolean;
}

const initialState: CategoryDetailState = {
    category: "",
    id: 0,
    isLoading: false,
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setDetailState: (state: CategoryDetailState, { payload }: PayloadAction<any>) => {
            state.id = payload.id;
            state.category = payload.category;
            state.isLoading = true;
        },
        setCategory: (state: CategoryDetailState, { payload }: PayloadAction<any>) => {
            state.category = payload;
            state.isLoading = true;
        },
        setLoading: (state: CategoryDetailState, { payload }: PayloadAction<boolean>) => {
            state.isLoading = payload;
        },
    },
});

export const { setDetailState, setCategory, setLoading } = movieSlice.actions;
export const selectCategoryDetail = (state: any) => state.movie;
export const selectCategory = (state: any) => state.movie.category;
export const selectLoading = (state: any) => state.movie.isLoading;

export default movieSlice.reducer;
