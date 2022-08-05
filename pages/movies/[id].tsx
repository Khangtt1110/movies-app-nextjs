import React from "react";
import { useEffect, useState } from "react";
import { Category } from "../../models";
import moviesApi from "../api/moviesApi";
import { MovieDetail } from "../../models/movies";
import { selectMovieDetail, MovieDetailState } from "../../features/movie/movieSlice";
import { useAppSelector } from "../../features/hooks";
import { useRouter } from "next/router";
import { HOME_PATH } from "../../models/path";
import apiConfig from "../api/apiConfig";
import Image from "next/image";

import styles from "./movieDetail.module.scss";

type Props = {
    category: string;
    id: number;
};

const MoviesDetail = () => {
    const [movieData, setMovieData] = useState<MovieDetail>();
    const router = useRouter();
    // get category and id to call api
    const movieDetail = useAppSelector<MovieDetailState>(selectMovieDetail);
    // get image path
    const background = apiConfig.originalImage(movieData?.backdrop_path as string);
    // fetch data
    useEffect(() => {
        // check reload page
        if (movieDetail.id === 0 || movieDetail.category === "") {
            router.push(HOME_PATH);
        }
        // get api
        const getMovieDetail = async () => {
            const response = await moviesApi.getMovieDetail(movieDetail.category, movieDetail.id);
            setMovieData(response);
        };
        getMovieDetail();
    }, [movieDetail, router]);
    console.log("movieData", movieData);

    return (
        <div className={styles.container}>
            <div className={styles.title} style={{ backgroundImage: background }}>
                {movieData?.title}
            </div>
            <div className={styles.poster}>
                <Image
                    src={apiConfig.originalImage(movieData?.poster_path as string)}
                    alt=""
                    width={200}
                    height={300}
                />
            </div>

            <div className={styles.description}>
                <div>{movieData?.overview}</div>
            </div>
        </div>
    );
};

export default MoviesDetail;
