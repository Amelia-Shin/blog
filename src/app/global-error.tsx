"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h2>문제가 발생했습니다</h2>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>{error.message}</p>
        <button
          onClick={() => unstable_retry()}
          style={{
            marginTop: "1.5rem",
            padding: "0.5rem 1rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
