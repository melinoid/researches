import { APIResponse } from '@playwright/test';
import { bible } from '../../../utils/config';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';

const apiPath = `/v1/bibles/${bible.id}/sections/`;
let response: APIResponse;

test.describe('/v1/bibles/bibleId/sections/sectionId', async () => {
  test('200 code (w/o params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      if (testInfo.retry == 0) {
        helper.compareResponseText(expBody['200wop']['data'], (await response.json())['data']);
      } else {
        // Тhe response is too big, it may change over time, so we check the model on first retry.
        console.log(`Test data in test: "${testInfo.titlePath[1]} ${testInfo.titlePath[2]}" is expired.`);
        helper.compareObjectsKeys(expBody['200wop'], await response.json());
      }
    });
  });

  test('200 code (html & alternate params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        params: {
          'content-type': 'html',
          'include-notes': true,
          'include-titles': false,
          'include-chapter-numbers': true,
          'include-verse-numbers': false,
          'include-verse-spans': true,
          parallels: bible.book.parallelId,
        },
      });
    });
    await test.step('Compare response text', async () => {
      if (testInfo.retry == 0) {
        helper.compareResponseText(expBody['200html']['data'], (await response.json())['data']);
      } else {
        // Тhe response is too big, it may change over time, so we check the model on first retry.
        console.log(`Test data in test: "${testInfo.titlePath[1]} ${testInfo.titlePath[2]}" is expired.`);
        helper.compareObjectsKeys(expBody['200html'], await response.json());
      }
    });
  });

  test('200 code (json & reverse alternate params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        params: {
          'content-type': 'json',
          'include-notes': false,
          'include-titles': true,
          'include-chapter-numbers': false,
          'include-verse-numbers': true,
          'include-verse-spans': false,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      if (testInfo.retry == 0) {
        helper.compareResponseText(expBody['200json']['data'], (await response.json())['data']);
      } else {
        // Тhe response is too big, it may change over time, so we check the model on first retry.
        console.log(`Test data in test: "${testInfo.titlePath[1]} ${testInfo.titlePath[2]}" is expired.`);
        helper.compareObjectsKeys(expBody['200json'], await response.json());
      }
    });
  });

  test('200 code (text & all params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        params: {
          'content-type': 'text',
          'include-notes': true,
          'include-titles': true,
          'include-chapter-numbers': true,
          'include-verse-numbers': true,
          'include-verse-spans': true,
          parallels: bible.id,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      if (testInfo.retry == 0) {
        helper.compareResponseText(expBody['200text']['data'], (await response.json())['data']);
      } else {
        // Тhe response is too big, it may change over time, so we check the model on first retry.
        console.log(`Test data in test: "${testInfo.titlePath[1]} ${testInfo.titlePath[2]}" is expired.`);
        helper.compareObjectsKeys(expBody['200text'], await response.json());
      }
    });
  });

  test('400 code (bad sectionId)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + 1, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 400);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['400bp'], await response.json());
    });
  });

  test('400 code (bad param)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        params: {
          'content-type': 'xml',
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 400);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['400bq'], await response.json());
    });
  });

  test('401 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        headers: { 'api-key': '' },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 401);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['401'], await response.json());
    });
  });

  test('403 code (bad bibleId)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get('/v1/bibles/1/sections/' + bible.book.sectionId, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 403);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['403bq'], await response.json());
    });
  });

  test('403 code (bad parallels)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.book.sectionId, {
        params: {
          parallels: 1,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 403);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['403bp'], await response.json());
    });
  });

  test('404 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + 'ROM.S0', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 404);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['404'], await response.json());
    });
  });
});
