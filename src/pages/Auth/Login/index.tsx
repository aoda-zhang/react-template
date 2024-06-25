import React, { FC, memo } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import lover from "@/shared/assets/images/glove.png";
import storage from "@/shared/utils/storage";
import { AuthFieldType } from "@/typings/auth.types";
import StorageKeys from "@/typings/storage.types";

import authAPI from "../apis";

import style from "./index.module.scss";
const Login: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(authAPI.login, {
    onSuccess: loginInfo => {
      if (loginInfo?.accessToken && loginInfo?.refreshToken) {
        storage.set(StorageKeys.accessToken, loginInfo?.accessToken);
        storage.set(StorageKeys.refreshToken, loginInfo?.refreshToken);
        navigate("map");
      }
    },
  });
  const Help = () => {
    return (
      <div className={style.help}>
        <span
          onClick={() => {
            navigate("/register");
          }}
        >
          {t("login.newUser")}
        </span>
        <span
          onClick={() => {
            navigate("/setting");
          }}
        >
          {t("common.setting")}
        </span>
      </div>
    );
  };
  return (
    <div className={style.login}>
      <img src={lover} alt="" className={style.icon} />
      <Form
        className={style.form}
        name="login"
        onFinish={value => {
          mutate({
            userName: value?.userName,
            password: value?.password,
          });
        }}
        autoComplete="on"
      >
        <Form.Item<AuthFieldType>
          name="userName"
          rules={[{ required: true, message: "请输入你的账户名" }]}
        >
          <Input placeholder="账户名" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: "请输入你的密码" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className={style.submitBtn}
          >
            {t("login.primary_login")}
          </Button>
        </Form.Item>
        {/* <Help /> */}
      </Form>
    </div>
  );
};
export default memo(Login);
