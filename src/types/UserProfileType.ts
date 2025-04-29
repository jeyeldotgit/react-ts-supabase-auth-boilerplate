type UserProfileType = {
  firstName: string;
  lastName: string;
  avatar: File | string;
  role: "Admin" | "User";
};

export default UserProfileType;
