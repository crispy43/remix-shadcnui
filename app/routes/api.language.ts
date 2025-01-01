import { ActionFunctionArgs } from '@remix-run/node';
import { FromSchema } from 'json-schema-to-ts';

import { isLanguage } from '~/.server/lib/localization';
import { invalidError, json, parseFormData } from '~/.server/lib/utils';
import { getLanguageSession } from '~/.server/services/session';
import ajv from '~/lib/ajv';

// JSON Schema로 파라미터 타입 정의하고 Ajv로 유효성 검사
// https://github.com/ThomasAribart/json-schema-to-ts#readme
// https://ajv.js.org/
const postLanguageSchema = {
  type: 'object',
  properties: {
    language: {
      type: 'string',
      description: 'The language code to set.',
    },
  },
  required: ['language'],
  additionalProperties: false,
} as const;

export const action = async ({ request }: ActionFunctionArgs) => {
  const languageSession = await getLanguageSession(request);
  const payload = await parseFormData<FromSchema<typeof postLanguageSchema>>(request);
  const validate = ajv.compile(postLanguageSchema);
  const valid = validate(payload);
  if (!valid) {
    return invalidError(validate.errors!);
  }
  if (!isLanguage(payload.language)) {
    return json(
      { message: `language value of ${payload.language} is not a valid language.` },
      { status: 400 },
    );
  }
  languageSession.setLanguage(payload.language);

  return new Response(null, {
    status: 204,
    headers: { 'Set-Cookie': await languageSession.commit() },
  });
};
