import React, { FC, memo, useEffect } from "react";
import { App, Button, Input, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Outlet, useNavigate } from "react-router-dom";

import useDoubleClick from "@/shared/hooks/useDoubleClick";
import queryKeys from "@/shared/constants/queryKeys";
import globalStore from "@/store/globalStore";

import styles from "./index.module.scss";
import Info from "./components/Info";
import mapAPI from "./apis";
import mapStore from "./store";

const Map: FC = () => {
  const { t } = useTranslation();
  const navagite = useNavigate();
  const { message } = App.useApp();
  const { setCurrentDate, currentDate } = mapStore();
  const { mapStatus, setMapStatus, setHospital } = globalStore();
  const { isLoading, data } = useQuery(
    [queryKeys.GET_HOSPITALS],
    mapAPI.getHospitalList,
  );

  useEffect(() => {
    const hospitalList = data?.map(item => ({
      label: item?.name,
      value: item?.name,
    }));
    setHospital(hospitalList);
  }, [data, setHospital]);

  useDoubleClick(() => {
    setMapStatus({ isInfoOpen: true });
  });

  const onDateChange = e => {
    setCurrentDate(e.target.value);
  };
  const onSubmit = () => {
    if (currentDate) {
      setMapStatus({ isFillMapDate: false, isEdit: true });
      navagite("edit");
    } else {
      message.error("请填写当前报销日期!");
    }
  };
  return (
    <div className={styles.map}>
      <>
        {mapStatus.isFillMapDate && (
          <Spin size="large" spinning={isLoading}>
            <Input
              className={styles.spendDate}
              placeholder="本次报销 2023.08.23"
              onChange={onDateChange}
              value={currentDate}
            />
            <div className={styles.buttons} onClick={onSubmit}>
              <Button type="primary" htmlType="submit" size="large">
                {t("map.type_mapDetails")}
              </Button>
            </div>
          </Spin>
        )}
        <Info
          isOpen={mapStatus.isInfoOpen}
          onClose={() => {
            setMapStatus({ isInfoOpen: false });
          }}
        ></Info>
        <Outlet />
      </>
    </div>
  );
};
export default memo(Map);
