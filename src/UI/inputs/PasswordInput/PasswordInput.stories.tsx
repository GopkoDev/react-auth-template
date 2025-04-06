import { Label } from '../../components/Label/Label';
import { PasswordInput, PasswordInputProps } from './PasswordInput';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PasswordInput> = {
  title: 'UI/TextInputs/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable text input component that supports various states and events. It can be disabled, read-only, or auto-focused.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed inside the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the input field',
    },
    value: {
      control: 'text',
      description: 'Current value of the input field',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of characters allowed in the input field',
    },
    minLength: {
      control: 'number',
      description: 'Minimum number of characters allowed in the input field',
    },
    minLengthIndicator: {
      control: 'boolean',
      description: 'Shows the minimum length indicator',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the input field read-only',
    },
    forgotPassword: {
      control: 'boolean',
      description: 'Shows the forgot password link',
    },
    autoFocus: {
      control: 'boolean',
      description: 'Automatically focuses the input field on mount',
    },
    isErrored: {
      control: 'boolean',
      description: 'Applies error styling to the input field',
    },
    onInput: {
      control: false,
      description: 'Callback function called on input event',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    onChange: {
      control: false,
      description: 'Callback function called on change event',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    onFocus: {
      control: false,
      description: 'Callback function called on focus event',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    onBlur: {
      control: false,
      description: 'Callback function called on blur event',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLInputElement>) => void',
        },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names for custom styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    disabled: false,
    name: 'text-input',
    value: '',
    maxLength: undefined,
    readOnly: false,
    autoFocus: false,
    isErrored: false,
    minLength: undefined,
    minLengthIndicator: false,
    forgotPassword: false,
    onInput: () => {},
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    className: '',
  },
};

export const WithMinLengthIndicator: Story = {
  args: {
    value: '12345',
    minLength: 8,
    minLengthIndicator: true,
    forgotPassword: true,
  },
  render: (args: PasswordInputProps) => (
    <Label title="Password">
      <PasswordInput {...args} />
    </Label>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter text',
    value: '',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    value: '1234567',
    isErrored: true,
  },
};

export const ReadOnly: Story = {
  args: {
    placeholder: 'Enter text',
    value: 'Read-only text',
    readOnly: true,
  },
};

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter text',
    value: '',
  },
  render: (args: PasswordInputProps) => (
    <Label title="Label for text input">
      <PasswordInput {...args} />
    </Label>
  ),
};

export const WithErrorAndLabel: Story = {
  args: {
    value: '1234567',
    isErrored: true,
  },
  render: (args: PasswordInputProps) => (
    <Label title="Password" errorText="Password must be at least 8 characters">
      <PasswordInput {...args} />
    </Label>
  ),
};
