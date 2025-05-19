import React from "react";
import ConnectionLost from "./Loader/connectionLost";
import styles from "@/components/shared/Loader/loaders.module.scss";

const ConnectionsLost = () => {
  return (
    <div>
      <div className={`${styles.container}`}>
        <div className={styles.content}>
          <ConnectionLost height={250} width={250} loader={true} />
        </div>
      </div>
    </div>
  );
};

export default ConnectionsLost;
