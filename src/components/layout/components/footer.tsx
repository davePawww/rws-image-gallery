import { motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

import avatarImg from '@/assets/dave.jpeg';
import SocialsIcon from '@/components/layout/components/socials-icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Social } from '@/types/common.types';

const socials: Social[] = [
  { link: 'https://x.com/davePawww', icon: FaTwitter },
  { link: 'https://www.linkedin.com/in/davepaurillo/', icon: FaLinkedin },
  { link: 'https://github.com/davePawww', icon: FaGithub },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeIn' }}
      className="flex items-center justify-between"
    >
      <p className="text-xs opacity-60">© 2026 | Dave Paurillo</p>
      <div className="flex gap-1">
        {socials.map(({ link, icon: Icon }) => (
          <SocialsIcon key={link} link={link} icon={<Icon size={22} />} />
        ))}
        <a href="https://paurillo-dave.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Avatar className="full-shadow">
            <AvatarImage src={avatarImg} alt="@davePawww" />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>
        </a>
      </div>
    </motion.footer>
  );
}
