import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardProps } from './Card';
import { Label } from '../Label/Label';
import { TextInput } from '../../inputs/TextInput/TextInput';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible card component with Header, Body, Footer, Title, and Subtitle.',
      },
    },
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Sets the maximum width of the card',
    },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    width: '400px',
  },
  render: (args: CardProps) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle>Card Subtitle</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Label title="Label Title">
          <TextInput placeholder="Enter text" />
        </Label>
      </Card.Body>
      <Card.Footer>
        <Button width="100%">Submit</Button>
      </Card.Footer>
    </Card>
  ),
};
