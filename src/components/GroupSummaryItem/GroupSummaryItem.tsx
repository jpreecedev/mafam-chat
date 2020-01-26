import React from "react";

import { formatTime } from "../../utils";
import styles from "./styles.module.css";

export interface GroupSummaryItemProps {
  id: string;
  avatar: string;
  name: string;
  time: Date;
  message: string;
  onSelected?: (id: string) => void;
}

const GroupSummaryItem: React.FunctionComponent<GroupSummaryItemProps> = ({
  id,
  avatar,
  name,
  time,
  message,
  onSelected
}) => (
  <div className={styles.wrapper} onClick={() => onSelected && onSelected(id)}>
    {avatar && <img src={avatar} alt={name} className={styles.avatar} />}
    <div className={styles.container}>
      <div className={styles.row}>
        <p className={styles.name}>{name}</p>
        <p className={styles.time}>{formatTime(time)}</p>
      </div>
      <div className={styles.row}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  </div>
);

export { GroupSummaryItem };
