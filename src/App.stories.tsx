import type { Meta, StoryObj } from '@storybook/react-vite';

import App from '@/App';
import { useImageGalleryStore } from '@/store/image-gallery.store';

const mockImages = [
  {
    id: 1,
    src: 'https://via.placeholder.com/150',
    name: 'Image 1',
    size: 1024,
    date: '2023-01-01',
    tags: [],
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/150',
    name: 'Image 2',
    size: 2048,
    date: '2023-01-02',
    tags: [],
  },
];

const meta = {
  title: 'Main Content/Layout',
  component: App,
  args: {
    children: 'Main Content',
  },
  argTypes: {},
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      useImageGalleryStore.setState({ images: [], pendingImages: [], previewOpen: false });
      return <Story />;
    },
  ],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithPendingImages: Story = {
  decorators: [
    (Story) => {
      useImageGalleryStore.setState({ pendingImages: mockImages, previewOpen: true });
      return <Story />;
    },
  ],
};
export const WithImages: Story = {
  decorators: [
    (Story) => {
      useImageGalleryStore.setState({ images: mockImages });
      return <Story />;
    },
  ],
};
