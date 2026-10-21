# KET family encrypted mirror

This repository publishes only a generic entry page, its decryption loader and an authenticated AES-GCM encrypted payload. It contains no plaintext exam pages, answer keys, child responses, or decryption key.

The owner keeps the complete family capability link privately. Anyone receiving that complete link can read and copy its contents; it is not account-based access control. Do not post the complete link in this repository, issues, commits, README, or public messages.

The key stays in the URL fragment and browser memory. The fragment is not sent as part of the HTTP request. The page has no third-party scripts, analytics or fonts. No child responses are uploaded; browser-local storage and TXT/JSON export remain in the decrypted page. Progress does not sync across devices.

Cryptography: AES-256-GCM; a random 96-bit IV; a 128-bit tag; fixed AAD `KET_FAMILY_MIRROR_V1`. The first 12 bytes of `payload.enc` hold its IV; the rest are authenticated ciphertext and tag. Never reuse a key/IV pair.

This is an owner-authorized household preparation mirror, not a formally admitted question bank or calibrated assessment service.
