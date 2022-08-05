import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../features/hooks";
import { MovieDetailState, selectMovieDetail } from "../../features/movie/movieSlice";
import { MovieDetail } from "../../models/movies";
import { HOME_PATH } from "../../models/path";
import apiConfig from "../api/apiConfig";
import moviesApi from "../api/moviesApi";

import { convertTime } from "../../common/overText";
import styles from "./movieDetail.module.scss";
import CastList from "../../components/castList/catsList";

const MoviesDetail = () => {
    const router = useRouter();
    const [movieData, setMovieData] = useState<MovieDetail>();
    // get category and id to call api
    const movieDetail = useAppSelector<MovieDetailState>(selectMovieDetail);
    // get image path
    const background = useMemo(
        () => apiConfig.originalImage(movieData?.poster_path as string),
        [movieData?.poster_path],
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
        getMovieDetail();
    }, [movieDetail, router]);

    return (
        <div className={styles.container}>
            <div className={styles.poster} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.swapper}>
                <h1 className={styles.name}>{movieData?.title}</h1>
                <div className={styles.description}>
                    <div className={styles.date}>{convertTime(movieData?.runtime as number)}</div>
                    <div className={styles.types}>
                        {movieData?.genres &&
                            movieData?.genres.slice(0.3).map((item) => (
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
            </div>
        </div>
    );
};

export default MoviesDetail;
