import { ActionFunctionArgs } from '@remix-run/node';

import { json } from '~/.server/lib/utils';
import { getThemeSession } from '~/.server/services/session';
import { Theme } from '~/common/constants';
import { isTheme } from '~/hooks/use-theme';

export const action = async ({ request }: ActionFunctionArgs) => {
  const themeSession = await getThemeSession(request);
  const { theme } = (await request.json()) as { theme: Theme };
  if (!isTheme(theme)) {
    return json(
      { error: `theme value of ${theme} is not a valid theme.` },
      { status: 400 },
    );
  }
  themeSession.setTheme(theme);

  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': await themeSession.commit() },
  });
};
