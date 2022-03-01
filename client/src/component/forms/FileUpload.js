import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const reactAppApi = 'http://localhost:8000';

  const fileUploadAndResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                reactAppApi + '/uploadimages',
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err.message);
              });
          },
          'base64'
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        reactAppApi + '/removeimages',
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => item.public_id !== public_id);
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              key={image.public_id}
              count="x"
              onClick={() => handleRemove(image.public_id)}
              style={{ cursor: 'pointer' }}
            >
              <Avatar src={image.url} size={100} className="ml-3" shape="square" />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary mt-3">
          Choose File
          <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
