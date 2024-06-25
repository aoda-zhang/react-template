import React, { FC, memo } from "react";
import { App, Button, Form, Input, Select, Space } from "antd";
import "dayjs/locale/zh-cn";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

import globalStore from "@/store/globalStore";
import { FormValue } from "@/typings/map.types";
import envConfig from "@/config";
import queryKeys from "@/shared/constants/queryKeys";
import historyAPI from "@/pages/History/apis";

import mapStore from "../store";
import mapAPI from "../apis";

import styles from "./index.module.scss";

const EditMap: FC = () => {
  const { hospitals, setHospital, mapStatus, setMapStatus } = globalStore();
  const [form] = Form.useForm();
  const navagite = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { setForm, setDate, currentDate } = mapStore();
  const onSelectedHospital = (value: string) => {
    const newHospitalItem = [
      {
        label: value,
        value,
      },
    ];
    setHospital(newHospitalItem);
  };
  const addHospitalMutation = useMutation(mapAPI.addHospitals, {
    onSuccess: insertAccount => {
      message.success(`新增${insertAccount}条医院数据`);
      queryClient.invalidateQueries(queryKeys.GET_HOSPITALS);
    },
  });
  const addHistorisMutation = useMutation(historyAPI.addmapHistory, {
    onSuccess: (value, params) => {
      message.success(`${params?.spendDate}报销已保存`);
    },
    onError: (value, params) => {
      message.warning(`${params?.spendDate}报销未成功保存`);
    },
  });
  const updateHospitals = async (value: FormValue) => {
    const fullHospitals = value?.mapInfo
      ?.map(item => [item?.from?.[0], item?.to?.[0]])
      ?.flat(Infinity);
    await addHospitalMutation.mutate(fullHospitals);
  };
  const addHistory = async (value: FormValue) => {
    const mapHistory = value?.mapInfo?.map(item => ({
      ...item,
      from: item?.from?.[0],
      to: item?.to?.[0],
    }));
    await addHistorisMutation.mutate({
      spendDate: currentDate,
      mapInfo: mapHistory,
    });
  };
  const onFinish = (value: FormValue) => {
    const formData = value?.mapInfo?.map(item => {
      const average = Math.floor(
        Math.random() * envConfig?.map?.maxAveSpeed +
          envConfig?.map?.minAveSpeed,
      );
      const MAX_SPEED = average + 30;
      return {
        startTime: `${currentDate} ${item?.startTime}`,
        from: item.from,
        to: item.to,
        spendTime: item?.spendTime,
        average,
        maxSpend: Math.floor(
          Math.random() * (MAX_SPEED - average + 1) + average,
        ),
        allMileage: item?.allMileage,
        expectedOil: (item?.allMileage * envConfig?.map?.aveOild)?.toFixed(2),
      };
    });
    const mapInfo = formData?.sort(
      (c, b) => +dayjs(b.startTime)?.valueOf() - +dayjs(c.startTime)?.valueOf(),
    );
    if (mapInfo?.length > 0) {
      updateHospitals(value);
      addHistory(value);
      setForm(mapInfo);
      setDate(value?.spendDate);
      setMapStatus({ isEdit: false, isView: true });
      navagite("/map/view");
    } else {
      message.error(envConfig?.map?.no_map_message);
    }
  };
  return (
    <div className={styles.edit}>
      {mapStatus.isEdit && (
        <Form name="edit" onFinish={onFinish} autoComplete="true" form={form}>
          <Form.List name="mapInfo">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 4 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "startTime"]}
                      rules={[{ required: true, message: "请输入出发时间" }]}
                    >
                      <Input placeholder="出发时间 示例 16:24" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "from"]}
                      rules={[{ required: true, message: "请输入出发地点" }]}
                    >
                      <Select
                        showSearch
                        allowClear
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            ?.toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        size="large"
                        mode="tags"
                        placeholder="请输入或选择出发医院"
                        optionFilterProp="children"
                        options={hospitals}
                        onSelect={(value: string) => {
                          onSelectedHospital(value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "to"]}
                      rules={[
                        { required: true, message: "请输入或选择到达医院" },
                      ]}
                    >
                      <Select
                        showSearch
                        allowClear
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        size="large"
                        mode="tags"
                        placeholder="请输入或选择到达医院"
                        optionFilterProp="children"
                        options={hospitals}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "spendTime"]}
                      rules={[{ required: true, message: "请填写驾驶时间" }]}
                    >
                      <Input placeholder="请填写驾驶时间 示例 00:18" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "allMileage"]}
                      rules={[{ required: true, message: "请填写总里程数" }]}
                    >
                      <Input placeholder="请填写总里程数 示例 20" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                      setMapStatus({ isView: false, isEdit: true });
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    {t("map.add_newMap")}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className={styles.buttons}>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                {t("map.check_mapDetails")}
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
};

export default memo(EditMap);
