/*
 * @Author: tkiddo
 * @Date: 2021-01-29 09:28:17
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-01-30 10:12:17
 * @Description:
 */
import React, { FC, useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
  onOk(imageUrl: string): void;
  initialImage?: string;
  accept?: string;
  beforeUpload(file: File): boolean | Promise<File>;
  action: string;
}

const Uploader: FC<IProps> = ({ onOk, initialImage = '', ...uploadProps }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialImage);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setImageUrl('');
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      const tempUrl = info.file.response.tempFileURL;
      setImageUrl(tempUrl);
      onOk(tempUrl);
    }
  };
  return (
    <Upload
      name="img"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      {...uploadProps}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default Uploader;
