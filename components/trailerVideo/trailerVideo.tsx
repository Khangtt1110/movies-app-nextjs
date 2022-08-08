import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../features/hooks";
import { MovieDetailState, selectMovieDetail } from "../../features/movie/movieSlice";
import moviesApi from "../../pages/api/moviesApi";
import { Video } from "../../models";

import styles from "./trailerVideo.module.scss";

const TrailerVideo = () => {
    const [videoData, setVideoData] = useState<Video[]>([]);
    const movieDetail = useAppSelector<MovieDetailState>(selectMovieDetail);

    useEffect(() => {
        // fetch api
        const getVideo = async () => {
            const response = await moviesApi.getTrailerVideo(movieDetail.category, movieDetail.id);
            // get 4 video from api
            setVideoData(response.results.slice(0, 4));
        };
        // check reload page
        if (movieDetail.id !== 0) {
            getVideo();
        }
    }, [movieDetail, movieDetail.category, movieDetail.id]);

    return (
        <div className={styles.container}>
            {videoData &&
                videoData.map((item) => (
                    <div key={item.id} className={styles.video}>
                        <h1 className={styles.title}>{item.name}</h1>
                        <iframe src={`https://www.youtube.com/embed/${item?.key}`} />
                    </div>
                ))}
        </div>
    );
};

export default TrailerVideo;
