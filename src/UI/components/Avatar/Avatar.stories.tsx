import { Avatar } from './Avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component displays a user profile image or a fallback text if the image is unavailable.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'URL of the avatar image',
    },
    userName: {
      control: 'text',
      description: 'Name of the user for fallback text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg',
    userName: 'CN',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/image.png',
    userName: 'AB',
  },
};

export const NoImage: Story = {
  args: {
    src: '',
    userName: 'XY',
  },
};
