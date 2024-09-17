import { resolveAcceptLanguage } from 'resolve-accept-language';

import { DEFAULT_LANGUAGE, LANGUAGES } from '~/common/constants';

// * lang 코드
export const getLang = (request: Request) => {
  return (
    resolveAcceptLanguage(
      request.headers.get('accept-language')!,
      LANGUAGES,
      DEFAULT_LANGUAGE,
    ) as unknown as string
  ).split('-')[0];
};

// * 현지화 번역 언어셋
export const localize = async (request: Request, namespace = 'common') => {
  const lang = getLang(request);
  const commonTranslations = await import(`../locales/${lang}/common.json`);
  if (namespace === 'common') {
    return commonTranslations.default;
  } else {
    const pageTranslations = await import(`../locales/${lang}/${namespace}.json`);
    return { ...commonTranslations.default, ...pageTranslations.default };
  }
};
