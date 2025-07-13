export const handleDeleteImage = async (publicId: string) => {
    if (!publicId) return;

    try {
        await fetch("http://localhost:3000/api/cloudinary/delete-image", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ publicId }),
        });
    } catch (err) {
        console.error("Error deleting image:", err);
    }
};
export const handleImageUpload = async (imgURL: string) => {
    const data = new FormData();
    data.append("file", imgURL);
    data.append("upload_preset", "test_folder");
    data.append("cloud_name", "dcuzggcsg");
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/dcuzggcsg/image/upload`,
        { method: "POST", body: data }
    );
    if (!res.ok) {
        throw new Error("Image upload failed");
    }

    const uploadImageResponse = await res.json();

    // Extract the image URL
    return uploadImageResponse;
}