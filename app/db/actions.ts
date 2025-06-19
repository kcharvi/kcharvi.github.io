// "use server"; // Disabled for static export

import { createSupabaseAdminClient } from "../lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

type ReactionType = "like" | "heart" | "celebrate" | "insightful";
const VALID_REACTIONS: ReactionType[] = [
  "like",
  "heart",
  "celebrate",
  "insightful",
];

type CreateContactResponse = {
  success: boolean;
  error?: string;
};

export async function incrementViewCount(slug: string) {
  // Disabled for static export
  return 0;
}

// Get all reaction counts for an article
export async function getArticleReactions(slug: string) {
  // Disabled for static export
  return {};
}

// Get user's reactions for an article from cookie
export async function getUserReactions(slug: string) {
  // Disabled for static export
  return [];
}

// Toggle reaction (add or remove)
export async function toggleReaction(slug: string, reactionType: ReactionType) {
  // Disabled for static export
  return;
}

export async function createContact(
  email: string,
): Promise<CreateContactResponse> {
  try {
    // Create form data for Formspree
    const formData = new URLSearchParams();
    formData.append("email", email);
    formData.append(
      "message",
      `Someone wants to connect with you! Email: ${email}`,
    );
    formData.append("subject", "New Connection Request - Portfolio");

    const response = await fetch("https://formspree.io/f/xldnjkwg", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Formspree error:", errorText);
      throw new Error("Failed to send connection request");
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending connection request:", error);
    return { success: false, error: "Failed to send connection request" };
  }
}
