// import React, { useRef } from "react";
// import styled from "styled-components";
// const ImageUploader = styled.div`
//   display: flex;
//   justify-content: center;
//   i {
//     font-size: 20px;
//   }
//   .upload-image {
//     cursor: pointer;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-weight: bold;
//   }
//   .edit-image {
//     display: none;
//     cursor: pointer;
//   }
//   align-items: center;
//   border-radius: 12px;
//   height: 150px;
//   border: ${(props) => (props?.img ? "none" : "3px dotted black")};
//   box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
//   &:hover {
//     box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
//       rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
//     .edit-image {
//       display: block;
//     }
//   }
// `;

// function Button({ img, onClick, isDisabled }) {
//   const fileInputRef = useRef(null);

//   const handleUploadClick = () => {
//     fileInputRef?.current?.click(); // Trigger the hidden file input
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       onImageSelect(file); // Call the parent-provided function with the selected file
//     }
//   };
//   return (
//     <ImageUploader
//       img={img}
//       onClick={onClick}
//       disabled={isDisabled}
//       style={{
//         backgroundImage: `url(${img})`,
//       }}
//     >
//       {img && img != null ? (
//         <div className="edit-image">
//           <i className="ri-edit-fill" />
//         </div>
//       ) : (
//         <div className="upload-image">
//           <i className="ri-upload-fill" />
//           <p>Upload</p>
//         </div>
//       )}
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />
//     </ImageUploader>
//   );
// }

// export default Button;

import React, { useRef } from "react";
import styled from "styled-components";

const ImageUploader = styled.div`
position:relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 150px;
  border: ${(props) => (props?.img ? "none" : "3px dotted black")};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  background-size: contain;
background-repeat: no-repeat;
width:250px;

  i {
    font-size: 20px;
  }

  .upload-image {
    display: ${(props) => (props?.img ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }

  .edit-image {
    display: ${(props) => (props?.img ? "block" : "none")};
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  }
`;

function ImageUploaderComponent({ img, onImageSelect }) {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageSelect(file); // Call the parent-provided function with the selected file
    }
  };

  return (
    <>
      <ImageUploader
        img={img}
        onClick={handleUploadClick}
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
       {img? 
        <div className="edit-image">
          <i className="ri-edit-fill" />
        </div>:<div className="upload-image">
          <i className="ri-upload-fill" />
          <p>Upload</p>
        </div>}
      </ImageUploader>
      {/* Hidden input for file selection */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={e=>handleFileChange(e)}
      />
    </>
  );
}

export default ImageUploaderComponent;
