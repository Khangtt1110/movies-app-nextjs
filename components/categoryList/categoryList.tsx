import { useEffect, useMemo, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies, MOVIES_PATH, TV_SHOW_PATH } from "../../models";
import moviesApi from "../../pages/api/moviesApi";

import { overText, stringToDate } from "../../common/overText";
import apiConfig from "../../pages/api/apiConfig";

import Image from "next/image";
import { Category, CategoryData } from "../../models/movies";
import "swiper/css";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../features/hooks";
import { setDetailState } from "../../features/movie/movieSlice";

import styles from "./categoryList.module.scss";

type Props = {
    title: string;
    cate: string;
    type: string;
};

const CategoryList = (props: Props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [categoryData, setCategoryData] = useState<CategoryData[]>();
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

    /**
     * Get movies data
     */
    useEffect(() => {
        const params = {};
        async function getList() {
            const response = await moviesApi.getCategory(props.cate, props.type, { params });
            setCategoryData(response.results);
        }
        getList();
    }, [props.cate, props.type]);

    /**
     * handle redirect to category detail
     * @param id
     * @param title
     */
    const handleSlideClick = (id: number, title: string) => () => {
        const categoryState = {
            category: props.cate,
            id: id,
        };
        // set category and id to redux store
        dispatch(setDetailState(categoryState));
        //redirect to category detail
        router.push(`${path}/${title}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{props.title}</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={15}
                loop={true}
                autoplay={{ delay: 3000 }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Autoplay]}
            >
                {categoryData?.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className={styles.slice}
                        onClick={handleSlideClick(item.id, item.title || item.name)}
                    >
                        <Image
                            src={imagePath(item.poster_path, item.backdrop_path)}
                            className={styles.image}
                            alt=""
                            width={wiperSlice.width}
                            height={wiperSlice.height}
                        />
                        <div className={styles.name}>{overText(item.title || item.name, 15)}</div>
                        <div className={styles.date}>
                            {stringToDate(item.release_date || item.first_air_date)}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CategoryList;
