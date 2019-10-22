const ImagePreloader = props => {
  const { images } = props;
  const preloaded = [];
  images.map((image, i) => {
    preloaded[i] = new Image();
    preloaded[i].src = image;
  });
  return null;
};

export default ImagePreloader;
