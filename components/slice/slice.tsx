import { Rating, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { overText, stringToDate, totalRate } from "../../common/overText";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import apiConfig from "../../pages/api/apiConfig";

import { Autoplay, Lazy, Pagination } from "swiper";
import { Category, CategoryData, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import styles from "./slice.module.scss";

type Props = {
    data: CategoryData[];
    cate: string;
};

const Slice = (props: Props) => {
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

    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            // autoplay={{ delay: 5000 }}
            lazy={true}
            loop={true}
            pagination={{
                clickable: true,
            }}
            className={styles.container}
            modules={[Pagination, Autoplay, Lazy]}
        >
            {props.data?.map((item) => (
                <SwiperSlide key={item?.id}>
                    <Typography
                        className={`col-12 ${styles.background}`}
                        style={{
                            backgroundImage: background(item.backdrop_path, item.poster_path),
                        }}
                    >
                        <Typography className={`container m-auto`}>
                            <Typography
                                className={`col-12 fw-bold text-center fs-1`}
                                // styles.name
                                onClick={() => {
                                    handleSliceClick(item.id, item.title);
                                }}
                            >
                                {item.name || item.title}
                            </Typography>
                            <Typography className={`row`}>
                                <Typography
                                    style={{
                                        background: `url(${
                                            apiConfig.originalImage(item.poster_path) as string
                                        })`,
                                    }}
                                    className={`col-4 ${styles.image}`}
                                    //styles.image

                                    onClick={() => {
                                        handleSliceClick(item.id, item.title);
                                    }}
                                />
                                <Typography className={`col-8`}>
                                    <Typography>Date: {stringToDate(item.release_date)}</Typography>
                                    {item.vote_average > 0 && (
                                        <Typography className={styles.rating}>
                                            <Typography>
                                                Rate: {totalRate(item.vote_average)} / 5
                                            </Typography>
                                            <Rating
                                                precision={0.1}
                                                readOnly
                                                name="customized-color"
                                                defaultValue={Number(totalRate(item.vote_average))}
                                                max={5}
                                            />
                                        </Typography>
                                    )}

                                    <Typography className="overflow-auto">
                                        {item.overview}
                                    </Typography>
                                </Typography>
                            </Typography>
                        </Typography>
                    </Typography>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slice;
