import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SwitchButton } from './SwitchButton';

export default {
  title: 'UI/Switcher',
  component: SwitchButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    isChecked: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof SwitchButton>;

const Template: StoryFn<typeof SwitchButton> = (args) => {
  const [isChecked, setIsChecked] = useState(args.isChecked || false);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    args.onChange(checked);
  };

  return (
    <SwitchButton {...args} isChecked={isChecked} onChange={handleChange} />
  );
};

export const Default = Template.bind({});
Default.args = {
  isChecked: false,
  label: 'Enable feature',
};

export const Checked = Template.bind({});
Checked.args = {
  isChecked: true,
  label: 'Feature enabled',
};
