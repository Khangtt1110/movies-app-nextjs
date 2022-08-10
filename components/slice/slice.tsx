import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { overText, stringToDate } from "../../common/overText";
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

    //format total rate on the 5 scale
    const totalRate = (rate: number) => (rate * 5) / 10;

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
            autoplay={{ delay: 5000 }}
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
                    <div
                        className={styles.background}
                        style={{
                            backgroundImage: background(item.backdrop_path, item.poster_path),
                        }}
                    >
                        <div className={styles.wrapper}>
                            <div
                                className={styles.name}
                                onClick={() => {
                                    handleSliceClick(item.id, item.title);
                                }}
                            >
                                {item.name || item.title}
                            </div>

                            <div className={styles.description}>
                                <Image
                                    src={apiConfig.originalImage(item.poster_path) as string}
                                    className={styles.image}
                                    alt=""
                                    width={120}
                                    height={170}
                                    onClick={() => {
                                        handleSliceClick(item.id, item.title);
                                    }}
                                />
                                <div className={styles.overview}>
                                    <div>Date: {stringToDate(item.release_date)}</div>
                                    <div className={styles.rating}>
                                        <div>Rate: {totalRate(item.vote_average)} / 5</div>
                                        <Rating
                                            precision={0.1}
                                            readOnly
                                            name="customized-color"
                                            defaultValue={totalRate(item.vote_average)}
                                            max={5}
                                        />
                                    </div>
                                    <p>{overText(item.overview, 200)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slice;
