export interface ClerkUserCreateWebhookEvent {
  data: {
    created_at: number;
    email_addresses: { email_address: string }[];
    id: string;
    last_sign_in_at: number;
  };
  object: "event";
  type: "user.created";
}

export interface ClerkUserDeleteWebhookEvent {
  data: {
    deleted: boolean;
    id: string;
    object: string;
  };
  object: "event";
  type: "user.deleted";
}

export type ClerkUserWebhookEvent =
  | ClerkUserCreateWebhookEvent
  | ClerkUserDeleteWebhookEvent;
