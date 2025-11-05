import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

export default function Footer() {
  return( 
    <>
      <div className="bg-[#000000] px-6 py-2">
        <div className="text-white"> 
          Copyright@2025 Ho Chi Minh University of Technology. All rights reserved.
        </div>

        <div className="flex text-white items-center gap-3">  
          <span>
            <FiPhone />
          </span>
          <span>
            0123456789
          </span>
        </div>

        <div className="flex text-white items-center gap-3">
          <span>
            <IoLocationOutline />
          </span>
          <span>
            Address: 268, Ly Thuong Kiet street, Dien Hong ward, Ho Chi Minh city
          </span>
        </div>
      </div>
    </>
  );
}
