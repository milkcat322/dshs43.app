# dshs43.app

대전과학고 **43기**(2026년 1학년) 학생용 종합 웹서비스. 42기 사이트 [dshs42.app](https://dshs42.app) (저장소 `milkcat322/dshs-study`)를 옮겨 와 43기에 맞게 고친 정적 PWA 입니다.

- 수행평가 공지 (43기 12과목, 분반 없이 모두 "전체 분반") · 댓글 · 완료 표시
- 내 일정 달력 (개인 일정 · 친구와 공유 · 할 일 기한 · 학교 일정 · dshs.app 신청 내역)
- 할 일 (오늘 할 일 · 그룹)
- 급식 (NEIS)
- 학교 일정 (NEIS 학사일정, 1학년 일정만)
- 마감 · 일정 알림 (웹 푸시), 피드백, 내 위치, 화면 테마
- 로그인은 dshs.app 계정으로 (회원가입 화면 없음)

**시간표는 아직 없습니다.** 43기 시간표가 나오면 42기 사이트처럼 시간표 화면 · 달력의 수업 블록 · 분반을 추가합니다 (`dshs-study.js` 의 `allClassList` · `roster` · `PERIOD_TIME` 참고).

## 백엔드: 42기와 같은 Supabase DB

- `config.js` 의 Supabase 주소 · anon 키 · VAPID 공개키는 42기 사이트와 **같습니다**. 별도 DB 를 만들지 않습니다.
- 기수 구분은 DB 쪽 **수강 정보(enrollments)와 RLS** 가 합니다. 43기 학생은 43기 과목 공지만, 42기 학생은 42기 공지만 보이게 막는 것은 화면이 아니라 DB 권한입니다.
- 화면에서도 한 번 더: 학번이 1000 ~ 1999 가 아닌 학생 계정으로 로그인하면 "43기 사이트예요" 창을 띄우고 dshs42.app 으로 안내합니다. 관리자 계정은 관리자 사이트로 안내합니다.
- 로그인 이메일 도메인(`dshs.study`) · 로그인 유지 키(`dshs-study-auth`)는 42기와 같은 계정을 쓰므로 바꾸지 않습니다.

### 서버 쪽에 필요한 것 (이 저장소가 아니라 `milkcat322/dshs-study` 에 있음)

1. **`cohort43.sql`** — 43기 수강 정보(enrollments)와 기수별 RLS. Supabase SQL Editor 에서 실행합니다.
2. **`dshs-oauth` Edge Function 의 `RETURN_OK`** — dshs.app 로그인 뒤 돌아올 주소에 아래를 추가하고 함수를 다시 배포합니다.
   - `https://dshs43.app`, `https://www.dshs43.app`
   - `https://dshs43.netlify.app`, `https://<브랜치>--dshs43.netlify.app`
3. 관리자 사이트(`dshs42-admin`)는 42기 · 43기가 함께 씁니다. 이 저장소에는 관리자 코드가 없습니다.

## 배포 (Netlify)

1. Netlify 에서 **Add new site → Import from Git** 으로 이 저장소(`milkcat322/dshs43.app`)를 연결합니다.
2. Build command 는 **비워 두고**, Publish directory 는 **저장소 루트**(`/` 또는 `.`)로 합니다. 빌드 과정이 없는 정적 사이트입니다.
3. 사이트 이름을 `dshs43` 으로 하면 `https://dshs43.netlify.app` 이 됩니다. 도메인 `dshs43.app` 은 나중에 Netlify Domain settings 에서 연결합니다.
4. `main` 에 push 하면 바로 배포됩니다.

## 파일

| 파일 | 내용 |
| --- | --- |
| `index.html` | 화면 · 스타일 · 테마 · 설치 안내 · 업데이트 팝업 |
| `dshs-study.js` | 로그인 · 수행평가 · 내 일정 · 할 일 · 급식 · 알림 등 (전역 스코프 모듈, 맨 끝 `init();`) |
| `config.js` | Supabase 공개 설정 (anon 키만) |
| `sw.js` | 서비스 워커 (캐시 · 푸시). `CACHE` 이름은 `dshs43-v…` |
| `updates.js` | 학생에게 보이는 업데이트 소식 |
| `manifest.webmanifest` | 앱 설치 정보 (`id` 를 42기와 다르게 해서 따로 설치됨) |
| `academic.json` | NEIS 학사일정 (GitHub Actions 가 매일 갱신, 직접 고치지 않음) |
| `academic-extra.json` | NEIS 에 없는 일정 (카톡 공지 등). 고친 뒤 `node scripts/fetch-academic.mjs` |
| `scripts/fetch-academic.mjs` · `.github/workflows/academic.yml` | 학사일정 매일 갱신 |
| `seat-a.jpg` · `seat-b.jpg` | 자습실 배치도 (내 위치의 자습실 자리 표시) |

## 로컬에서 보기

정적 파일이라 아무 웹 서버로 열면 됩니다 (예: `npx serve .`). **로컬에서도 실제 서비스 DB 에 연결됩니다.** 테스트로 만든 데이터는 꼭 지웁니다.
