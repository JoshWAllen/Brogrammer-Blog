export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Bro Blog",
  description:
    "A place to share wisdom with the boys about gym, coding, and life",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    { title: "Blog", href: "/blog" },
    { title: "Login", href: "/login" },
  ],
  links: {
    github: "https://github.com/JoshWAllen/Brogrammer-Blog",
    blog: "/blog",
  },
}
