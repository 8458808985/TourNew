const socialMediaLinks = [
  { id: 1, class: "icon-facebook", href: "https://www.facebook.com/sharer/sharer.php?u=YOUR_URL_HERE  " },
  { id: 2, class: "icon-twitter", href: "https://twitter.com/intent/tweet?text=YOUR_MESSAGE_HERE&url=YOUR_URL_HERE  " },
  { id: 3, class: "icon-instagram", href: "https://www.instagram.com/direct/t/mr_anurag_1" },
  { id: 4, class: "icon-linkedin", href: "https://www.linkedin.com/sharing/share-offsite/?url=YOUR_URL_HERE  " },
];

export default function Socials() {
  return (
    <>
      {socialMediaLinks.map((elm, i) => (
        <a key={i} href={elm.href} className={elm.class}></a>
      ))}
    </>
  );
}
