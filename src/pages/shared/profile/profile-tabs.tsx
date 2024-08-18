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
          "flex flex-row justify-between list-none gap-2 p-1 bg-light-130 rounded-2xl"
        }
      >
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(index)}
            className={"p-2 px-6 relative "}
          >
            {activeIndex == index && (
              <motion.div
                layoutId={"activeTabIndicator"}
                className="absolute left-0 top-0 bottom-0 w-full bg-light-5 p-2 px-6 rounded-2xl shadow"
              ></motion.div>
            )}
            <a href={`#${section}`} className={"text-lg z-1 relative"}>
              {section}
            </a>
          </button>
        ))}
      </nav>
    </div>
  );
}
