import Head from "next/head";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
} from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [showSpin, setShowSpin] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Successfully login Welcome!",
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please enter correct username or password!",
    });
  };

  const handleSubmit = async (values: any) => {
    debugger;
    if (
      values.username.trim() === "progame_01" &&
      values.password === "Abhishek@123"
    ) {
      success();
      router.push("/playgame");
    } else {
      warning();
    }
  };

  return (
    <>
      {contextHolder}
      <Head>
        <title>Pro Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="d-flex justify-content-center align-items-center  ">
        <Row justify="center" align="middle" style={{ width: "100%" }}>
          <Col xs={22} sm={18} md={12} lg={8} xl={6}>
            <Card className="home-card">
              <div className="text-center p-4">
                <h3 className="m-0 text-white">Welcome !</h3>
              </div>
              <Form layout="vertical" onFinish={handleSubmit}>
                {/* username */}
                <Form.Item
                  name="username"
                  className=""
                  rules={[
                    { required: true, message: "Please enter your username!" },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Username" size="large" />
                </Form.Item>
                {/* password */}
                <Form.Item
                  name="password"
                  className="mt-4"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="password" size="large" />
                </Form.Item>
                <Button type="primary" block htmlType="submit" size="large">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
}
