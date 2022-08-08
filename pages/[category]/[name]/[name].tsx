import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../features/hooks";
import { MovieDetailState, selectMovieDetail } from "../../../features/movie/movieSlice";
import { CategoryDetail, MovieDetail } from "../../../models/movies";
import { HOME_PATH } from "../../../models/path";
import apiConfig from "../../api/apiConfig";
import moviesApi from "../../api/moviesApi";

import { convertTime, stringToDate } from "../../../common/overText";
import styles from "./movieDetail.module.scss";
import CastList from "../../../components/castList/catsList";
import React from "react";
import TrailerVideo from "../../../components/trailerVideo/trailerVideo";

const MoviesDetail = () => {
    const router = useRouter();
    const [movieData, setMovieData] = useState<CategoryDetail>();
    // get category and id to call api
    const movieDetail = useAppSelector<MovieDetailState>(selectMovieDetail);
    // get image path
    const background = useMemo(
        () => (movieData ? apiConfig.originalImage(movieData?.poster_path as string) : ""),
        [movieData],
    );
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
        movieDetail && getMovieDetail();
    }, [movieDetail, router]);
    console.log(movieData?.id);

    return (
        <div className={styles.container}>
            <div className={styles.poster} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.swapper}>
                <h1 className={styles.name}>{movieData?.title || movieData?.name}</h1>
                <div className={styles.description}>
                    {movieData?.runtime ? (
                        <div className={styles.date}>
                            {convertTime(movieData?.runtime as number)}
                        </div>
                    ) : (
                        <div className={styles.date}>
                            {stringToDate(movieData?.first_air_date as string)?.slice(3) +
                                " - " +
                                stringToDate(movieData?.last_air_date as string)?.slice(3)}
                        </div>
                    )}
                    <div className={styles.types}>
                        {movieData?.genres &&
                            movieData?.genres.slice(0, 3).map((item) => (
                                <div key={item.id} className={styles.element}>
                                    {item.name}
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.title}>About the movie</div>
                <div>{movieData?.overview}</div>
                <div className={styles.title}>Casts</div>
                <CastList category={movieDetail.category} id={movieDetail.id} />
                <div className={styles.title}>Trailer</div>
                <TrailerVideo />
            </div>
        </div>
    );
};

export default MoviesDetail;
