type UserProfileType = {
  first_name: string;
  last_name: string;
  avatar: File | string;
  role: "Admin" | "User";
};

export default UserProfileType;
