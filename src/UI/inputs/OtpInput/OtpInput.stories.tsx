import type { Meta, StoryObj } from '@storybook/react';
import { OtpInput } from './OtpInput';

const meta: Meta<typeof OtpInput> = {
  title: 'UI/TextInputs/OtpInput',
  component: OtpInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An OTP input component for entering PIN codes or verification codes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    length: {
      control: 'number',
      description: 'Number of OTP input fields',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function triggered when OTP changes',
    },
  },
};
export default meta;

type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  args: {
    length: 6,
  },
};
