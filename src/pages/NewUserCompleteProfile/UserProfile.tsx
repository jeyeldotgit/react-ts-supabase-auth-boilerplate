import React, { useState, useEffect } from "react";

import useUserProfile from "../../hooks/useUserProfile";
import { Camera, ImagePlus } from "lucide-react";
import SubmitButton from "../../components/auth/SubmitButton";

import UserProfileType from "../../types/UserProfileType";
import { updateProfile } from "../../api/Profile";
import { useAuth } from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

const inputStyles =
  "px-4 py-2 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-gray-500";

const UserProfile = () => {
  const { session } = useAuth();
  const { userProfile, userId } = useUserProfile();

  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState<string | null | File>(
    null
  );

  const [formData, setFormData] = useState<UserProfileType>({
    first_name: "",
    last_name: "",
    avatar: "",
    role: "User",
  });

  // Prefill formData when userProfile loads
  useEffect(() => {
    if (userProfile) {
      setFormData((prev) => ({
        ...prev,
        first_name: userProfile.first_name || "",
        last_name: userProfile.last_name || "",
        role: userProfile.role || "User",
        avatar: userProfile.avatar || "",
      }));
      setAvatarPreview(userProfile.avatar || null); // Set avatar preview if available
    }
  }, [userProfile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file })); // Store actual File
      const previewUrl = URL.createObjectURL(file); // Create URL for preview
      setAvatarPreview(previewUrl); // Store blob URL for preview
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User profile submitted:", formData);
    try {
      const res = await updateProfile(formData, userId);
      if (res.success) {
        console.log("Profile updated successfully:", res.message);
        navigate("/dashboard"); // Redirect to dashboard or another page
      } else {
        console.error("Profile update failed:", res.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-neutral-100 w-screen h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-2xl w-full max-w-md p-8 font-sans">
        <form
          onSubmit={handleUpdate}
          className="space-y-4 flex flex-col items-center justify-center w-full"
        >
          <h2 className="text-2xl font-bold text-center">
            Complete Your Profile
          </h2>

          {/* Avatar Upload */}
          <div className="flex flex-col">
            <label htmlFor="avatar" className="text-sm text-gray-600 mb-1">
              Upload Avatar
            </label>

            <div className="relative w-24 h-24">
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
                required
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer w-full h-full flex items-center justify-center border border-gray-300 rounded-full overflow-hidden relative group hover:ring-2 hover:ring-gray-400 transition"
              >
                {avatarPreview ? (
                  <>
                    <img
                      src={`${avatarPreview}`}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="text-white w-6 h-6" />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <ImagePlus className="w-6 h-6 mb-1" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={session?.user.email}
              readOnly
              className="px-4 py-2 border rounded-md border-gray-300 outline-none bg-gray-100 cursor-not-allowed"
              placeholder="you@example.com"
            />
          </div>

          {/* First Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="first_name" className="text-sm text-gray-600 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={inputStyles}
              placeholder="First Name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-full">
            <label htmlFor="last_name" className="text-sm text-gray-600 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={inputStyles}
              placeholder="Last Name"
              required
            />
          </div>

          {/* Role */}
          <div className="flex flex-col w-full">
            <label htmlFor="role" className="text-sm text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <SubmitButton label="Complete Profile" />
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
