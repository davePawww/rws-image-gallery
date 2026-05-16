import { Item, ItemContent, ItemFooter, ItemGroup, ItemHeader } from '@/components/ui/item';

export function GalleryItemSkeleton() {
  return (
    <Item variant="outline" className="animate-pulse">
      <ItemHeader className="flex flex-col items-start">
        <div className="bg-muted h-5 w-3/4 rounded-sm" />
        <div className="flex w-full flex-col gap-1">
          <div className="bg-muted h-3 w-1/2 rounded-sm" />
          <div className="bg-muted h-3 w-1/3 rounded-sm" />
        </div>
        <div className="bg-muted aspect-square w-full rounded-sm" />
      </ItemHeader>
      <ItemContent>
        <div className="flex flex-wrap gap-1">
          <div className="bg-muted h-5 w-12 rounded-sm" />
          <div className="bg-muted h-5 w-14 rounded-sm" />
          <div className="bg-muted h-5 w-10 rounded-sm" />
        </div>
      </ItemContent>
      <ItemFooter className="flex justify-end">
        <div className="bg-muted size-9 rounded-md" />
        <div className="bg-muted size-9 rounded-md" />
      </ItemFooter>
    </Item>
  );
}

export function GallerySkeleton({ count = 6 }: { count?: number }) {
  return (
    <ItemGroup className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
      {Array.from({ length: count }, (_, idx) => (
        <GalleryItemSkeleton key={idx} />
      ))}
    </ItemGroup>
  );
}
