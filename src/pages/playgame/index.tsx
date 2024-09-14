import Head from "next/head";
import { Button, Card, Col, Form, Input, message, Modal, Row } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import Icon from "@/utils/Icon";

export default function Home() {
  const [showSpin, setShowSpin] = useState(false);
  const router = useRouter();
  const [result, setResult] = useState(null);
  const [price,setPrice] = useState()
  const [resultCome, setResultCome] = useState(false);
  const [nextColor, setNextColor] = useState("");
  const [form] = Form.useForm();
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
      content: "Enter price length must be 5!",
    });
  };
  const getRandomDigit = (number: any) => {
    const digits = number.toString().split("").map(Number);
    const randomIndex = Math.floor(Math.random() * digits.length);
    return digits[randomIndex];
  };

  const getLastDigit = (number: any) => {
    return number % 10;
  };

  const sumDigitsUntilSingleDigit = (num: any) => {
    while (num >= 10) {
      num = num
        .toString()
        .split("")
        .reduce((sum: number, digit: any) => sum + parseInt(digit, 10), 0);
    }
    return num;
  };

  //get result.......
  const handleSubmit = (values: any) => {
    if(String(values?.price).length < 5) return warning()
    const price = parseInt(values?.price, 10);
    const randomDigit = getRandomDigit(price);
    const lastDigit = getLastDigit(price);
    const sum = randomDigit + lastDigit;
    const finalResult = sumDigitsUntilSingleDigit(sum);
    const nextColor = finalResult % 2 === 0 ? "green" : "red";
    setResult(finalResult);
    setNextColor(nextColor);
    setResultCome(true);
    setPrice(values?.price)
    form.resetFields();
  };
  const handleShowResult = () => {
    setResultCome(false)
  };
  console.log(nextColor, "nextColor");
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
        <Row>
          <Col>
            <Card className="home-card">
              <div className="text-center p-4">
                <h3 className="m-0 text-white">
                  {resultCome ? `Your Result is ${price}` : "Welcome !"}
                </h3>
              </div>
              {resultCome ? (
                <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                  {
                    nextColor === "green" ?
                    <Icon.AppleIcon />: <Icon.GreenApple/>
                  }
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleShowResult}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                  {/* username */}
                  <Form.Item
                    name="price"
                    className=""
                    rules={[
                      { required: true, message: "Please enter price amount!" },
                    ]}
                    hasFeedback
                  >
                    <Input
                      placeholder="price amount"
                      size="large"
                      onKeyPress={(event) => {
                        if (!/^[0-9]+$/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      autoComplete="off"
                      maxLength={5}
                    />
                  </Form.Item>

                  <Button type="primary" block htmlType="submit" size="large">
                    Get Result
                  </Button>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
}
