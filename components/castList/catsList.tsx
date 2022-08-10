import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Casts, ListResponseCast } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import moviesApi from "../../pages/api/moviesApi";

import styles from "./castList.module.scss";
import "swiper/css";
import { useRouter } from "next/router";

const CastList = () => {
    const [castList, setCastList] = useState<Casts[]>();
    const router = useRouter();
    const category = String(router.query.category);
    const id = Number(router.query.id);
    useEffect(() => {
        const getCastData = async () => {
            const response = await moviesApi.getCastList(category, id);
            setCastList(response.cast.slice(0, 10));
        };
        getCastData();
    }, [category, id, router.query.id]);

    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className={styles.wrapper}
            >
                {castList?.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        className={styles.slice}
                        // onClick={handleSlideClick(item.id, item.title)}
                    >
                        <Image
                            src={
                                item.profile_path === undefined
                                    ? ""
                                    : apiConfig.originalImage(item.profile_path)
                            }
                            className={styles.image}
                            alt=""
                            width={105}
                            height={150}
                        />

                        <div className={styles.name}>{item.name}</div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CastList;
