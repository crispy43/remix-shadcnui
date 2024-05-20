# Remix Starter
빌드 환경은 Vite, 배포 환경은 Cloudflare 어뎁터가 적용된 Remix 시작 탬플릿입니다. 라이트&다크 테마가 적용되어 있습니다.

## 설치
로컬에 기본적으로 18버전 이상의 node.js가 설치되어 있어야합니다.
패키지 매니저는 yarn 4.1.1 버전을 사용합니다.

패키지 설치하기
```bash
yarn
```

클라우드플레어 환경변수를 설정합니다. 아래 커맨드로 .dev.vars.example을 복사하여 .dev.vars 파일을 복사하여 만들어 줍니다.
```bash
cp .dev.vars.example .dev.vars
```

.dev.vars를 개발 환경에 맞게 수정해줍니다.

## 실행 및 배포
### 개발 환경 실행
```bash
yarn dev
```

### 배포 전 빌드
```bash
yarn build
```

### 배포 앱 실행
```bash
yarn start
```

## 가이드
### 환경변수의 사용
.dev.vars 파일과 클라우드플레어 Pages의 환경변수는 매 요청마다 `context`에 주입됩니다. `process.env.ENV_KEY`와 같은 방법으로 환경변수를 사용할 수 없으므로 아래와 같은 방법으로 사용해야 합니다. 현재 dev 환경과 클라우드플레어 페이지 배포 환경에서 context 객체가 상이한 문제가 있으므로 utils/cloudflare의 `getEnv()`함수를 통해 환경변수를 사용해야 합니다. 클라우드플레어 배포환경에서는 .dev.vars 파일은 사용되지 않으므로 클라우드플레어 대시보드에서 직접 환경변수를 추가하거나 wrangler.toml 파일에 환경변수를 작성해야 합니다.

```typescript
import { getEnv } from '~/utils/cloudflare';

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const API_KEY = getEnv(context).API_KEY;
  /* ... */
};
```

환경변수 추가 시, 타입 매치를 위해 load.context.ts 파일에도 함께 추가해줍니다.

```typescript
// ./load.context.ts
interface Env {
  API_KEY: string;
}
```
