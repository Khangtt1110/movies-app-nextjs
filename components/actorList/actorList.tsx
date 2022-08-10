import Image from "next/image";
import { useEffect, useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Actors } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import moviesApi from "../../pages/api/moviesApi";

import { useRouter } from "next/router";
import "swiper/css";
import styles from "./actorList.module.scss";

const ActorList = () => {
    const router = useRouter();
    const [actorList, setActorList] = useState<Actors[]>();
    const category = String(router.query.category);
    const id = Number(router.query.id);
    /**
     * Get 10 actor by category type and category id
     */
    useEffect(() => {
        const getActorData = async () => {
            const response = await moviesApi.getActorList(category, id);
            setActorList(response.cast.slice(0, 10));
        };

        getActorData();
    }, [category, id]);

    return (
        <div className={styles.container}>
            {actorList && actorList?.length > 0 ? (
                <>
                    <div className={styles.title}>Actors</div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className={styles.wrapper}
                    >
                        {actorList?.map((item) => (
                            <SwiperSlide key={item.id} className={styles.slice}>
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
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ActorList;
