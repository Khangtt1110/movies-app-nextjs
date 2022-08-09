import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../features/hooks";
import { CategoryDetailState, selectCategoryDetail } from "../../../features/movie/movieSlice";
import { CategoryDetail } from "../../../models/movies";
import { HOME_PATH } from "../../../models/path";
import apiConfig from "../../api/apiConfig";
import moviesApi from "../../api/moviesApi";

import { convertTime, stringToDate } from "../../../common/overText";
import CastList from "../../../components/castList/catsList";
import TrailerVideo from "../../../components/trailerVideo/trailerVideo";
import styles from "./movieDetail.module.scss";

interface Query {
    name: string;
    id: number;
    category: string;
}
const MoviesDetail = () => {
    const router = useRouter();
    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>();
    // get category and id to call api
    const movieDetail = useAppSelector<CategoryDetailState>(selectCategoryDetail);
    const categoryId = Number(router.query.id);
    const categoryType = String(router.query.category);
    // get image path
    const background = useMemo(
        () =>
            categoryDetail ? apiConfig.originalImage(categoryDetail?.poster_path as string) : "",
        [categoryDetail],
    );
    // fetch data
    useEffect(() => {
        // get api
        const getMovieDetail = async () => {
            const response = await moviesApi.getMovieDetail(categoryType, categoryId);
            setCategoryDetail(response);
        };
        movieDetail && getMovieDetail();
    }, [categoryId, categoryType, movieDetail, router]);

    return (
        <div className={styles.container}>
            <div className={styles.poster} style={{ backgroundImage: `url(${background})` }}></div>
            <div className={styles.swapper}>
                <h1 className={styles.name}>{categoryDetail?.title || categoryDetail?.name}</h1>
                <div className={styles.description}>
                    {categoryDetail?.runtime ? (
                        <div className={styles.date}>
                            {convertTime(categoryDetail?.runtime as number)}
                        </div>
                    ) : (
                        <div className={styles.date}>
                            {stringToDate(categoryDetail?.first_air_date as string)?.slice(3) +
                                " - " +
                                stringToDate(categoryDetail?.last_air_date as string)?.slice(3)}
                        </div>
                    )}
                    <div className={styles.types}>
                        {categoryDetail?.genres &&
                            categoryDetail?.genres.slice(0, 3).map((item) => (
                                <div key={item.id} className={styles.element}>
                                    {item.name}
                                </div>
                            ))}
                    </div>
                </div>
                <div className={styles.title}>About the movie</div>
                <div>{categoryDetail?.overview}</div>
                <div className={styles.title}>Casts</div>
                <CastList category={movieDetail.category} id={movieDetail.id} />
                <TrailerVideo />
            </div>
        </div>
    );
};

export default MoviesDetail;
