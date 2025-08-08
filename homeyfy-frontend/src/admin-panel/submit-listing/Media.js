import React, { useEffect, useState } from "react";
import http from "../../http";

const Media = ({ fieldData, onChange }) => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(null);

    useEffect(() => {
        let images = [];
        try {
            images = JSON.parse(fieldData?.images || '[]');
        } catch (error) {
        }
        setUploadedImages(images);
        setFeaturedImage(fieldData?.featured_image || null);
    }, [fieldData?.id]);


    useEffect(() => {
        onChange({
            target: { name: "images", value: uploadedImages }
        });
        onChange({
            target: { name: "featured_image", value: featuredImage }
        });
    }, [uploadedImages, featuredImage]);

    useEffect(() => {
        if (!removeImage) return;
        const updated = uploadedImages.filter((img) => img !== removeImage);
        setUploadedImages(updated);
        if (removeImage === featuredImage) {
            setFeaturedImage(null);
        }

        const removeFromServer = async () => {
            try {
                const token = localStorage.getItem("authToken");
                await http.post(`listing/remove-images/?image_path=${removeImage}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (err) {
                console.error("Image delete error", err);
            }
        };
        removeFromServer();
        setRemoveImage(null);
    }, [removeImage]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("image", file);

        try {
            const token = localStorage.getItem("authToken");
            const res = await http.post("listing/upload-images/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            const imageUrl = res.data.imageUrl;
            setUploadedImages((prev) => [...prev, imageUrl]);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div id="media" className="dashboard-content-block-wrap">
            <h2>Media</h2>
            <div className="dashboard-content-block">
                <div className="media-drag-drop">
                    <div className="upload-icon">
                        <i className="fa fa-image"></i>
                    </div>
                    <h4>
                        Drag and drop the images to customize the gallery order.<br />
                        Click on the star icon to set the featured image<br />
                        <span>(Minimum size 1440 x 900 px)</span>
                    </h4>

                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("fileInput").click();
                        }}
                    >
                        <i className="fa fa-camera"></i> Select and upload
                    </button>
                </div>

                {uploadedImages.length > 0 && (
                    <div className="uploaded-image-previews">
                        <h4>Uploaded Images:</h4>
                        <div className="d-flex flex-wrap gap-2">
                            {uploadedImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`uploaded-image-preview ${image === featuredImage ? 'featured' : ''}`}
                                    onClick={() => setFeaturedImage(image)}
                                    style={{ cursor: 'pointer', position: 'relative' }}
                                >
                                    <img
                                        src={image}
                                        alt={`Uploaded ${index + 1}`}
                                        style={{
                                            width: "100%",
                                            maxWidth: "90px",
                                            height: "85px",
                                            border: image === featuredImage ? "2px solid green" : "1px solid #ccc"
                                        }}
                                    />
                                    <i
                                        className="fa fa-close close"
                                        style={{ position: "absolute", top: 2, right: 2, color: "red" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setRemoveImage(image);
                                        }}
                                    ></i>
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
