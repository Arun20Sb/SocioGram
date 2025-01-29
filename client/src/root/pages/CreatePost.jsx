import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FileUpload } from "../../components/FileUpload";
import { Button } from "../../components/Button";
import { ImagePlus } from "lucide-react";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("tags", tags);
    formData.append("photo", photo);

    try {
      const response = await axios.post("/api/v1/users/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        Navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Error creating post.");
    } finally {
      // Reset fields
      setCaption("");
      setLocation("");
      setTags("");
      setPhoto(null); // This will reset the photo in the parent
    }
  };

  return (
    <div className="relative w-full flex z-10 items-center justify-center">
      <div className="flex flex-col w-5xl px-10 py-10 gap-7">
        <div className="max-w-4xl flex-start flex items-center gap-3 justify-start w-full">
          <ImagePlus width={40} height={40} />
          <h1 className="text-xl">Create Post</h1>
        </div>
        {/* POST FORM */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col gap-9 max-w-4xl"
        >
          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-50 mb-3">
              Caption
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50 bg-gray-950"
              value={caption}
              onChange={(e) => {
                const words = e.target.value.split(/\s+/).filter(Boolean);
                if (words.length > 80) {
                  alert("Caption cannot exceed 80 words!");
                } else {
                  setCaption(e.target.value);
                }
              }}
              required
              placeholder="Write your caption (max 80 words)"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-50 mb-3">
              Location
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50 bg-gray-950"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-50 mb-3">
              Upload Photo
            </label>
            <FileUpload
              handleFileChange={handleFileChange}
              resetPhoto={() => setPhoto(null)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-50 mb-3">
              Add Tags (separated by comma &quot;,&quot;)
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-50 bg-gray-950"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Travel, LifeStyle, Coding"
              required
            />
          </div>

          <div className="flex gap-4 items-center justify-end">
            <Button
              title="Cancel"
              onClick={() => {
                setCaption("");
                setLocation("");
                setTags("");
                setPhoto(null);
              }}
            />

            <Button type="submit" title="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
