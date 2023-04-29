import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { IUser } from '../../../models/user';
import { ACCESS_TOKEN_KEY, APIUrl } from '../../../utils/constants';
import './UserPage.scss';
import { logout, setUserInfo } from '../redux/authReducer';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { Modal, Button } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { generateAvatarUpload } from '../../../utils/upload';
import Cookies from 'js-cookie';
import axios from 'axios';

function UserPage() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: AppState) => state.profile);
  const [data, setData] = useState<IUser>();
  const [image, setImage] = useState(data?.avatar);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [crop, setCrop] = useState<any>({ unit: '%', width: 30, aspect: 1 });
  const imgRef = useRef<any>(null);
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);

  const getUser = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchThunk(API_PATHS.userProfile, 'get'));
    setLoading(false);

    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setData(json.data);
    }
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onLogOut = () => {
    dispatch(logout());
    dispatch(replace(ROUTES.loginV2));
  };

  const changeAvatar = () => {
    if (avatarInputRef.current !== null) avatarInputRef.current.click();
  };

  const onChooseAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };

  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY,
    );
  }, [completedCrop]);

  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(previewCanvasRef.current, completedCrop);
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
        },
      };

      const json = await axios.put(API_PATHS.userProfile, formData, config);
      if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data.data));
      }
    }
  };

  if (loading) {
    return <h3>Loading....</h3>;
  }
  return (
    <div className="container">
      <div className="card" style={{ margin: 'auto', width: '100%', alignItems: 'center' }}>
        <div className="profilepic">
          <img src={`${APIUrl}/${user?.avatar}`} className="card-img-top profilepic__image" alt="avatar_url" />
          <div className="profilepic__content" onClick={changeAvatar}>
            <input ref={avatarInputRef} hidden type="file" onChange={onChooseAvatar} accept="image/*" />
            <span className="profilepic__text">Upload</span>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">{user?.email}</p>
          <h5 className="card-title">user Name</h5>
          <p className="card-text">{user?.name}</p>
          <h5 className="card-title">Description</h5>
          <p className="card-text">{user?.description}</p>
          <h5 className="card-title">State</h5>
          <p className="card-text">{user?.state}</p>
          <h5 className="card-title">Region</h5>
          <p className="card-text">{user?.region}</p>
          <button className="btn btn-primary" onClick={onLogOut}>
            Log Out
          </button>
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      >
        <Modal.Header>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactCrop
            src={image ? image : ''}
            crop={crop}
            onChange={(newCrop: any) => {
              setCrop(newCrop);
            }}
            onImageLoaded={onLoad}
            onComplete={(c) => setCompletedCrop(c)}
          />
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{ width: Math.round(completedCrop?.width ?? 0), height: Math.round(completedCrop?.height ?? 0) }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setOpenModal(false);
              uploadAvatar();
            }}
          >
            Save Image
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
