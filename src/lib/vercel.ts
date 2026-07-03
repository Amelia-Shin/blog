import { requireEnv } from "@/utils/env";

const DEPLOY_HOOK_TIMEOUT_MS = 10_000;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postToDeployHook(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEPLOY_HOOK_TIMEOUT_MS);

  try {
    return await fetch(url, { method: "POST", signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function triggerDeploy(): Promise<void> {
  const deployHookUrl = requireEnv("VERCEL_DEPLOY_HOOK");

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await postToDeployHook(deployHookUrl);

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`Vercel Deploy Hook responded with ${response.status}: ${body}`);
      }

      return;
    } catch (error) {
      console.error(`[vercel:triggerDeploy] attempt ${attempt}/${MAX_ATTEMPTS} failed`, error);

      if (attempt === MAX_ATTEMPTS) {
        throw new Error("Vercel 배포 요청에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }

      await sleep(RETRY_DELAY_MS);
    }
  }
}
