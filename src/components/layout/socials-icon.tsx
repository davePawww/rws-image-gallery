import type { SocialIconProps } from '@/types/common.types';

export default function SocialsIcon({ link, icon }: SocialIconProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="full-shadow flex size-8 items-center justify-center rounded-full"
      aria-label={`Link to ${link}`}
    >
      {icon}
    </a>
  );
}
