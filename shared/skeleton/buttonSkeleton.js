import styles from "./Skeleton.module.scss";

const SkeletonButton = ({
  height = 40,
  width = 100,
  shape = "rectangular",
  shadow = false,
  percent = false,
}) => {
  const classNames = `${styles.skeleton} ${
    shape === "rounded" ? styles.rounded : ""
  } ${shadow ? styles.shadow : ""}`;

  // Inline styles for height and width
  const style = {
    height: `${height}px`,
    width: percent ? `${width}%` : `${width}px`,
  };

  return <div className={classNames} style={style}></div>;
};

export default SkeletonButton;
