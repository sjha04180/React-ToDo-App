
import { FaTasks } from "react-icons/fa";

const Navbar = () => {
  return (
 <nav className='flex justify-between items-center bg-indigo-400 text-white py-3 pl-10'>
    <div className="logo">
        {/* <img src={todo} alt="" className="w-18 h-12 mx-8 hover:cursor-pointer"/> */}
        <span className='hover:cursor-pointer'><FaTasks /></span>
    </div>
    <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all text-xl">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all text-xl">Your Tasks</li>
    </ul>
 </nav>
  )
}

export default Navbar
