import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import NextLink from "next/link";

export function HeroNavbar() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link as={NextLink} href="/" className="font-bold text-inherit">
          Sport Scribe
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link as={NextLink} href="/articles" color="foreground">
            Articles
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link as={NextLink} href="/sports" color="foreground">
            Sports
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={NextLink} color="primary" href="/admin" variant="flat">
            Admin
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
