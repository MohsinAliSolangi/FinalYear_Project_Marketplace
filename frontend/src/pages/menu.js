const menus = [
  {
    id: 1,
    name: "Home",
    links: "/",
    namesub: null,
  },
  {
    id: 2,
    name: "Explore",
    links: "/explore",
    namesub: null,
  },
  
  {
    id: 5,
    name: "Page",
    links: "#",
    namesub: [
      {
        id: 1,
        sub: "Authors",
        links: "/authors",
      },
      {
        id: 4,
        sub: "Create Item",
        links: "/create-item",
      },
      {
        id: 5,
        sub: "Edit Profile",
        links: "/edit-profile",
      },
      
    ],
  },
  
];

export default menus;
