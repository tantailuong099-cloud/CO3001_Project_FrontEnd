// 'use client'

// import { useRouter, useSearchParams } from "next/navigation";
// import { FaMagnifyingGlass } from "react-icons/fa6";

// export default function Search(props: {placeholder: string}) {
//   // const router = useRouter();
//   // const searchParams = useSearchParams();

//   const { placeholder } = props;


//   // const handleSearch = (event: any) => {
//   //   event.preventDefault();
//   //   const keyword = event.target.keyword.value;
//   //   console.log(keyword);
//   //   router.push(`/search?keyword=${keyword}`);
//   // }


//   return (
//     <>
//       <form 
//         className="shadow-lg border-1 border-[#D9D9D9] rounded-[50px] w-[800px] py-[15px] px-[30px] flex items-center "
//         // onSubmit={handleSearch}
//       >
//         <input 
//           type="text"
//           name="keyword"
//           placeholder={placeholder}
//           className="order-1 text-[16px] font-[500] text-black bg-transparent outline-none flex-1"
//           // defaultValue={searchParams.get('keyword') || ""}
//         />
//         <button
//           type="submit"
//           className="order-2 text-[22px] text-black"
//         >
//           <FaMagnifyingGlass /> 
//         </button>
        
//       </form>
//     </>
//   );
// }


'use client'

import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";

export default function Search(props: { placeholder: string }) {
  const { placeholder } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex items-center justify-center w-[900px]">
      {/* Search bar */}
      <form
        className="shadow-lg border border-gray-300 rounded-full w-[800px] py-[12px] px-[25px] flex items-center bg-white"
      >
        <input
          type="text"
          name="keyword"
          placeholder={placeholder}
          className="order-1 text-[16px] font-medium text-black bg-transparent outline-none flex-1"
        />
        <button
          type="submit"
          className="order-2 text-[20px] text-gray-700 hover:text-black"
        >
          <FaMagnifyingGlass />
        </button>
      </form>

      {/* Filter dropdown */}
      <div className="relative ml-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md hover:bg-gray-50 transition"
        >
          <FaChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          <span className="text-sm font-medium text-gray-800">Filters</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-[#5E5473] text-white rounded-md shadow-lg py-2 z-50">
            {["Authors", "Genre", "Publish", "Document type", "Subject"].map((item) => (
              <div
                key={item}
                className="px-4 py-2 text-sm hover:bg-[#766B92] cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
