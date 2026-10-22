# KET family practice mirror

A standalone family practice page with Supabase parent authentication and private cloud records, updated 2026-10-22.

Flow: parent email registration and verification → parent login → add or select a child → exam introduction → control examples → Listening / Speaking / Reading / Writing.

- Reading: native text, one question at a time, complete shared passages, seven groups / 44 questions.
- Writing: two source prompts, original story pictures, typed drafts or paper-photo handoff.
- Speaking: source prompts and picture task for oral answers. Recording is optional and collapsed by default; no recorded-answer feedback is required. Existing local recordings remain available.
- Listening: one complete Test 2 Part 2 group (Q6–10), original 241.14-second MP3 with the original repeated message, five native text fields, source attribution and local playback-condition export. The track was recovered from an existing local source cache and matched against the source question and printed transcript using offline ASR and full decoding; human audio quality and publisher licensing are not certified. Other Listening parts are not represented as ready.
- Parent-scoped child profiles, cloud draft restore, first-submission lock, answer card, copy / TXT / JSON export.

Parent login uses Supabase Auth. The protected Edge API verifies the bearer session for each request and scopes all child and response access to that parent. The database's private tables cannot be accessed directly by browser roles. Only the public publishable key appears in this page; server credentials remain in Supabase's managed function environment.

Answers, typed writing and navigation progress can synchronize across devices under the same parent account. A saved status requires a server revision acknowledgement. Offline drafts remain scoped to the parent and child; conflicting device revisions are not automatically merged. Optional voice recordings remain on the recording device in IndexedDB. JSON contains audio metadata, not audio. Export files regularly and follow the displayed save status.

The initial household rollout uses Supabase's default email sender, which supports project-member addresses only. The signup and password-reset screens disclose this restriction. Other parent emails require a configured mail service; email verification has not been disabled. Deployment and technical tests do not certify email delivery, the first real parent login, or physical iPad resume; those require live acceptance.

Public source questions/images are displayed with the owner's explicit publication authorization and source attribution. This is not an official Cambridge assessment or a copyright licence certification. The child page contains no answer key. No automatic Cambridge scores, proficiency levels, pass probability, AI grading or autonomous adaptive selection are provided. Browser play/ended events do not prove hearing or comprehension. Answers and playback observations have separate persistence status; no atomic transaction across the two is claimed. The parent / GPT chooses the next group after reviewing actual exported responses.

Opening this public page does not publish private child profiles or responses. Old browser-local or anonymous records are not automatically uploaded or assigned to a parent account. Logging out hides the active child's data; unresolved work is retained in a parent-scoped pending backup where browser storage allows. Shared-device access is still subject to the device and browser's own security.
