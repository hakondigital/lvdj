interface ClickSendMessage {
  source: string;
  body: string;
  to: string;
  from?: string;
}

interface ClickSendResponse {
  http_code: number;
  response_code: string;
  response_msg: string;
  data?: {
    messages?: Array<{
      status?: string;
      message_id?: string;
    }>;
  };
}

const CLICKSEND_URL = "https://rest.clicksend.com/v3/sms/send";

export interface SendSmsArgs {
  to: string;
  body: string;
  from?: string;
}

export interface SendSmsResult {
  ok: boolean;
  status: number;
  responseCode?: string;
  responseMsg?: string;
  messageId?: string;
}

export async function sendSms({ to, body, from }: SendSmsArgs): Promise<SendSmsResult> {
  const username = process.env.CLICKSEND_USERNAME;
  const apiKey = process.env.CLICKSEND_API_KEY;

  if (!username || !apiKey) {
    throw new Error(
      "ClickSend credentials missing. Set CLICKSEND_USERNAME and CLICKSEND_API_KEY."
    );
  }

  const message: ClickSendMessage = {
    source: "lvdj-web",
    body,
    to,
    from: from || process.env.SMS_SENDER_ID || "LVDJ",
  };

  // btoa is available in both Node 16+ and the Cloudflare Workers/Edge runtime
  const auth = btoa(`${username}:${apiKey}`);

  const res = await fetch(CLICKSEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages: [message] }),
    cache: "no-store",
  });

  let parsed: ClickSendResponse | null = null;
  try {
    parsed = (await res.json()) as ClickSendResponse;
  } catch {
    parsed = null;
  }

  return {
    ok: res.ok && parsed?.response_code === "SUCCESS",
    status: res.status,
    responseCode: parsed?.response_code,
    responseMsg: parsed?.response_msg,
    messageId: parsed?.data?.messages?.[0]?.message_id,
  };
}
