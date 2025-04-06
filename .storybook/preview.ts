import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import './../src/main.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'var(--main_surface)' }],
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
