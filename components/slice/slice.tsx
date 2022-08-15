import { CircularProgress, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    getAnotherName,
    getLastName,
    overText,
    stringToDate,
    totalRate,
} from "../../common/overText";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import apiConfig from "../../pages/api/apiConfig";

import { Autoplay, Lazy, Pagination } from "swiper";
import { Category, CategoryData, Genres, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import styles from "./slice.module.scss";
import { useEffect, useState } from "react";
import categoryApi from "../../pages/api/categoryApi";

type Props = {
    data: CategoryData[];
    cate: string;
};

const Slice = (props: Props) => {
    const [genres, setGenres] = useState<Genres>();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const path = props.cate === Category.movie ? MOVIES_PATH : TV_SHOW_PATH;

    // get background path and set opacity
    const background = (backdrop: string, poster: string) =>
        `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url(${apiConfig.originalImage(
            backdrop || poster,
        )})`;

    /**
     * handle redirect to category detail
     * @param id
     * @param title
     */
    const handleSliceClick = (id: number, title: string) => {
        const movieType = {
            category: props.cate,
            id: id,
        };
        // add to redux store
        dispatch(setDetailState(movieType));

        // get path
        router.push(
            {
                pathname: `${path}/${title} `,
                query: {
                    id: id,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    useEffect(() => {
        const getGenres = async () => {
            const response = await categoryApi.getGenres();
            setGenres(response);
        };

        getGenres();
    }, []);

    console.log(genres);

    return (
        <Typography className={`col-12 ${styles.container}`}>
            {props.data.map((item) => (
                <Typography
                    key={item.id}
                    style={{ background: background(item.backdrop_path, item.poster_path) }}
                    className={`${styles.background}`}
                >
                    <Typography className="container">
                        <Typography className={styles.title}>NEW RELEASES</Typography>

                        <div
                            className={`row  ${styles.name}`}
                            onClick={() => {
                                handleSliceClick(item.id, item.title);
                            }}
                        >
                            <Typography className={`fw-bold col-12 display-1`}>
                                {getAnotherName(item.title)}
                            </Typography>
                            <Typography className={`fw-bold col-12 display-1`}>
                                {getLastName(item.title)}
                            </Typography>
                        </div>

                        <Typography className={`row d-flex ${styles.description}`}>
                            <Typography className={`col-md-12 col-lg-3 d-flex ${styles.rating}`}>
                                <CircularProgress
                                    variant="determinate"
                                    value={item.vote_average * 10}
                                    color={"success"}
                                />
                                <Typography className={`${styles.average}`}>
                                    {totalRate(item.vote_average)}
                                </Typography>
                                IMDB SCORE
                            </Typography>

                            <Typography className="col-md-12 col-lg-2">
                                {stringToDate(item.release_date)}
                            </Typography>
                        </Typography>
                        <Typography></Typography>
                    </Typography>
                </Typography>
            ))}
            <div></div>
        </Typography>
    );
};

export default Slice;
