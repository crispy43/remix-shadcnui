import { ActionFunctionArgs, json } from '@remix-run/cloudflare';

import { Theme } from '~/common/constants';
import { getThemeSession } from '~/controllers/session.server';
import { isTheme } from '~/hooks/use-theme';

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const themeSession = await getThemeSession(request, context);
  const { theme } = await request.json() as { theme: Theme };

  if (!isTheme(theme)) {
    return json({
      error: `theme value of ${theme} is not a valid theme.`,
    }, 400);
  }

  themeSession.setTheme(theme);

  return json(
    { success: true },
    { headers: { 'Set-Cookie': await themeSession.commit() } },
  );
};
