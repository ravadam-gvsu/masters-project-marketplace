import React, { useState, useEffect } from "react";

const Gallery = (props) => {
  const product = props.product;
  
  const [currentImage, setCurrentImage] = useState(product.images[0] || '');
  const [currentPassedImage, setCurrentPassedImage] = useState(product.images[0] || '');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCurrentImage(product.images[0]);
  }, [product]);

  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  const handleClick = (index: number) => {
    setCurrentImage(product.images[index]);
  };

  const handleToggle = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeActivatedClass = (parent: any) => {
    parent.childNodes.forEach((node: any) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" onClick={handleToggle} />
        </div>
        <div className="thumbnails">
          {product.images.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e: any) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;