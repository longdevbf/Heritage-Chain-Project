import React, { useState } from 'react';

const MintAsset = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Kiểm tra xem file có phải là hình ảnh hay không
      if (selectedFile.type.startsWith('image/')) {
        const fileUrl = URL.createObjectURL(selectedFile);
        setPreview(fileUrl);
      } else {
        alert('Please upload an image file.');
        setPreview(null); // Xóa preview nếu không phải là ảnh
      }
    }
  };

  const handleRemovePreview = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="mint-asset">
      <div className="mint-asset__header">
        <h2 className="mint-asset__title">Mint Your Asset</h2>
        <h3 className="mint-asset__preview">Preview</h3>
      </div>

      <div className="mint-asset__body">
        <div className="mint-asset__upload">
          <div className="mint-asset__upload-box">
            <div className="mint-asset__upload-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19V5m0 0L8 9m4-4l4 4"
              />
            </svg>
            </div>
            <p className="mint-asset__upload-text">Upload Files</p>
            <input type="file" onChange={handleFileChange} className="mint-asset__upload-input" />
          </div>
        </div>

        <div className="mint-asset__preview-box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', textAlign: 'center' }}>
          {preview ? (
            <div>
              <img src={preview} alt="Preview" className="mint-asset__preview-img" style={{ maxWidth: '100%', height: 'auto' }} />
            </div>
          ) : (
            <p  style={{ color: '#fff'}}>No detected file</p>
          )}
        </div>
      </div>

      <div className="mint-asset__footer">
        <p className="mint-asset__footer-text">Enter the property you want to lock</p>
        <div className="mint-asset__footer-input">
          <div className="mint-asset__footer-input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <input className="mint-asset__footer-input-field" type="text" placeholder="0.00000000" />
        </div>
      </div>
    </div>
  );
};

export default MintAsset;
