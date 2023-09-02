import styles from "./Stat.module.css"

type Props = {
    stat: Stat | undefined;
    period: string| null | undefined;
}

function Stat (props: Props) {
    let sum: number;

    if (props.period === "Full Time" && props.stat?.type === "possessionPercentage" && props.stat) {
        sum = +(+props.stat.sh + +props.stat.fh / 100).toFixed(0)
    } else if (props.period === "Full Time" && props.stat) {
        sum = +props.stat.sh + +props.stat.fh;
    } else {
        sum = 0;
    }

    return <div className={styles.stat}>
        {props.period === "1st Half" && <span>{props.stat?.fh}</span>}
        {props.period === "2nd Half" && <span>{props.stat?.sh}</span>}
        {props.period === "Full Time" && props.stat && <span>{sum}</span>}
    </div>;
}

export default Stat;