import { AppLoadContext, createCookieSessionStorage } from '@remix-run/cloudflare';

import { Theme } from '~/common/constants';
import { isTheme } from '~/hooks/use-theme';
import { getEnv } from '~/utils/cloudflare';

export const getThemeSession = async (request: Request, context: AppLoadContext) => {
  const themeStorage = createCookieSessionStorage({
    cookie: {
      name: 'theme',
      secure: true,
      secrets: [getEnv(context).SESSION_SECRET],
      sameSite: 'lax',
      path: '/',
      httpOnly: true,
    },
  });

  const session = await themeStorage.getSession(request.headers.get('Cookie'));

  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session),
  };
};
