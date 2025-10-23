'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search(props: {placeholder: string}) {
  // const router = useRouter();
  // const searchParams = useSearchParams();

  const { placeholder } = props;


  // const handleSearch = (event: any) => {
  //   event.preventDefault();
  //   const keyword = event.target.keyword.value;
  //   console.log(keyword);
  //   router.push(`/search?keyword=${keyword}`);
  // }


  return (
    <>
      <form 
        className="shadow-lg border-1 border-[#D9D9D9] rounded-[50px] w-[800px] py-[15px] px-[30px] flex items-center "
        // onSubmit={handleSearch}
      >
        <input 
          type="text"
          name="keyword"
          placeholder={placeholder}
          className="order-1 text-[16px] font-[500] text-black bg-transparent outline-none flex-1"
          // defaultValue={searchParams.get('keyword') || ""}
        />
        <button
          type="submit"
          className="order-2 text-[22px] text-black"
        >
          <FaMagnifyingGlass /> 
        </button>
        
      </form>
    </>
  );
}