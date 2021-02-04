/*
 * @Author: tkiddo
 * @Date: 2021-01-29 09:28:17
 * @LastEditors: tkiddo
 * @LastEditTime: 2021-02-04 10:44:14
 * @Description:
 */
import React, { FC, useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export interface IFileRes {
  tempFileURL: string;
  fileID: string;
}

interface IProps {
  onOk(file: IFileRes): void;
  initialImage?: string;
  accept?: string;
  beforeUpload(file: File): boolean | Promise<File>;
  action: string;
  data?: Record<string, string>;
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
      const { tempFileURL, fileID } = info.file.response;
      setImageUrl(tempFileURL);
      onOk({ fileID, tempFileURL });
    }
  };
  return (
    <Upload
      name="source"
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
