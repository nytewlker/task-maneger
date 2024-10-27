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
        { path: "/admin", label: "Admin Panel" },
      ]
    },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact Us" },
  ],
  userPanel: [
    { path: "/dashboard", label: "Home"   },
    { path: "/createproject", label: "createProjects"   },
    { path: "/projects", label: "Projects"   },

    { path: "/setting", label: "Setting" }
  ]
};
