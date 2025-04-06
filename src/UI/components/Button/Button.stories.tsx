import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react';
import { DownloadIcon } from '../../../assets/icons/index';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button component supports different variants, sizes and states. It can contain text, icons or both.',
      },
    },
  },
  tags: ['autodocs'],

  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description:
        'Visual style of the button - filled with background color or outlined with border',
    },
    buttonType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type attribute',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interactions and applies visual styling',
    },
    width: {
      control: 'text',
      description: 'Custom width for the button (auto, px, %, etc)',
    },
    onClick: {
      action: 'clicked',
      control: false,
      description:
        'Function called when button is clicked. Returns event object',
    },
    size: {
      control: 'select',
      options: ['icon', 'default'],
      description: 'Button size',
    },
    className: {
      control: 'text',
      description: 'Custom class name for the button',
    },
    ref: {
      control: false,
      description: 'Reference to the button element',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
    disabled: false,
    width: 'auto',
    buttonType: 'button',
    size: 'default',
    className: '',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    disabled: false,
    width: 'auto',
    size: 'default',
  },
};
export const IconTextButton: Story = {
  args: {
    children: (
      <>
        <DownloadIcon size={18} /> Icon Button
      </>
    ),
    variant: 'outlined',
    size: 'icon',
    disabled: false,
    width: '150px',
  },
};

export const IconButton: Story = {
  args: {
    children: <DownloadIcon size={18} />,
    variant: 'outlined',
    size: 'icon',
    disabled: false,
  },
};
