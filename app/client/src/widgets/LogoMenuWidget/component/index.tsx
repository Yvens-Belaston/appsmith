import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface NavLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface ResponsiveMenuProps {
  logo: { src?: string; alt?: string; textFallback?: string };
  links: NavLink[];
  sticky?: boolean;

  // Optional styling knobs to match your widget props
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  borderRadius?: string;
  boxShadow?: string;
}

const NavBar = styled.nav<{
  sticky?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  boxShadow?: string;
}>`
  position: ${({ sticky }) => (sticky ? "sticky" : "relative")};
  top: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 56px;
  padding: 0 16px;

  background: ${({ backgroundColor }) => backgroundColor ?? "#ffffff"};
  color: ${({ textColor }) => textColor ?? "inherit"};
  border-radius: ${({ borderRadius }) => borderRadius ?? "0"};
  box-shadow: ${({ boxShadow }) => boxShadow ?? "none"};
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  font-weight: 600;
  line-height: 1;
`;

const LogoImg = styled.img`
  display: block;
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const Links = styled.ul<{ open: boolean }>`
  list-style: none;
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;

    flex-direction: column;
    gap: 0;

    background: inherit;
    color: inherit;
    border-radius: 0 0 8px 8px;

    max-height: ${({ open }) => (open ? "260px" : "0")};
    overflow: hidden;
    transition: max-height 180ms ease-out;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`;

const LinkItem = styled.li<{ accentColor?: string }>`
  a,
  button {
    all: unset;
    cursor: pointer;
    display: inline-block;
    padding: 8px 10px;
    border-radius: 6px;

    &:focus-visible {
      outline: 2px solid ${({ accentColor }) => accentColor ?? "#6c63ff"};
      outline-offset: 2px;
    }
  }

  @media (max-width: 768px) {
    a,
    button {
      display: block;
      width: 100%;
      padding: 14px 16px;
    }
  }
`;

const Burger = styled.button<{ accentColor?: string }>`
  all: unset;
  cursor: pointer;
  display: none;
  padding: 8px;
  border-radius: 6px;

  &:focus-visible {
    outline: 2px solid ${({ accentColor }) => accentColor ?? "#6c63ff"};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;

const BurgerIcon = ({ open }: { open: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
    {open ? (
      <path d="M18.3 5.71L12 12.01 5.7 5.7 4.29 7.11 10.59 13.4 4.29 19.7 5.7 21.11 12 14.82 18.3 21.12 19.71 19.71 13.41 13.41 19.71 7.11z" />
    ) : (
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    )}
  </svg>
);

/**
 * ResponsiveMenu
 * - Desktop: inline links
 * - Mobile: hamburger toggles a slide-down list
 */
export default function ResponsiveMenu({
  logo,
  links,
  sticky,
  backgroundColor,
  textColor,
  accentColor,
  borderRadius,
  boxShadow,
}: ResponsiveMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = ((Math.random() * 2_000_000) | 0) + 1;

  // Close on escape for a11y
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <NavBar
      sticky={sticky}
      backgroundColor={backgroundColor}
      textColor={textColor}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
      role="navigation"
      aria-label="Primary"
    >
      {console.log("@@@@@@@@@@logo:", logo)}
      {console.log("@@@@@@@links:", links)}
      <Brand href="/">
        {logo?.src ? (
          <LogoImg src={logo.src} alt={logo.alt ?? "Logo"} />
        ) : (
          <span>{logo?.textFallback ?? "Brand"}</span>
        )}
      </Brand>

      <Burger
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-controls={menuId}
        aria-expanded={open}
        accentColor={accentColor}
      >
        <BurgerIcon open={open} />
      </Burger>

      <Links open={open}>
        {links.map(({ label, href, onClick }) => (
          <LinkItem key={label} accentColor={accentColor}>
            {href ? (
              <a href={href} onClick={() => setOpen(false)}>
                {label}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onClick?.();
                  setOpen(false);
                }}
              >
                {label}
              </button>
            )}
          </LinkItem>
        ))}
      </Links>
    </NavBar>
  );
}
