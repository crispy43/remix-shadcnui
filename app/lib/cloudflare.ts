import { AppLoadContext } from '@remix-run/cloudflare';

export const env = (context: AppLoadContext) => {
  if (context.context) {
    return (context.context as AppLoadContext).cloudflare.env;
  }
  return context.cloudflare.env;
};
