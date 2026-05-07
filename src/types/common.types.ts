import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export type ChildrenWrapperProps = {
  children: ReactNode;
};

export type ThemeStore = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

export type Social = {
  link: string;
  icon: IconType;
};

export type SocialIconProps = {
  link: string;
  icon: ReactNode;
};
