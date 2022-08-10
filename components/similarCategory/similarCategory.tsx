import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Autoplay, Lazy, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { overText, stringToDate } from "../../common/overText";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";
import { Category, CategoryData, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import moviesApi from "../../pages/api/moviesApi";

import styles from "./similarCategory.module.scss";

interface Props {
    cate: string;
    id: number;
}

const SimilarCategory = (props: Props) => {
    const [similarCategory, setSimilarCategory] = useState<CategoryData[]>([]);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const path = props.cate === Category.movie ? MOVIES_PATH : TV_SHOW_PATH;
    const wiperSlice = {
        width: 110,
        height: 150,
    };
    // get image path from api result
    const imagePath = useMemo(
        () => (poster: string, backdrop: string) => apiConfig.originalImage(poster) || backdrop,
        [],
    );
    /**`
     * handle redirect to category detail
     * @param item
     */
    const handleSlideClick = (item: CategoryData) => {
        const category = {
            category: props.cate,
            id: item.id,
        };
        // add to redux store
        dispatch(setDetailState(category));

        // get path
        router.push(
            {
                pathname: `${path}/${item.name || item.title} `,
                query: {
                    id: item.id,
                },
            },
            undefined,
            { shallow: true },
        );
    };

    useEffect(() => {
        try {
            // fetch api
            const getVideo = async () => {
                const params = {};
                // const response = await moviesApi.getTrailerVideo(category, id);
                const response = await moviesApi.getCategorySimilar(props.cate, props.id, {
                    params,
                });
                // get 4 video from api
                setSimilarCategory(response.results.slice(0, 10));
            };
            window.scrollTo({
                top: 0,
                left: 0,
            });
            getVideo();
        } catch (error) {
            console.log("Fetch Video API fail");
        }
    }, [props]);
    return (
        <>
            {similarCategory && (
                <div className={styles.container}>
                    <div>Suggestions For You</div>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={15}
                        lazy={{ loadPrevNext: true }}
                        loop={true}
                        autoplay={{ delay: 3000 }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Autoplay, Lazy]}
                    >
                        {similarCategory.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                className={styles.slice}
                                onClick={() => {
                                    handleSlideClick(item);
                                }}
                            >
                                <Image
                                    src={imagePath(item.poster_path, item.backdrop_path)}
                                    className={styles.image}
                                    alt=""
                                    width={wiperSlice.width}
                                    height={wiperSlice.height}
                                />
                                <div className={styles.name}>
                                    {overText(item.title || item.name, 15)}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
};

export default SimilarCategory;
