type HeaderProps = {
  section: string; // The section name to display in the header
  email: string | undefined; // The email address to display in the header, can be null
};

const Header = ({ section, email }: HeaderProps) => {
  return (
    <header>
      <div className="flex items-center justify-between p-4 bg-white shadow-md w-full ">
        <div className="text-xl font-bold  px-3 pt-4">
          <h1 className="text-xl font-bold text-gray-800">{section}</h1>
        </div>
        <div className="flex items-center gap-4">
          <span>{email}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
