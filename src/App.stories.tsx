import type { Meta, StoryObj } from '@storybook/react-vite';

import App from '@/App';

const meta = {
  title: 'Main Content/Layout',
  component: App,
  args: {
    children: 'Main Content',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
