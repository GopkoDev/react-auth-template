import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { Button } from '../Button/Button';

export default {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component:
          'A reusable modal component with header, body, and footer sections. Includes overlay, close button, and click-outside-to-close functionality.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is open or closed.',
    },
    onClose: {
      action: 'closed',
      description: 'Callback function triggered when the modal is closed.',
    },
    children: {
      description: 'Content of the modal, including header, body, and footer.',
    },
  },
  tags: ['autodocs'],
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>This is the body of the modal. You can add any content here.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose} variant="outlined">
            Close
          </Button>
          <Button onClick={() => alert('Action performed!')}>Action</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: false,
};

Default.parameters = {
  docs: {
    description: {
      story:
        'This is the default state of the modal, where it is initially closed.',
    },
  },
};

export const Open = Template.bind({});
Open.args = {
  isOpen: true,
};

Open.parameters = {
  docs: {
    description: {
      story: 'This story demonstrates the modal in an open state.',
    },
  },
};
