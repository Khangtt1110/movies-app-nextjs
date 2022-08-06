import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Casts, ListResponseCast } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import moviesApi from "../../pages/api/moviesApi";

import styles from "./castList.module.scss";
import "swiper/css";

type Props = {
    category: string;
    id: number;
};

const CastList = (props: Props) => {
    const [castList, setCastList] = useState<Casts[]>();
    useEffect(() => {
        const getCastData = async () => {
            const response = await moviesApi.getCastList(props.category, props.id);
            setCastList(response.cast.slice(0, 10));
        };
        getCastData();
    }, [props.category, props.id]);

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
