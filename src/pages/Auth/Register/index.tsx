import React, { FC } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import register from "@/shared/assets/images/register.png";
import storage from "@/shared/utils/storage";
import { AuthFieldType } from "@/typings/auth.types";
import StorageKeys from "@/typings/storage.types";

import authAPI from "../apis";

import style from "./index.module.scss";

const Register: FC = () => {
  const navigate = useNavigate();
  const { mutate } = useMutation(authAPI.register, {
    onSuccess: async (isRegrester, value) => {
      if (isRegrester) {
        const loginInfo = await authAPI.login({
          userName: value?.userName,
          password: value?.password,
        });
        await storage.set(StorageKeys.accessToken, loginInfo.accessToken);
        await storage.set(StorageKeys.refreshToken, loginInfo.refreshToken);
        navigate("/map");
      }
    },
    onError: error => {
      message.error(`注册失败:${error}`);
    },
  });
  return (
    <div className={style.register}>
      <img src={register} alt="" className={style.icon} />
      <Form
        className={style.form}
        name="login"
        onFinish={value => {
          mutate(value);
        }}
        autoComplete="off"
      >
        <Form.Item<AuthFieldType>
          name="userName"
          rules={[{ required: true, message: "请输入注册账户名" }]}
        >
          <Input placeholder="账户名" />
        </Form.Item>

        <Form.Item<AuthFieldType>
          name="password"
          rules={[{ required: true, message: "请输入注册密码" }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={style.submitBtn}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
