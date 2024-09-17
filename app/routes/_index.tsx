import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Theme } from '~/common/constants';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/hooks/use-theme';
import { localize } from '~/lib/localization';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await localize(request, 'welcome');
  return { t };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { t } = data;
  return [{ title: t.meta.title }, { name: 'description', content: t.meta.description }];
};

export default function Index() {
  const { t } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useTheme();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{t.welcome}</h1>
      <p>
        Current theme:&nbsp;
        {theme}
      </p>
      <Button onClick={() => setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK)}>
        {theme === Theme.DARK ? Theme.LIGHT : Theme.DARK}
      </Button>
    </div>
  );
}
