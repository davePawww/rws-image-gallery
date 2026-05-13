import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'aria-valid-attr-value',
            enabled: false,
          },
          {
            id: 'aria-hidden-focus',
            enabled: false,
          },
          {
            id: 'aria-required-children',
            enabled: false,
          },
        ],
      },

      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    withThemeByClassName({
      defaultTheme: 'light',
      themes: {
        light: 'light',
        dark: 'dark',
      },
    }),
  ],
};

export default preview;
