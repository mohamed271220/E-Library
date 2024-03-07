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

    const navItems = [
        { path: "/admin/addBook", label: "Add Book" },
        { path: "/admin/addPost", label: "Add Post" },
        { path: "/admin/addEncyclopedia", label: "Add Encyclopedia" },
        { path: "/admin/addJournal", label: "Add Journal" },
        { path: "/admin/addSearch", label: "Add Search" },
    ];

    return (
        <div className={`${isOpen ? "bg-[#0066ff2c] m-2 rounded" : ""}`}>
            <AnimatePresence>
                <li key={24} onClick={toggleAccordion} className="nav-text">
                    <Link className="border-b flex justify-between items-center">
                        <span>Admin</span>
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
                        {navItems.map((item, index) => (
                            <li key={index} className="nav-text">
                                <NavLink to={item.path}>
                                    <span className="">{item.label}</span>
                                </NavLink>
                            </li>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
export default AdminAccordion;