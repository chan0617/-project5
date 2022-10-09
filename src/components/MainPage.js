import { API_URL } from "../config/constants";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import { Carousel } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  let [products, setProducts] = React.useState([]);
  let [banners, setBanners] = React.useState([]);
  useEffect(() => {
    /*products 통신*/
    axios
      // 상품db정보
      .get(`${API_URL}/products/`)
      .then((res) => {
        products = res.data.product;
        setProducts(products);
      })
      .catch((err) => {
        return console.log(err);
      });

    /*banners 통신*/
    axios
      .get(`${API_URL}/banners`)
      .then((res) => {
        banners = res.data.banners;
        setBanners(banners);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);
  if (products === undefined) {
    return <h1>작품정보를 받고있습니다.</h1>;
  }
  return (
    <>
      <div id="body">
        <Carousel autoplay autoplaySpeed={1200}>
          {banners.map((banner, index) => {
            return (
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} />
                </div>
              </Link>
            );
          })}
        </Carousel>
        <h2>Explore, collect, and sell NFTs</h2>
        <div id="product-list">
          {products.map((product, idx) => {
            return (
              <div className="product-card" key={idx}>
                <Link className="product-link" to={`/product/${product.id}`}>
                  {/* 썸네일 이미지 */}
                  <div>
                    <img
                      className="product-img"
                      src={`${API_URL}/${product.imageUrl}`}
                      alt={`${API_URL}/${product.name}`}
                    />
                  </div>
                  {/* 상품정보내역 */}
                  <div className="product-content">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">
                      <img
                        className="product-avatar"
                        src="images/icons/avatar.png"
                        alt={`${API_URL}/${product.name}`}
                      />
                      {product.price}
                    </span>
                    <div className="product-footer">
                      <div className="product-seller">
                        <span>Wanna</span>
                      </div>
                      <span className="product-date">
                        {`${dayjs(product.createdAt).fromNow()}`}
                        {/* {dayjs(product.createdAt).fromNow()} */}
                      </span>
                      {/* dayjs(대상).fromNow */}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default MainPage;
