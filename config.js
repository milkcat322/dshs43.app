// dshs43.app — 설정
// 42기 사이트(dshs42.app)와 같은 Supabase 프로젝트 · 같은 키를 씁니다. 기수 구분은 DB 권한(RLS)이 합니다.
// 여기에는 공개해도 되는 값(anon 키 · VAPID 공개키)만 둡니다. service_role 키 · VAPID 비밀키는 절대 넣지 않습니다.
//
//   SUPABASE_URL      Settings → API → Project URL
//   SUPABASE_ANON_KEY Settings → API → anon public key   (공개되어도 되는 키입니다)
//   VAPID_PUBLIC_KEY  npx web-push generate-vapid-keys 로 만든 공개키
//
window.DSHS_CONFIG = {
  SUPABASE_URL: "https://jsanpwlleufzgglqkrkv.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzYW5wd2xsZXVmemdnbHFrcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMwOTc4ODEsImV4cCI6MjEwODY3Mzg4MX0.hxqptnpMQXfQ_jztsXqxnpx5ZQITCWP6pOie8sySlNM",
  VAPID_PUBLIC_KEY: "BIX8--TywfEp92OPeHlIJjml8hzrk4YCFNxBsoMJ6ckn8nX-9cpm5voycfpD642uMRe5jCzAV2yDB_cj8agi4Fo",
  // 43기 관리자 사이트 (milkcat322/dshs43-admin, dshs-study 의 admin/ 을 --cohort 43 으로 묶은 것) · 이 학생 사이트 주소
  ADMIN_URL: "https://dshs43-admin.netlify.app",
  STUDENT_URL: "https://dshs43.netlify.app",
};
