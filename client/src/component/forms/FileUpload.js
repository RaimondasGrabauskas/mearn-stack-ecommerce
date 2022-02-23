import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  // const reactAppApi = 'http://localhost:8000';

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
                'http://localhost:8000/uploadimages',
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log('Image upload res data', res);
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
  return (
    <div className="row">
      <label className="btn btn-primary">
        Choose File
        <input type="file" multiple hidden accept="images/*" onChange={fileUploadAndResize} />
      </label>
    </div>
  );
};

export default FileUpload;
