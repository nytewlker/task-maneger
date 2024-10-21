export const navConfig = {
    dashboard: [
      { path: "/", label: "Home" },
      {
        dropdown: true,
        title: "Join Us",
        items: [
          { path: "/register", label: "Register Yourself" },
          { path: "/login", label: "Login Here" },
          { divider: true },
          { path: "/admin", label: "Admin Panel" } // Updated the path for clarity
        ]
      },
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact Us" }
    ],
  };
  