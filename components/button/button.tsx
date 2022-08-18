import React from "react";
import styles from "./button.module.scss";
type Props = {
    text: string;
    onClick: () => void;
};

const Button = (props: Props) => {
    return (
        <button onClick={props.onClick} className={`px-5 py-3 fs-4 ${styles.button}`}>
            {props.text}
        </button>
    );
};

export default Button;
