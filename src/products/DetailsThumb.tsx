import React from "react";

export default function DetailsThumb({ images, tab, myRef }: any) {
  return (
    <div
      ref={myRef}
      style={{
        width: "100px",
        height: "100px",
        display: "flex",
        cursor: "pointer",
        margin: "10px 0"
      }}
    >
      {images?.map((img: any, index: any) => {
        return (
          <div
            style={{
              width: "100px",
              height: "100%",
              display: "flex",
              objectFit: "cover",
              border: "1px solid #ddd",
              marginRight: "5px",
              borderRadius: "5px"
            }}
          >
            <img
              src={img}
              alt=""
              key={index}
              onClick={() => tab(index)}
              style={{
                width: "100px",
                height: "100%",

                border: "1px solid lightseagreen"
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
