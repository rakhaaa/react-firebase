import { useState } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { doc, setDoc, serverTimestamp  } from "firebase/firestore"; 
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


const New = ({ title, datas }) => {
  const [file, setFile] = useState("");

  const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.value;
    const value = e.target.value;

    setData({...data, [id]:value});
  }

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth, 
        data.email, 
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="icon"
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {datas?.map((inp) => (
                <div className="formInput" key={inp.id}>
                  <label>{inp.label}</label>
                  <input
                    id={inp.id}
                    type={inp.type} 
                    placeholder={inp.placeholder} 
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
