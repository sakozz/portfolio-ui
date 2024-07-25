import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    boxShadow: {
      //box shadow from Neom designs
      "lvl-3-top":
        "0px -0.5px 1px 0px rgba(52, 48, 44, 0.01), 0px -1.5px 3px 0px rgba(52, 48, 44, 0.01), 0px -4px 8px 0px rgba(52, 48, 44, 0.02), 0px -8px 16px 0px rgba(52, 48, 44, 0.03)",
      "lvl-3-bottom":
        "0px 0.5px 1px 0px rgba(52, 48, 44, 0.01), 0px 1.5px 3px 0px rgba(52, 48, 44, 0.01), 0px 4px 8px 0px rgba(52, 48, 44, 0.02), 0px 8px 16px 0px rgba(52, 48, 44, 0.03)",
      "lvl-3-right":
        "0.5px 0px 1px 0px rgba(52, 48, 44, 0.01), 1.5px 0px 3px 0px rgba(52, 48, 44, 0.01), 4px 0px 8px 0px rgba(52, 48, 44, 0.02), 8px 0px 16px 0px rgba(52, 48, 44, 0.03)",
      "lvl-4-top":
        "0px -1px 2px 0px rgba(52, 48, 44, 0.02), 0px -3px 6px 0px rgba(52, 48, 44, 0.03), 0px -8px 16px 0px rgba(52, 48, 44, 0.04), 0px -16px 32px 0px rgba(52, 48, 44, 0.06)",
      "lvl-4-bottom":
        "0px 1px 2px 0px rgba(52, 48, 44, 0.02), 0px 3px 6px 0px rgba(52, 48, 44, 0.03), 0px 8px 16px 0px rgba(52, 48, 44, 0.04), 0px 16px 32px 0px rgba(52, 48, 44, 0.06)",
      "lvl-4-right":
        "1px 0px 2px 0px rgba(52, 48, 44, 0.02), 3px 0px 6px 0px rgba(52, 48, 44, 0.03), 8px 0px 16px 0px rgba(52, 48, 44, 0.04), 16px 0px 32px 0px rgba(52, 48, 44, 0.06)",
      "lvl-4-left":
        "-1px 0px 2px 0px rgba(52, 48, 44, 0.02), -3px 0px 6px 0px rgba(52, 48, 44, 0.03), -8px 0px 16px 0px rgba(52, 48, 44, 0.04), -16px 0px 32px 0px rgba(52, 48, 44, 0.06)",
    },
  },
  plugins: [
    createThemes(
      {
        light: {
          light: {
            5: "#F6F5F3",
            15: "#E4E0D7",
            110: "#1D19170D", //hover-bg
            115: "#79736C1A", //sidemenu-active
            120: "#79736C26", //active-bg
            125: "#79736C40", // sidemenu-selected-active
            130: "rgba(0,0,0, 0.16)", //border
            135: "#0908071A", // dropdown-border
            140: "rgba(0,0,0, 0.26)", //hover-border
            145: "#2A252333", // accordion-border
            150: "rgba(0, 0, 0, 0.32)", //active-border
            155: "#C6C0B6",
            160: "#72777A",
            165: "#979C9E",
          },
          dark: {
            20: "#D6D1C6",
            30: "#B5B0A6",
            40: "#968F87",
            45: "#878079",
            50: "#79736C",
            60: "#615A54",
            70: "#4B4440",
            80: "#35302D",
            90: "#1D1917",
            100: "#1E1B19",
            105: "#7D766F",
            110: "#645D57",
            120: "#13100DBF",
            130: "#1E1E1E",
            140: "#202325",
          },
          blue: {
            10: "#E0EEFF",
            50: "#007AB2",
            60: "#F2F8FF",
          },
          green: {
            5: "#D9FFE8",
            10: "#AAFFCF",
            50: "#008453",
            60: "#7DDE86",
          },
          red: {
            40: "#F85959",
            55: "#CB1B19",
            100: "#FEE8E0",
          },
          gold: {
            30: "#DFA700",
            35: "#CB9700",
            40: "#B78900",
            50: "#946D00",
            60: "#FBF8E8",
          },
          orange: {
            50: "#B35C00",
          },
        },
        dark: {
          primary: "turquoise",
          base: "tomato",
          surface: "#4A4A4A",
        },
      },
      { defaultTheme: "light" },
    ),
  ],
};
