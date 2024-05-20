import { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { resolveAcceptLanguage } from 'resolve-accept-language';

import globalStyles from '~/styles/global.css?url';
import resetStyles from '~/styles/reset.css?url';
import themeStyles from '~/styles/theme.css?url';

import { DEFAULT_LANGUAGE, LANGUAGES } from './common/constants';
import { getThemeSession } from './controllers/session.server';
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from './hooks/use-theme';

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
  const lang = resolveAcceptLanguage(
    request.headers.get('accept-language')!,
    LANGUAGES,
    DEFAULT_LANGUAGE,
  );
  const { getTheme } = await getThemeSession(request, context);

  return {
    lang: lang.split('-')[0],
    ssrTheme: getTheme(),
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: themeStyles },
  ];
};

export const App = () => {
  const { lang, ssrTheme } = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html
      lang={lang}
      data-theme={theme ?? ''}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(ssrTheme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function AppWithProviders() {
  const { ssrTheme } = useLoaderData<typeof loader>();

  return (
    <ThemeProvider
      specifiedTheme={ssrTheme}
      themeAction="/api/theme"
    >
      <App />
    </ThemeProvider>
  );
}
