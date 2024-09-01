import { prisma } from "@/lib/prisma";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import {
  ClerkUserCreateWebhookEvent,
  ClerkUserDeleteWebhookEvent,
  ClerkUserWebhookEvent,
} from "./types";

const createUser = async (userData: ClerkUserCreateWebhookEvent["data"]) => {
  if (!userData || !prisma) return;
  if (!userData.email_addresses[0].email_address) return;

  return await prisma?.user.create({
    data: {
      clerkId: userData.id,
      email: userData.email_addresses[0].email_address,
    },
  });
};

const deleteUser = (userData: ClerkUserDeleteWebhookEvent["data"]) => {
  if (!userData || !prisma) return;
  if (!userData.id) return;

  return prisma?.user.delete({
    where: { clerkId: userData.id },
  });
};

export const POST = async (req: Request) => {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = (await req.json()) as ClerkUserWebhookEvent;
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  switch (eventType) {
    case "user.created":
      try {
        await createUser(payload.data as ClerkUserCreateWebhookEvent["data"]);
        return NextResponse.json(
          { message: "User created successfully" },
          { status: 201 }
        );
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { message: "There was error when try to create user" },
          { status: 500 }
        );
      }
    case "user.deleted":
      try {
        await deleteUser(payload.data as ClerkUserDeleteWebhookEvent["data"]);
        return NextResponse.json(
          { message: "User deleted successfully" },
          { status: 204 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: "There was error when try to delete user" },
          { status: 500 }
        );
      }
  }

  return NextResponse.json({ message: "Invalid request" }, { status: 304 });
};
