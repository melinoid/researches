import { APIResponse } from '@playwright/test';
import { bible } from '../../../utils/config';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';

const apiPath = '/v1/bibles/';
let response: APIResponse;

test.describe('/v1/bibles/bibleId/books', async () => {
  test('200 code (w/o params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.id + '/books', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200wop'], await response.json(), testInfo);
    });
  });

  test('200 code (with chapters)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.id + '/books', {
        params: {
          'include-chapters': true,
          'include-chapters-and-sections': false,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    // The responce is too big, so let's check just the model.
    await test.step('Compare response model', async () => {
      helper.compareObjectsKeys(expBody['200wch'], await response.json());
    });
  });

  test('200 code (with chapters & sections)', async ({ request, helper }) => {
    test.slow();
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.id + '/books', {
        params: {
          'include-chapters-and-sections': true,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    // The responce is too big, so let's check just the model.
    await test.step('Compare response model', async () => {
      helper.compareObjectsKeys(expBody['200wchs'], await response.json());
    });
  });

  test('200 code (all params)', async ({ request, helper }) => {
    test.setTimeout(10000);
    await test.step('Send request', async () => {
      response = await request.get(apiPath + bible.id + '/books', {
        params: {
          'include-chapters': true,
          'include-chapters-and-sections': true,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    // The responce is too big, so let's check just the model.
    await test.step('Compare response model', async () => {
      helper.compareObjectsKeys(expBody['200wchs'], await response.json());
    });
  });

  test('400 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + 'b52bc8b7af3bdc6f/books', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 400);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['400'], await response.json());
    });
  });

  test('401 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + '1/books', {
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

  test('403 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + '1/books', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 403);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['403'], await response.json());
    });
  });
});
