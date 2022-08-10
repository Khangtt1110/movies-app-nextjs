import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "./callBackButton.module.scss";

const CallBackButton = () => {
    const router = useRouter();
    // redirect to back page when click button
    const handleCallBackClick = useCallback(() => {
        router.back();
    }, [router]);
    return (
        <div className={styles.container} onClick={handleCallBackClick}>
            <KeyboardArrowLeftIcon />
        </div>
    );
};

export default CallBackButton;
