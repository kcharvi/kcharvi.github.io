type CreateContactResponse = {
  success: boolean;
  error?: string;
};

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
