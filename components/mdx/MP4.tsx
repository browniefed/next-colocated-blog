const MP4 = ({ src }) => {
  return (
    <video controls>
      <source type="video/mp4" src={src} />
    </video>
  );
};
export default MP4;
