type Author = {
  name: string;
  website: string;
  avatar: string;
};

export const authors: { [k: string]: Author } = {
  wiperr: {
    name: "Shivang Rathore",
    website: "https://github.com/wiper-r",
    avatar: "/avatars/wiperr.png",
  },
  dhruva: {
    name: "Dhruva",
    website: "https://github.com/dhruva430",
    avatar: "/avatars/dhruva.jpg",
  },
};
