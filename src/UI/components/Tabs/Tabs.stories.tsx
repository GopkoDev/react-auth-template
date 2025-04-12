import { Tabs } from './Tabs';
import type { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs component allows switching between different views or content sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tabs with labels and content.',
    },
    activeIndex: {
      control: 'number',
      description: 'Index of the currently active tab.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback function triggered when the active tab changes.',
    },
  },
};
export default meta;

const Template: StoryFn<typeof Tabs> = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Tabs
      {...args}
      activeIndex={activeIndex}
      onChange={(index) => {
        setActiveIndex(index);
        console.log(`Active tab changed to: ${index}`);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  tabs: [
    { label: 'Tab 1', content: 'Content for Tab 1' },
    { label: 'Tab 2', content: 'Content for Tab 2' },
    { label: 'Tab 3', content: 'Content for Tab 3' },
  ],
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
  tabs: [
    { label: 'Overview', content: <div>Overview content goes here.</div> },
    { label: 'Details', content: <div>Details content goes here.</div> },
    { label: 'Settings', content: <div>Settings content goes here.</div> },
  ],
};
