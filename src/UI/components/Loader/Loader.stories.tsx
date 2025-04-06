import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';
import { useArgs } from 'storybook/internal/preview-api';
import { Button } from '../Button/Button';

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable loader component that can be displayed over the entire page.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: false,
      description: 'Controls the visibility of the loader',
    },
  },
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs();

      const openHandler = () => {
        setArgs({ isOpen: true });

        const timer = setTimeout(() => {
          setArgs({ isOpen: false });
        }, 2000);

        return () => clearTimeout(timer);
      };

      return (
        <>
          <Story args={{ ...args }} />
          <Button onClick={openHandler}>Toggle Loader</Button>
        </>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};
