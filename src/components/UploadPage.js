import { useState } from "react";
import "./UploadPage.css";
import axios from "axios";
import { API_URL } from "../config/constants";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";

const UploadPage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        description: values.description,
        seller: values.seller,
        price: parseInt(values.price),
        imageUrl: imageUrl,
      })
      .then((result) => {
        navigate("/", { replace: true });
      })
      .catch((error) => {
        message.error(`상품등록시 에러가 발생했습니다 ${error.message}`);
      });
  };
  const onChageImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };

  return (
    <div id="body">
      <div id="load-container">
        <Form name="uploadForm" onFinish={onSubmit}>
          <Form.Item
            name="upload"
            label={<div className="upload-label">작품 사진</div>}
          >
            <Upload
              name="image"
              action={`${API_URL}/image`}
              listType="picture"
              showUploadList={false}
              onChange={onChageImage}
            >
              {imageUrl ? (
                <img id="upload-img" src={`${API_URL}/${imageUrl}`} />
              ) : (
                <div id="upload-img-placeholder">
                  <img src="/images/icons/camera.png" />
                  <span>작품업로드</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">작가명</div>}
            name="seller"
            rules={[{ required: true, message: "판매자명을 입력해주세요" }]}
          >
            <Input
              className="upload-name"
              size="large"
              placeholder="판매자명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">작품명</div>}
            rules={[{ required: true, message: "작품명을 입력해주세요" }]}
            name="name"
          >
            <Input
              className="upload-name"
              size="large"
              placeholder="작품명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">판매가</div>}
            rules={[{ required: true, message: "판매가를 입력해주세요" }]}
            name="price"
          >
            <InputNumber
              className="upload-price"
              size="large"
              min={0}
              defaultValue={0}
            />
          </Form.Item>
          <Divider />
          <Form.Item
            label={<div className="upload-label">작품설명</div>}
            rules={[{ required: true, message: "작품설명을 입력해주세요" }]}
            name="description"
          >
            <Input.TextArea
              size="large"
              id="product-description"
              showCount
              maxLength={300}
              placeholder="작품설명을 입력해주세요"
            />
          </Form.Item>
          <Divider />
          <Form.Item>
            <Button id="submit-button" size="large" htmlType="submit">
              작품등록하기
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default UploadPage;
