import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from 'react-icons/fi';


function AdminAccordion({ onClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
        onClick && onClick(event);
    };

    const variants = {
        open: { scaleY: 1 },
        closed: { scaleY: 0 }
    };

    const variants2 = {
        open: { opacity: 1, height: "auto", rotate: 180 },
        closed: { opacity: 1, height: "auto", rotate: 0 }
    };

    return (
        <div className={`${isOpen ? "bg-[#0066ff2c] m-2 rounded":""}`}>
            <AnimatePresence>
                <li key={24}  onClick={toggleAccordion} className="nav-text">
                    <Link className="border-b flex justify-between items-center">
                        <span>
                            Admin
                        </span>
                        <motion.div
                            animate={isOpen ? "open" : "closed"}
                            variants={variants2}
                            transition={{ duration: 0.5, ease: "easeInOut", transformOrigin: "center" }}
                        >
                            <FiChevronDown color="white" />
                        </motion.div>
                    </Link>
                </li>
                {isOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={variants}
                        transition={{ duration: 0.5, ease: "easeInOut", originY: 0 }}
                        className="overflow-hidden transform origin-top "
                    >
                        <li key={4} className="nav-text ">
                            <NavLink to="/addProduct">
                                <span className="">Add product</span>
                            </NavLink>
                        </li>
                        <li key={43} className="nav-text">
                            <NavLink to="/addPost">
                                <span className="">Add post</span>
                            </NavLink>
                        </li>
                        <li key={422} className="nav-text">
                            <NavLink to="/dashboard">
                                <span className="">Admin dashboard</span>
                            </NavLink>
                        </li>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
export default AdminAccordion;