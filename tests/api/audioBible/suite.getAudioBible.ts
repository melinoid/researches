import { APIResponse } from '@playwright/test';
import { audioBible } from '../../../utils/config';
import { test } from '../../../utils/fixtures';
import * as expBody from './responses.json';

const apiPath = '/v1/audio-bibles/';
let response: APIResponse;

test.describe('/v1/audio-bibles/audioBibleId', async () => {
  test('200 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + audioBible.id, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['200'], await response.json());
    });
  });

  test('200 code (instead 404, empty body)', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + audioBible.id.substring(0, audioBible.id.length - 1) + '9', {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 200);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['200e'], await response.json());
    });
  });

  test('400 code', async ({ request, helper }) => {
    await test.step('Send request', async () => {
      response = await request.get(apiPath + '105a06b6146d11e7', {});
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
      response = await request.get(apiPath + 1, {
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
      response = await request.get(apiPath + 1, {});
    });
    await test.step('Compare status code', async () => {
      helper.compareStatusCode(response.status(), 403);
    });
    await test.step('Compare response text', async () => {
      helper.compareResponseText(expBody['403'], await response.json());
    });
  });
});
