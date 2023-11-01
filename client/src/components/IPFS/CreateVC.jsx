import React, { useState } from 'react';
import styles from './CreateVC.module.css'
import useEth from "../../contexts/EthContext/useEth";
import { Web3Storage } from 'web3.storage';

const CreateVC = () => {
  const { state: { contracts, accounts, web3 } } = useEth();
  const [accessToken, setAccessToken] = useState(''); // IPFS Token입력값
  const [fileData, setFileData] = useState();

  const uploadIPFS = async () => {
    const getAccessToken = () => {
      return accessToken;
    }
    
    const makeStorageClient = () => {
      const client =  new Web3Storage({ token: getAccessToken() });
      return client;
    }

    const storeFiles = async () => {
      const files = [
        new File([fileData], 'Encrypted_data.txt', { type: 'text/plain' })
      ]

      let client;
      let cid;

      try{
        client = makeStorageClient();
        cid = await client.put(files);

        console.log(cid);
      }
      catch(error){
        alert('유효한 Web3.storage API 토큰이 아닙니다');
      }
      finally{
        // transaction batch 처리하기
        alert("작업이 완료되었습니다.");
        window.location.reload();
      }
    }

    storeFiles();

    
  }

  const handleUpload = async () => {
    uploadIPFS(fileData);
  };
  const handleTokenChange = (event) => {
    setAccessToken(event.target.value);
  };

  const handleFileChange = (event, setFunc) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setFunc(content);
    };

    reader.readAsText(file);
  };

  return (
    <div className = {styles.container}>
      <div className = {styles.title}>
        <p>Test DAPP</p>
      </div>
      <div className = {styles.main}>
        <p>프로젝트의 TEST DAPP</p>
        <p>API 토큰을 입력하고 파일을 입력해서 IPFS에 업로드 한다.</p>
      </div>
      <div className = {styles.optionBox}>
        <div className = {styles.main}>
          <p>IPFS 전달을 위한 정보를 입력하세요</p>
        </div>
        <div className = {styles.optiondiv}>
          <input type="text" name="token" className = {styles.option} value={accessToken} onChange={handleTokenChange} required />
          <label htmlFor="token" className = {styles.optionLabel}>API Token</label>
          <span className = {styles.span}></span>
        </div>
        <div className = {styles.optiondiv}>
            <label htmlFor="data" className = {styles.inputLabel}>Upload File: </label>
            <input name = "data" type="file" onChange={(e) => handleFileChange(e, setFileData)} />
        </div>
        <div className = {styles.btnContainer}>
          <button onClick = {handleUpload} className = {styles.btn}>IPFS 업로드</button>
        </div>
      </div>
    </div>
  );
};

export default CreateVC;
