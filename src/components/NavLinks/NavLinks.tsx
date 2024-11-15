import { Links, LinksTypes } from "./types"


const NavLinks = ({ links }: LinksTypes) => {
  return (
    <ul className="flex flex-row gap-4">
      {
        links.map((link: Links) => (
          <li key={link.name} className={link.current ? 'text-white' : 'text-blue-500'}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))
      }
    </ul>
  )
}

export default NavLinks