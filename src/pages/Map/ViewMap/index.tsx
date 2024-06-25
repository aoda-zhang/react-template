import React, { FC, memo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import carIcon from "@/shared/assets/images/car.png";
import globalStore from "@/store/globalStore";

import mapStore from "../store";

import styles from "./index.module.scss";
const ViewMap: FC = () => {
  const { formData } = mapStore();
  const { mapStatus, setMapStatus } = globalStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getSpendTime = (spendTime: number) => {
    const randomNumber = Math.floor(Math.random() * 60);
    const formattedNumber = randomNumber.toString().padStart(2, "0");
    return `${spendTime}:${formattedNumber}`;
  };
  const getAllMileage = (allMileage: number) => {
    const randomNumber = Math.floor(Math.random() * 10);
    return `${allMileage}.${randomNumber}`;
  };
  const ViewWiget = () => {
    return formData?.reverse()?.map((item, index) => (
      <div className={styles.item} key={index}>
        <div className={styles.time}>
          <span className={styles.left}>
            <span>
              <img className={styles.carIcon} src={carIcon}></img>
            </span>
            <span className={styles.text}>{item?.startTime}</span>
          </span>
          <span className={styles.follow}>{t("map.with")}</span>
        </div>
        <div className={styles.hospital}>
          <span className={styles.icon}>
            <span className={styles.redC}></span>
            <span className={styles.borderC}></span>
            <span className={styles.greenC}></span>
          </span>
          <span className={styles.name}>
            <span>{item?.from}</span>
            <span>{item?.to}</span>
          </span>
        </div>
        <div className={styles.spendTime}>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>
                {getAllMileage(item?.allMileage)}
              </span>
              <span className={styles.unit}>km</span>
            </span>
            <span>{t("map.allMileage")}</span>
          </span>
          <span className={styles.column}>
            <span className={styles.value}>
              {getSpendTime(item?.spendTime)}
            </span>
            <span>{t("map.spendTime")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.average}</span>
              <span className={styles.unit}>km/h</span>
            </span>
            <span>{t("map.average")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.maxSpend}</span>
              <span className={styles.unit}>km/h</span>
            </span>
            <span>{t("map.maxSpend")}</span>
          </span>
          <span className={styles.column}>
            <span>
              <span className={styles.value}>{item?.expectedOil}</span>
              <span className={styles.unit}>元</span>
            </span>
            <span>{t("map.expectedOil")}</span>
          </span>
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.ViewMap}>
      {mapStatus.isView && (
        <>
          <div className={styles.content} id="ZYR">
            <ViewWiget />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.save}
            onClick={() => {
              setMapStatus({ isView: false, isFillMapDate: true });
              navigate("map");
            }}
          >
            {t("map.edit")}
          </Button>
        </>
      )}
    </div>
  );
};

export default memo(ViewMap);
