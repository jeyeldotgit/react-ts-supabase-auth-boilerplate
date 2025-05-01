type PatientProfileType = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  birthdate: string | null | Date; // ISO date string
  contact_number: string | null;
  notes: string | null;
  role: "Patient";
};

export default PatientProfileType;
