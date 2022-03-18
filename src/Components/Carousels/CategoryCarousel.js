import React, { useEffect, useContext, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/CategoryCarousel.css";
import { LoginContext } from '../../App';
import { useHistory } from 'react-router-dom';

const CategorySlider = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await fetch('http://localhost:3001/cat/category/all');
      const jsonRes = await res.json();
      // console.log(jsonRes)
      setCategories(jsonRes.data);
    };

    getAllCategories();
  }, []);

  const handleClick = (categoryID) => {
    history.push(`/all-articles/${categoryID}`);
  };

  const history = useHistory();

  return (
    <div className="container custom-width2 my-5 ml-6">
      <h2 className="text-2xl font-semibold ml-4 mb-2">Categories </h2>
      <Slider {...settings}>
        {categories.map((category) => {
          return (
            <div className="bg-gray-100">
              <div className="shadow-md rounded-lg">
                <div className="p-4">
                  <h4 className="text-lg font-semibold my-5">{category.name}</h4>
                  <img
                    src={`http://localhost:3001/${category.picture}`}
                    alt=""
                    style={{
                      width: "250px",
                      height: "40vh",
                      objectFit: "cover",
                    }}
                  />
                  <button className="bg-primary my-3 text-black font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => handleClick(category._id)}>Plus...</button>
                </div>
              </div>
            </div>
          );
        }
        )}
      </Slider>
    </div>
  );
};

export default CategorySlider;