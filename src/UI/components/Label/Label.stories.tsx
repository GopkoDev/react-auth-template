import { Label } from './Label';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../../inputs/TextInput/TextInput';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A wrapper component that provides a label and optional error message for form inputs. It helps maintain consistent form field styling and structure across the application.',
      },
    },
  },
  tags: ['autodocs'],

  argTypes: {
    children: {
      control: false,
      description: 'Input element to be wrapped by the label',
    },

    title: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    errorText: {
      control: 'text',
      description:
        'Error message displayed below the input when validation fails',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    title: 'Email',
    children: <TextInput placeholder="Enter your email" />,
    errorText: '',
    className: '',
  },
};

export const WithError: Story = {
  args: {
    title: 'Password',
    errorText: 'Password must be at least 8 characters',
    children: <TextInput value="1234567" isErrored />,
  },
};
