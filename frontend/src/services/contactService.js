/**
 * Isolated contact & demo inquiry submission service.
 *
 * When `VITE_CONTACT_API_URL` is configured, submits JSON to the backend endpoint.
 * When no backend endpoint is configured, returns a transparent frontend-preview
 * state rather than pretending data was persisted or transmitted.
 */
export async function submitContactInquiry(payload) {
  const endpoint = import.meta.env.VITE_CONTACT_API_URL;

  const normalizedPayload = {
    fullName: payload.fullName.trim(),
    institutionName: payload.institutionName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    designation: payload.designation.trim(),
    inquiryType: payload.inquiryType || 'Demo Request',
    message: payload.message.trim(),
    submittedAt: new Date().toISOString(),
  };

  if (!endpoint) {
    return {
      status: 'preview',
      delivered: false,
      payload: normalizedPayload,
      message:
        'Frontend Preview Mode: No backend endpoint is configured yet. Your inquiry passed validation and is ready to be connected to your API via VITE_CONTACT_API_URL.',
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizedPayload),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return {
    status: 'submitted',
    delivered: true,
    payload: normalizedPayload,
    message: 'Thank you. Your institutional inquiry has been received.',
  };
}

