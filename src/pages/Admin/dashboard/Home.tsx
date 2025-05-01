import { User } from "@supabase/supabase-js";
import { useAuth } from "../../../hooks/useAuth";

import Sidebar from "../../../components/dashboard/Sidebar";
import Header from "../../../components/dashboard/Header";

import PatientProfileType from "../../../types/PatientProfileType";

import createPatient from "../../../api/CreatePatient";

const Home = () => {
  const { session } = useAuth();
  const user = session?.user as User;
  const doctorId = user.id;

  const mockFormData: PatientProfileType = {
    email: "jljames18gruta@gmail.com",
    first_name: "John",
    last_name: "Doe",
    birthdate: new Date("1990-05-15"), // or ISO string: "1990-05-15"
    contact_number: "09171234567",
    notes:
      "Patient has a history of dental anxiety. Prefers morning appointments.",
    role: "Patient",
  };

  const handleCreatePatient = async () => {
    try {
      const res = await createPatient(mockFormData, doctorId);

      if (res.success) {
        console.log("Patient created successfully:", res.message);
      } else {
        console.error("Error creating patient:", res.message);
      }
    } catch (error) {
      console.error("Error creating patient:", error);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-neutral-100">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Right section: Header + Main */}
      <div className="flex flex-col flex-1">
        <Header section={"Dashboard"} email={user.email} />

        <main className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <button onClick={handleCreatePatient}> Add Patient </button>
        </main>
      </div>
    </div>
  );
};

export default Home;
