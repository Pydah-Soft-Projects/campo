import { submitContactInquiry as apiSubmit } from './api';

/**
 * Contact & demo inquiry submission service.
 *
 * Submits the inquiry directly to the Campo MongoDB backend API.
 */
export async function submitContactInquiry(payload) {
  const normalizedPayload = {
    fullName: (payload.fullName || '').trim(),
    institutionName: (payload.institutionName || '').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    designation: (payload.designation || '').trim(),
    studentCount: (payload.studentCount || '').trim(),
    inquiryType: payload.inquiryType || 'Demo Request',
    message: (payload.message || '').trim(),
  };

  try {
    const res = await apiSubmit(normalizedPayload);
    return {
      status: 'submitted',
      delivered: true,
      payload: normalizedPayload,
      message: res.message || 'Thank you! Your institutional inquiry has been recorded in our system.',
    };
  } catch (error) {
    console.warn('[Contact Service] Backend submission error:', error.message);
    throw new Error(
      error.message || 'Unable to submit inquiry right now. Please verify your connection.'
    );
  }
}
