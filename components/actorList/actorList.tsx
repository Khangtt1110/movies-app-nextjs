import Image from "next/image";
import { useEffect, useState } from "react";
import { Lazy, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Actors } from "../../models";
import apiConfig from "../../pages/api/apiConfig";
import getCategoryDetail from "../../pages/api/categoryApi";

import { useRouter } from "next/router";
import "swiper/css";
import styles from "./actorList.module.scss";

interface Props {
    cate: string;
    id: number;
}

const ActorList = (props: Props) => {
    const router = useRouter();
    const [actorList, setActorList] = useState<Actors[]>();
    /**
     * Get 10 actor by category cate and category id
     */
    useEffect(() => {
        try {
            const getActorData = async () => {
                const response = await getCategoryDetail.getActorList(props.cate, props.id);
                setActorList(response.cast.slice(0, 10));
            };
            getActorData();
        } catch (error) {
            console.log("Fetch Api Actor fail: ", error);
        }
    }, [props]);

    return (
        <div className={styles.container}>
            {actorList && actorList?.length > 0 ? (
                <>
                    <div className={styles.title}>Actors</div>
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={10}
                        lazy={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Lazy]}
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
