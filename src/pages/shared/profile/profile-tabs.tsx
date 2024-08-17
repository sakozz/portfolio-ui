import { useState } from "react";

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
            className={
              activeIndex == index
                ? "bg-light-5 p-2 px-6 rounded-2xl shadow"
                : "p-2 px-6 "
            }
          >
            <a href={`#${section}`} className={"text-lg"}>
              {section}
            </a>
          </button>
        ))}
      </nav>
    </div>
  );
}
