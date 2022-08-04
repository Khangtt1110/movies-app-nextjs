import React from "react";
import { useEffect, useState } from "react";
import { Category } from "../../models";
import moviesApi from "../api/moviesApi";
import { MovieDetail } from "../../models/movies";
import { useAppSelector } from "../../redux/hooks";
import { selectMovieDetail } from "../../features/movie/movieSlice";

type Props = {
    category: string;
    id: number;
};

const MoviesDetail = (props: Props) => {
    const [movieData, setMovieData] = useState<MovieDetail>();
    const movieDetail = useAppSelector(selectMovieDetail);
    useEffect(() => {
        const getMovieDetail = async () => {
            const response = await moviesApi.getMovieDetail(props.category, props.id);
            setMovieData(response);
        };
        getMovieDetail();
    }, [props.category, props.id]);
    console.log("movieDetail", movieDetail);

    return <div>MoviesDetail</div>;
};

export default MoviesDetail;
