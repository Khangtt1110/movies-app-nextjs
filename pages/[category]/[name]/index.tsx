import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { CategoryDetail } from "../../../models/movies";
import apiConfig from "../../api/apiConfig";
import moviesApi from "../../api/moviesApi";

import { Rating } from "@mui/material";
import { convertTime, stringToDate, totalRate } from "../../../common/overText";
import ActorList from "../../../components/actorList/actorList";
import TrailerVideo from "../../../components/trailerVideo/trailerVideo";
import styles from "./movieDetail.module.scss";

const MoviesDetail = () => {
    const router = useRouter();
    const [categoryDetail, setCategoryDetail] = useState<CategoryDetail>();
    const categoryId = Number(router.query.id);
    const categoryType = String(router.query.category);
    // get image path
    const background = useMemo(
        () =>
            categoryDetail ? apiConfig.originalImage(categoryDetail?.poster_path as string) : "",
        [categoryDetail],
    );
    /**
     * fetch category detail api by category and id
     */
    useEffect(() => {
        // get api
        const getMovieDetail = async () => {
            const response = await moviesApi.getMovieDetail(categoryType, categoryId);
            setCategoryDetail(response);
        };
        getMovieDetail();
    }, [categoryId, categoryType, router]);
    console.log(categoryDetail);

    return (
        <div className={styles.container}>
            <Head>
                <title>{categoryDetail?.title || categoryDetail?.name}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {categoryDetail && (
                <>
                    <div
                        className={styles.poster}
                        style={{ backgroundImage: `url(${background})` }}
                    ></div>
                    <div className={styles.swapper}>
                        <div className={styles.name}>
                            {categoryDetail.title || categoryDetail.name}
                        </div>
                        <div className={styles.description}>
                            {categoryDetail.runtime ? (
                                <div className={styles.date}>
                                    {convertTime(categoryDetail.runtime)}
                                </div>
                            ) : (
                                <div className={styles.date}>
                                    {stringToDate(categoryDetail.first_air_date)?.slice(3) +
                                        " - " +
                                        stringToDate(categoryDetail?.last_air_date)?.slice(3)}
                                </div>
                            )}
                            <div className={styles.types}>
                                {categoryDetail.genres.slice(0, 3).map((item) => (
                                    <div key={item.id} className={styles.element}>
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {categoryDetail.overview ? (
                            <>
                                <div className={styles.title}>
                                    <div>About the movie</div>
                                    {categoryDetail.vote_count > 0 && (
                                        <div className={styles.rating}>
                                            {totalRate(categoryDetail.vote_average)}
                                            <Rating
                                                precision={0.1}
                                                readOnly
                                                name="customized-color"
                                                defaultValue={Number(
                                                    totalRate(categoryDetail.vote_average),
                                                )}
                                                max={5}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className={styles.overview}>{categoryDetail.overview}</div>
                            </>
                        ) : (
                            <></>
                        )}
                        <ActorList />
                        <TrailerVideo />
                    </div>
                </>
            )}
        </div>
    );
};

export default MoviesDetail;
