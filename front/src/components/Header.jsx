import logo from "../asset/logo.svg";

function Header() {
  return (
    <div
      className="w-full py-5 flex justify-center cursor-pointer fixed top-0 bg-pink-bg left-0 z-10"
      onClick={() => (window.location.href = "/")}
    >
      <img src={logo} alt="logo" className="w-[230px] h-[20px]" />
    </div>
  );
}

export default Header;
