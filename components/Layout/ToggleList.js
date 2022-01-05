import { FaLessThan } from "react-icons/fa";

const ToggleList = ({open, setOpen, scrollY}) => {

  return (
    <div
      className={`fixed flex justify-center items-center ${
        open ? "ml-[calc(((2vw+300px)-20px)/2)]" : "ml-[2vw] rotate-180"
      } ${
        scrollY ? "top-20" : "top-[430px]"
      } left-0 cursor-pointer h-10 w-10 rounded-full bg-[#2ca1fd] text-white z-30 transition-all delay-100 duration-500 ease-in-out`}
      onClick={() => setOpen(!open)}
    >
      <FaLessThan />
    </div>
  );
};

export default ToggleList;
