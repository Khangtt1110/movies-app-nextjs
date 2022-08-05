import Iframe from "react-iframe";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../features/hooks";
import { MovieDetailState, selectMovieDetail } from "../../features/movie/movieSlice";
import moviesApi from "../../pages/api/moviesApi";
import { Video } from "../../models";

const TrailerVideo = () => {
    const [videoData, setVideoData] = useState<Video[]>([]);
    const movieDetail = useAppSelector<MovieDetailState>(selectMovieDetail);
    useEffect(() => {
        const getVideo = async () => {
            const response = await moviesApi.getTrailerVideo(movieDetail.category, movieDetail.id);
            setVideoData(response.results.slice(0, 4));
        };
        movieDetail && getVideo();
    }, [movieDetail, movieDetail.category, movieDetail.id]);
    console.log("videoData", videoData);

    return (
        <div>
            {videoData &&
                videoData.map((item) => (
                    <div key={item.id} style={{ width: 200, height: 200 }}>
                        <Iframe url={`http://www.youtube.com/embed/${item?.key}`} />
                    </div>
                ))}
        </div>
    );
};

export default TrailerVideo;
