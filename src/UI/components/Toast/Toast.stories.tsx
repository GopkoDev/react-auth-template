import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from './ToastProvider';
import { ToastContainer } from './ToastContainer/ToastContainer';
import { useToast } from './ToastProvider';
import { Button } from '../Button/Button';

const meta = {
  title: 'UI/Toast',
  component: ToastContainer,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastContainer>;

export default meta;

const ToastDemo = () => {
  const { addToast } = useToast();

  const showErrorToast = () => {
    addToast('Error message!', 'error');
  };

  const showInfoToast = () => {
    addToast('Info message!', 'info');
  };

  const showMultipleToasts = () => {
    setTimeout(showErrorToast, 500);
    setTimeout(showInfoToast, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Button onClick={showErrorToast}>Show Error Toast</Button>
      <Button onClick={showInfoToast}>Show Info Toast</Button>
      <Button onClick={showMultipleToasts}>Show Multiple Toasts</Button>
      <ToastContainer />
    </div>
  );
};

type Story = StoryObj<typeof ToastContainer>;

export const Default: Story = {
  render: () => <ToastDemo />,
};
