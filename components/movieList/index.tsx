import { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "../../models";
import moviesApi from "../../pages/api/moviesApi";

import { overText, stringToDate } from "../../common/overText";
import apiConfig from "../../pages/api/apiConfig";

import Image from "next/image";
import "swiper/css";
import styles from "./movieList.module.scss";
import { useRouter } from "next/router";
import { MOVIES_PATH } from "../../models/path";
import Link from "next/link";
import { Category } from "../../models/movies";

type Props = {
    title: string;
    type: string;
};

const MovieList = (params: Props) => {
    const router = useRouter();
    const [moviesData, setMoviesData] = useState<Movies[]>();
    /**
     * Get movies data
     */
    useEffect(() => {
        async function getList() {
            const response = await moviesApi.getMovieList(params.type);
            setMoviesData(response.results.slice(0, 15));
        }
        getList();
    }, [params.type]);

    const handleSlideClick = (id: number) => () => {
        router.push(`${MOVIES_PATH}/${id}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{params.title}</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={20}
                autoplay={{ delay: 3000 }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
                className={styles.wrapper}
            >
                {moviesData?.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className={styles.slide}
                        onClick={handleSlideClick(item.id)}
                    >
                        <Image
                            src={apiConfig.originalImage(item.poster_path)}
                            className={styles.image}
                            alt=""
                            width={105}
                            height={180}
                        />
                        {/* <div className={styles.average}>{item.vote_average}</div> */}

                        <div className={styles.name}>{overText(item.title, 15)}</div>
                        <div className={styles.date}>{stringToDate(item.release_date)}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;
