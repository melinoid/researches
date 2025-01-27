import { APIResponse } from '@playwright/test';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';
import { bible } from '../../../utils/config';

const apiPath = '/v1/bibles';
let response: APIResponse;

test.describe('/v1/bibles', async () => {
  test('200 code (w/o params)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    // The responce is too big, so let's check just the model.
    await test.step('Compare response model', async () => {
      helper.compareObjectsKeys(expBody['200wop'], await response.json());
    });
  });

  test('200 code (params w/o id)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          language: 'eng',
          abbreviation: 'WEB',
          name: 'British',
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200woid'], await response.json(), testInfo);
    });
  });

  // This test is unstable, sometimes the response body contains one bible instead of two.
  test.fixme('200 code (multiple ids)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          ids: `${bible.book.parallelId},${bible.id}`,
          'include-full-details': false,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200mid'], await response.json(), testInfo);
    });
  });

  test('200 code (all params)', async ({ request, helper }, testInfo) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: {
          language: 'eng',
          abbreviation: 'BSB',
          name: 'Berean Standard Bible',
          ids: bible.id,
          'include-full-details': true,
        },
      });
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseTextWithModel(expBody['200wap'], await response.json(), testInfo);
    });
  });

  test('400 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath, {
        params: { language: '' },
      });
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
      response = await request.get(apiPath, {
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
});
