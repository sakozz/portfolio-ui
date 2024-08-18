import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfileTabs() {
  const sections = [
    "Experience",
    "Education",
    "Skills",
    "Projects",
    "Languages",
    "Certifications",
    "References",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const handleNavClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <nav
        className={
          "flex flex-row items-center justify-between list-none gap-2 p-1 bg-light-120 rounded-3xl"
        }
      >
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={"p-1 px-4 relative "}
          >
            {activeIndex == index && (
              <motion.div
                layoutId={"activeTabIndicator"}
                className="absolute left-0 top-0 bottom-0 w-full bg-white rounded-3xl shadow"
              ></motion.div>
            )}
            <a
              href={`#${section}`}
              className={
                activeIndex == index
                  ? "z-1 text-dark-90 relative"
                  : "z-1 text-dark-60 relative"
              }
            >
              {section}
            </a>
          </button>
        ))}
      </nav>
    </div>
  );
}
