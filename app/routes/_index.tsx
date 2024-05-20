import type { MetaFunction } from '@remix-run/node';

import { Theme } from '~/common/constants';
import { useTheme } from '~/hooks/use-theme';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  const [theme, setTheme] = useTheme();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Remix</h1>
      <p>
        Current theme:&nbsp;
        {theme}
      </p>
      <button onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
        {theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}
      </button>
    </div>
  );
}
