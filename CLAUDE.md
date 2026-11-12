# dshs43.app — Claude Code 작업 안내

대전과학고 43기 종합 웹서비스 **dshs43.app**. 42기 사이트(dshs42.app, 저장소 `milkcat322/dshs-study`)를 옮겨 온 정적 PWA(`index.html` + `dshs-study.js`)이고, **42기와 같은 Supabase DB** 를 씁니다. 구성 · 배포는 [README.md](README.md). 답변은 한국어로 한다.

## 규칙

- **실제 서비스 DB 를 42기와 함께 쓴다.** 로컬에서 실행해도 실제 DB 에 연결된다. 테스트 데이터를 만들면 반드시 지운다. 42기 학생 데이터에 영향을 주지 않게 조심한다.
- DB(SQL) · RLS · Edge Function 은 이 저장소에 없다. 바꿔야 하면 `milkcat322/dshs-study` 에서 한다 (`cohort43.sql`, `supabase/functions/dshs-oauth` 의 `RETURN_OK` 등). 기수 구분 · 접근 범위는 화면이 아니라 DB 권한(RLS)으로 막는다.
- 프론트 파일(`.js`, `index.html` 등)을 고치면 `sw.js` 의 `CACHE` 버전(`dshs43-v…`)을 **반드시** 올린다. 서비스 워커가 캐시 우선이라 안 올리면 학생 기기에 새 코드가 가지 않는다. `CACHE` 이름은 42기(`dshs-study-v…`)와 겹치지 않게 `dshs43-` 으로 시작한다.
- `dshs-study.js` 는 전역 스코프 모듈이다. 고친 뒤 맨 끝 `init();` 이 **정확히 한 번** 있는지, 같은 함수가 두 번 정의되지 않았는지 확인하고 `node --check dshs-study.js` 로 문법을 본다.
- `config.js` 에는 anon 키 · VAPID 공개키만. service_role 키 · VAPID 비밀키 · dshs.app client_secret 은 절대 넣지 않는다 (코드 · 커밋에도 적지 않는다).
- 사이트 하단과 로그인 창의 "학생 비공식 사이트" 문구는 dshs.app 측 요청이라 지우지 않는다.
- 로그인 이메일 도메인 `EMAIL_DOMAIN = "dshs.study"` 와 로그인 유지 키 `dshs-study-auth` 는 바꾸지 않는다 (42기와 같은 계정 체계).
- 43기 학번은 1000 ~ 1999 (`COHORT_SID`). 그 밖의 학생 계정은 `openOtherCohort` 로 dshs42.app 에 안내한다. 관리자 계정은 `openAdminMoved` 로 관리자 사이트(`CFG.ADMIN_URL`)에 안내한다. 관리자 기능을 이 사이트에 넣지 않는다.
- 43기 과목 · 학점은 `SUBJECTS_43` 한 곳에서 관리한다. 지금은 분반이 없어 모든 과목 `ban: null`(= "전체 분반"). 수행평가를 안 보는 과목은 `NO_ASG_SUBJECTS`.
- 시간표는 아직 없다. 생기면 42기 `dshs-study.js` 의 `openMyTimetable` · `myBlocks` · `ttEvents` 와 `index.html` 의 시간표 화면을 참고해 넣는다. 교시 시각은 `PERIOD_TIME` 한 곳에서만 관리한다.
- 학생에게 보이는 기능을 바꾸면 `updates.js` 맨 위에 항목을 추가한다 (학생이 읽을 말로). 새 기능은 `major: true`.
- `academic.json` 은 GitHub Actions 가 매일 덮어쓰므로 직접 고치지 않는다. NEIS 에 없는 일정은 `academic-extra.json` 에 적고 `node scripts/fetch-academic.mjs`.
- 외부 서비스(dshs.app 등)는 브라우저가 아니라 Edge Function(`dshs-oauth`)을 거친다. 크롤링 · 대리 로그인은 하지 않는다.
- 새 HTML 페이지를 만들면 서비스 워커가 HTML 요청에 `index.html` 을 주므로 `sw.js` 의 `SHELL` 과 navigate 분기에 따로 넣는다.
