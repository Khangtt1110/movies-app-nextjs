import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "./callBackButton.module.scss";

type Props = {};

const CallBackButton = (props: Props) => {
    const router = useRouter();
    const handleCallBackClick = useCallback(() => {
        router.back();
    }, [router]);
    return (
        <div className={styles.container} onClick={handleCallBackClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

export default CallBackButton;
