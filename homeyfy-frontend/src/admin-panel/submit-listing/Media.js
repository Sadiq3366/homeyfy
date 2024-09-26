import React, {useEffect, useState} from "react";
import http from "../../http"; // Ensure this is properly configured for Axios or your HTTP library.

const Media = () => {
    const [uploadedImages, setUploadedImages] = useState(() => {
        // Retrieve uploaded images from localStorage when component mounts
        const savedImages = localStorage.getItem("uploadedImages");
        return savedImages ? JSON.parse(savedImages) : [];
    });

    useEffect(() => {
        // Store uploaded images in localStorage whenever the list changes
        localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));
    }, [uploadedImages]);


    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const token = localStorage.getItem("authToken");
                const response = await http.post("listing/upload-images/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`, // If you're using a Bearer token for auth
                    },
                });
                const imageUrl = response.data.imageUrl;
                setUploadedImages((prevImages) => [...prevImages, imageUrl]);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("Please select a file first");
        }
    };

    return (
        <div id="media" className="dashboard-content-block-wrap">
            <h2>Media</h2>
            <div className="dashboard-content-block">
                <div id="homeyfy_gallery_dragDrop" className="media-drag-drop">
                    <div className="upload-icon">
                        <i className="fa fa-image" aria-hidden="true"></i>
                    </div>
                    <h4>
                        Drag and drop the images to customize the gallery order.<br />
                        Click on the star icon to set the featured image<br />
                        <span>(Minimum size 1440 x 900 px)</span>
                    </h4>

                    {/* Hidden input for file selection */}
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                    {/* Single Button for selecting and uploading */}
                    <button
                        id="select_gallery_images"
                        className="btn btn-secondary"
                        onClick={(e) =>{e.preventDefault(); document.getElementById("fileInput").click()}}
                    >
                        <i className="fa fa-camera"></i> Select and upload
                    </button>
                </div>

                {/* Show the uploaded image after it's successfully uploaded */}
                {uploadedImages.length > 0 && (
                    <div className="uploaded-image-previews">
                        <h4>Uploaded Images:</h4>
                        <div className="d-flex">
                            {uploadedImages.map((image, index) => (
                                <div key={index} className="uploaded-image-preview">
                                    <input type="hidden" name="images[]" value={image} />
                                    <img
                                        src={image}
                                        alt={`Uploaded preview ${index + 1}`}
                                        style={{ width: "100%", maxWidth: "90px", marginTop: "10px", height: "85px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Media;
