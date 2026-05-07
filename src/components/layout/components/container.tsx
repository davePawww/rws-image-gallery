import type { ChildrenWrapperProps } from '@/types/common.types';

export default function Container({ children }: ChildrenWrapperProps) {
  return (
    <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden p-4">{children}</div>
  );
}
