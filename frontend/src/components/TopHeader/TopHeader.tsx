import React from "react";
import { assets } from "../../assets/assets";
import styles from "./TopHeader.module.css";

const TopHeader = () => {
  return (
    <div className={styles.topHeader}>
      <img src={assets.course_1} className={styles.logo} alt="logo" />
      <div className={styles.middle}>
        <span>
          A complete computer eduacation institute
        </span>
        <span>
          SOFTDEV TALLY GURU
        </span>
        <span>
          Near Mahila Degree Collage
        </span>
        <span>
           Gandhi Nagar, Basti (U.P) - 
        </span>
      </div>
      <input type="button" className={styles.button} value="Enroll" />
    </div>
  );
};

export default TopHeader;
