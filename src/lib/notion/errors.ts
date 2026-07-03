import { isNotionClientError, APIErrorCode, ClientErrorCode } from "@notionhq/client";

function getNotionErrorMessage(error: unknown): string {
  if (isNotionClientError(error)) {
    switch (error.code) {
      case APIErrorCode.RateLimited:
        return "Notion API 요청이 많아 잠시 지연되고 있습니다. 잠시 후 다시 시도해주세요.";
      case APIErrorCode.Unauthorized:
        return "Notion 연동 인증에 실패했습니다. 관리자에게 문의해주세요.";
      case APIErrorCode.ObjectNotFound:
      case APIErrorCode.RestrictedResource:
        return "요청한 콘텐츠를 찾을 수 없습니다.";
      case APIErrorCode.ValidationError:
        return "콘텐츠 구성 오류로 페이지를 표시할 수 없습니다.";
      case ClientErrorCode.RequestTimeout:
        return "Notion 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.";
      default:
        return "콘텐츠를 불러오는 중 오류가 발생했습니다.";
    }
  }

  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}

// Errors crossing a Server Component -> error.tsx boundary are serialized and
// lose their original class/prototype, so classification must happen here
// (server side) rather than in the Client Component error boundary.
export function handleNotionError(context: string, error: unknown): never {
  console.error(`[notion:${context}]`, error);
  throw new Error(getNotionErrorMessage(error));
}
