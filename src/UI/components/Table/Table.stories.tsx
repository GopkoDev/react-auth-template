import type { Meta, StoryObj } from '@storybook/react';
import { Table, HeaderTypes, TableProps } from './Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A table component that displays data in a grid format.

### Example Usage

\`\`\`tsx
import React from 'react';
import { Table } from './Table';

interface ExampleData {
    id: number;
    name: string;
    value: string;
}

const headers = [
    {
        title: 'ID',
        cellSize: '1fr',
        cell: (data: ExampleData) => <span>{data.id}</span>,
    },
    {
        title: 'Name',
        cellSize: '2fr',
        cell: (data: ExampleData) => <span>{data.name}</span>,
    },
    {
        title: 'Value',
        cellSize: '2fr',
        cell: (data: ExampleData) => <span>{data.value}</span>,
    },
];

const data = [
    { id: 1, name: 'Item 1', value: 'Value 1' },
    { id: 2, name: 'Item 2', value: 'Value 2' },
    { id: 3, name: 'Item 3', value: 'Value 3' },
];

const App = () => (
    <Table
        headers={headers}
        data={data}
        emptyState="No Data Available"
    />
);

export default App;
\`\`\`
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: false,
      description: 'Array of table headers',
    },
    data: {
      control: false,
      description: 'Array of data to be displayed',
    },
    emptyState: {
      control: 'text',
      description: 'Text to display when no data is available',
    },
  },
};
export default meta;

type Story = StoryObj<TableProps<ExampleData>>;

interface ExampleData {
  id: number;
  name: string;
  value: string;
}

const HEADERS: HeaderTypes<ExampleData>[] = [
  {
    title: 'ID',
    cellSize: '1fr',
    cell: (data: ExampleData) => <span>{data.id}</span>,
  },
  {
    title: 'Name',
    cellSize: '4fr',
    cell: (data: ExampleData) => <span>{data.name}</span>,
  },
  {
    title: 'Value',
    cellSize: '4fr',
    cell: (data: ExampleData) => <span>{data.value}</span>,
  },
];

const DATA: ExampleData[] = [
  { id: 1, name: 'Item 1', value: 'Value 1' },
  { id: 2, name: 'Item 2', value: 'Value 2' },
  { id: 3, name: 'Item 3', value: 'Value 3' },
];

export const Default: Story = {
  args: {
    emptyState: 'No data available',
    headers: HEADERS,
    data: DATA,
  },
};

export const EmptyState: Story = {
  args: {
    emptyState: 'No data available',
    headers: HEADERS,
    data: [],
  },
};
