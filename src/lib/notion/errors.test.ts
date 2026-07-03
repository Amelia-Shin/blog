import { describe, expect, it } from "vitest";
import { APIResponseError, APIErrorCode, RequestTimeoutError } from "@notionhq/client";
import { getNotionErrorMessage } from "@/lib/notion/errors";

function apiError(code: APIErrorCode): APIResponseError {
  return new APIResponseError({
    code,
    status: 400,
    message: "test error",
    headers: new Headers(),
    rawBodyText: "{}",
    additional_data: undefined,
    request_id: "test-request-id",
  });
}

describe("getNotionErrorMessage", () => {
  it("maps rate limit errors to a retry-later message", () => {
    expect(getNotionErrorMessage(apiError(APIErrorCode.RateLimited))).toContain("잠시 후 다시 시도");
  });

  it("maps unauthorized errors to an auth failure message", () => {
    expect(getNotionErrorMessage(apiError(APIErrorCode.Unauthorized))).toContain("인증에 실패");
  });

  it("maps object-not-found and restricted-resource to the same not-found message", () => {
    const notFound = getNotionErrorMessage(apiError(APIErrorCode.ObjectNotFound));
    const restricted = getNotionErrorMessage(apiError(APIErrorCode.RestrictedResource));
    expect(notFound).toBe(restricted);
    expect(notFound).toContain("찾을 수 없습니다");
  });

  it("maps request timeouts to a delay message", () => {
    expect(getNotionErrorMessage(new RequestTimeoutError())).toContain("지연되고 있습니다");
  });

  it("falls back to a generic message for non-Notion errors", () => {
    expect(getNotionErrorMessage(new Error("some unrelated error"))).toContain("일시적인 오류");
  });

  it("falls back to a generic message for non-error values", () => {
    expect(getNotionErrorMessage("not even an Error object")).toContain("일시적인 오류");
  });
});
