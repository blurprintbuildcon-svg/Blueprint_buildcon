import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtppro.zoho.in';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'project@blueprintbuildcon.homes';
const SMTP_PASS = process.env.SMTP_PASS || 'qn0UrqXk3YZs';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'Blueprint Buildcon';
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || SMTP_USER;
const RECEIVER_EMAIL = process.env.ENQUIRY_RECEIVER_EMAIL || 'project@blueprintbuildcon.homes';

/**
 * Creates and returns the configured Nodemailer Zoho transporter
 */
export function getMailTransporter() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

function emailWrapper(title: string, badge: string, contentHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f6fa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .wrapper { width: 100%; max-width: 640px; margin: 30px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0a1227 0%, #1360e2 100%); padding: 32px 30px; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #cbd5e1; }
    .badge { display: inline-block; padding: 4px 12px; background: #ff6b35; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-radius: 20px; margin-bottom: 12px; }
    .body { padding: 32px 30px; }
    .section-title { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #1360e2; margin-top: 24px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7; }
    table.data-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
    table.data-table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f1f5f9; }
    table.data-table td.label { font-weight: 700; color: #64748b; width: 38%; }
    table.data-table td.value { font-weight: 600; color: #0f172a; }
    .message-box { background-color: #f8fafc; border-left: 4px solid #1360e2; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.6; color: #334155; margin-top: 10px; }
    .btn-row { margin-top: 28px; text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 8px; margin: 4px 6px; }
    .btn-whatsapp { background-color: #25D366; color: #ffffff; }
    .btn-call { background-color: #0a1227; color: #ffffff; }
    .footer { background-color: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="badge">${badge}</div>
      <h1>Blueprint Buildcon</h1>
      <p>${title}</p>
    </div>
    <div class="body">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0;">This email was sent automatically from <strong>Blueprint Buildcon</strong> Web Portal.</p>
      <p style="margin: 4px 0 0;">Recipient: <strong>${RECEIVER_EMAIL}</strong> | Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 1. Modal Consultation Enquiry Email
 */
export async function sendConsultationEmail(data: {
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  location: string;
  propertyStatus?: string;
  budget?: string;
  service?: string;
  message?: string;
  joinReferralProgram?: string;
}) {
  try {
    const transporter = getMailTransporter();
    const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
    const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const content = `
      <div class="section-title">Client Information</div>
      <table class="data-table">
        <tr><td class="label">Client Name:</td><td class="value"><strong>${data.name}</strong></td></tr>
        <tr><td class="label">Contact Number:</td><td class="value"><a href="tel:${data.phone}" style="color: #1360e2; text-decoration: none;">${data.phone}</a></td></tr>
        ${data.email ? `<tr><td class="label">Email Address:</td><td class="value">${data.email}</td></tr>` : ''}
        <tr><td class="label">City / Location:</td><td class="value">${data.location}</td></tr>
      </table>

      <div class="section-title">Project &amp; Requirement Details</div>
      <table class="data-table">
        <tr><td class="label">Project / Building Type:</td><td class="value">${data.projectType || 'Not specified'}</td></tr>
        <tr><td class="label">Plot / Property Status:</td><td class="value">${data.propertyStatus || 'Not specified'}</td></tr>
        <tr><td class="label">Estimated Budget:</td><td class="value">${data.budget || 'Not specified'}</td></tr>
        <tr><td class="label">Service Interested In:</td><td class="value"><strong>${data.service || 'Not specified'}</strong></td></tr>
        <tr><td class="label">Referral Program Partner:</td><td class="value">${data.joinReferralProgram || 'No'}</td></tr>
      </table>

      ${data.message
        ? `
        <div class="section-title">Client Requirements / Message</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
      `
        : ''
      }

      <div class="btn-row">
        <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20contacting%20Blueprint%20Buildcon%20regarding%20your%20${encodeURIComponent(data.projectType || 'construction')}%20project." class="btn btn-whatsapp" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${data.phone}" class="btn btn-call">Call Client</a>
      </div>
    `;

    const html = emailWrapper(
      'New Modal Consultation Enquiry',
      'Modal Consultation Lead',
      content
    );

    return await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.email || undefined,
      subject: `🏗️ New Construction Enquiry: ${data.name} (${data.projectType || 'Consultation'}) - ${data.location}`,
      html,
    });
  } catch (error: any) {
    console.error('Failed to send consultation email via Zoho SMTP:', error?.message || error);
    return null;
  }
}

/**
 * 2. Contact Page Form Enquiry Email
 */
export async function sendContactEmail(data: {
  name: string;
  phone: string;
  email: string;
  city: string;
  projectType: string;
  message?: string;
}) {
  try {
    const transporter = getMailTransporter();
    const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
    const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const content = `
      <div class="section-title">Contact Form Submission</div>
      <table class="data-table">
        <tr><td class="label">Name:</td><td class="value"><strong>${data.name}</strong></td></tr>
        <tr><td class="label">Contact Number:</td><td class="value"><a href="tel:${data.phone}" style="color: #1360e2; text-decoration: none;">${data.phone}</a></td></tr>
        <tr><td class="label">Email:</td><td class="value"><a href="mailto:${data.email}" style="color: #1360e2; text-decoration: none;">${data.email}</a></td></tr>
        <tr><td class="label">City / Location:</td><td class="value">${data.city}</td></tr>
        <tr><td class="label">Project Type:</td><td class="value">${data.projectType}</td></tr>
      </table>

      ${data.message
        ? `
        <div class="section-title">Message / Query</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
      `
        : ''
      }

      <div class="btn-row">
        <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Blueprint%20Buildcon." class="btn btn-whatsapp" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${data.phone}" class="btn btn-call">Call Client</a>
      </div>
    `;

    const html = emailWrapper('New Contact Form Submission', 'Contact Enquiry', content);

    return await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `📩 Contact Form Lead: ${data.name} - ${data.projectType} (${data.city})`,
      html,
    });
  } catch (error: any) {
    console.error('Failed to send contact email via Zoho SMTP:', error?.message || error);
    return null;
  }
}

/**
 * 3. Service Detail Page Enquiry Email
 */
export async function sendServiceEnquiryEmail(data: {
  fullname: string;
  mobile: string;
  email: string;
  serviceInterestedIn: string;
  notes?: string;
}) {
  try {
    const transporter = getMailTransporter();
    const cleanPhone = (data.mobile || '').replace(/[^0-9]/g, '');
    const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const content = `
      <div class="section-title">Service Enquiry Details</div>
      <table class="data-table">
        <tr><td class="label">Full Name:</td><td class="value"><strong>${data.fullname}</strong></td></tr>
        <tr><td class="label">Mobile Number:</td><td class="value"><a href="tel:${data.mobile}" style="color: #1360e2; text-decoration: none;">${data.mobile}</a></td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${data.email}" style="color: #1360e2; text-decoration: none;">${data.email}</a></td></tr>
        <tr><td class="label">Service Interested In:</td><td class="value"><strong>${data.serviceInterestedIn}</strong></td></tr>
      </table>

      ${data.notes
        ? `
        <div class="section-title">Enquiry Notes</div>
        <div class="message-box">${data.notes.replace(/\n/g, '<br/>')}</div>
      `
        : ''
      }

      <div class="btn-row">
        <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.fullname)}%2C%20thank%20you%20for%20your%20interest%20in%20Blueprint%20Buildcon's%20${encodeURIComponent(data.serviceInterestedIn)}." class="btn btn-whatsapp" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${data.mobile}" class="btn btn-call">Call Client</a>
      </div>
    `;

    const html = emailWrapper('New Service Enquiry', 'Service Enquiry Lead', content);

    return await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.email,
      subject: `🛠️ Service Lead: ${data.fullname} - ${data.serviceInterestedIn}`,
      html,
    });
  } catch (error: any) {
    console.error('Failed to send service enquiry email via Zoho SMTP:', error?.message || error);
    return null;
  }
}

/**
 * 4. Partner Referral Lead Email
 */
export async function sendReferralEmail(data: {
  referrerName: string;
  referrerPhone: string;
  referrerEmail?: string;
  referrerUpi?: string;
  referrerRelation?: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  clientCity: string;
  serviceRequired: string;
  propertyStatus?: string;
  estimatedArea?: string;
  projectBudget: string;
  timeline?: string;
  requirements: string;
}) {
  try {
    const transporter = getMailTransporter();
    const cleanClientPhone = (data.clientPhone || '').replace(/[^0-9]/g, '');
    const clientWaNumber =
      cleanClientPhone.length === 10 ? `91${cleanClientPhone}` : cleanClientPhone;

    const content = `
      <div class="section-title">1. Referrer Information (Partner)</div>
      <table class="data-table">
        <tr><td class="label">Partner Name:</td><td class="value"><strong>${data.referrerName}</strong></td></tr>
        <tr><td class="label">Partner Phone:</td><td class="value"><a href="tel:${data.referrerPhone}" style="color: #1360e2; text-decoration: none;">${data.referrerPhone}</a></td></tr>
        ${data.referrerEmail ? `<tr><td class="label">Partner Email:</td><td class="value">${data.referrerEmail}</td></tr>` : ''}
        <tr><td class="label">Relationship:</td><td class="value">${data.referrerRelation || 'Not specified'}</td></tr>
        ${data.referrerUpi ? `<tr><td class="label">Reward UPI ID:</td><td class="value"><code>${data.referrerUpi}</code></td></tr>` : ''}
      </table>

      <div class="section-title">2. Referred Client &amp; Construction Details</div>
      <table class="data-table">
        <tr><td class="label">Client Name:</td><td class="value"><strong>${data.clientName}</strong></td></tr>
        <tr><td class="label">Client Phone:</td><td class="value"><a href="tel:${data.clientPhone}" style="color: #1360e2; text-decoration: none;">${data.clientPhone}</a></td></tr>
        ${data.clientEmail ? `<tr><td class="label">Client Email:</td><td class="value">${data.clientEmail}</td></tr>` : ''}
        <tr><td class="label">City / Location:</td><td class="value">${data.clientCity}</td></tr>
        <tr><td class="label">Service Required:</td><td class="value"><strong>${data.serviceRequired}</strong></td></tr>
        <tr><td class="label">Plot / Property Status:</td><td class="value">${data.propertyStatus || 'Not specified'}</td></tr>
        ${data.estimatedArea ? `<tr><td class="label">Estimated Area:</td><td class="value">${data.estimatedArea}</td></tr>` : ''}
        <tr><td class="label">Project Budget:</td><td class="value">${data.projectBudget}</td></tr>
        <tr><td class="label">Timeline:</td><td class="value">${data.timeline || 'Immediate'}</td></tr>
      </table>

      <div class="section-title">Project Requirements</div>
      <div class="message-box">${data.requirements.replace(/\n/g, '<br/>')}</div>

      <div class="btn-row">
        <a href="https://wa.me/${clientWaNumber}?text=Hello%20${encodeURIComponent(data.clientName)}%2C%20we%20received%20your%20construction%20project%20details%20at%20Blueprint%20Buildcon." class="btn btn-whatsapp" target="_blank">Chat with Client</a>
        <a href="tel:${data.clientPhone}" class="btn btn-call">Call Client</a>
      </div>
    `;

    const html = emailWrapper(
      'New Construction Referral Lead',
      'Partner Referral Lead',
      content
    );

    return await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: RECEIVER_EMAIL,
      replyTo: data.referrerEmail || data.clientEmail || undefined,
      subject: `🎁 New Project Referral: ${data.clientName} referred by ${data.referrerName} (${data.clientCity})`,
      html,
    });
  } catch (error: any) {
    console.error('Failed to send referral email via Zoho SMTP:', error?.message || error);
    return null;
  }
}
