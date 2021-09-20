import React,{useState,useEffect} from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

let PicturesWall = ({fileListArrey}) => {

    const[state, setState] = useState( {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: fileListArrey
    });

    useEffect(() => {
        setState({
            ...state,
            fileList: fileListArrey
        })
    },[fileListArrey])

   let handleCancel = () => setState({...state, previewVisible: false });

   let handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

       setState({
            ...state,
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

   let handleChange = ({ fileList }) => setState({...state, fileList });


        const { previewVisible, previewImage, fileList, previewTitle } = state;
        return (
            <>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
}

export default PicturesWall;