import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtppro.zoho.in';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'project@blueprintbuildcon.homes';
const SMTP_PASS = process.env.SMTP_PASS || 'qn0UrqXk3YZs';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'BluePrint BuildCon';
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || SMTP_USER;
const RECEIVER_EMAIL = process.env.ENQUIRY_RECEIVER_EMAIL || 'project@blueprintbuildcon.homes';

/**
 * Returns formatted recipients for incoming enquiries.
 * Reliably delivers to project@blueprintbuildcon.homes
 */
export function getEnquiryRecipients(): string {
  const recipients = new Set<string>();
  const rawList = process.env.ENQUIRY_RECEIVER_EMAIL || 'project@blueprintbuildcon.homes';

  rawList.split(',').forEach((email) => {
    const trimmed = email.trim();
    if (trimmed && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      recipients.add(trimmed);
    }
  });

  if (recipients.size === 0) {
    recipients.add('project@blueprintbuildcon.homes');
  }

  return Array.from(recipients).join(', ');
}

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
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return `< !DOCTYPE html >
    <html lang="en" >
      <head>
      <meta charset="utf-8" >
        <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
          <title>${ title } </title>
            </head>
            < body style = "margin: 0; padding: 24px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;" >
              <table role="presentation" width = "100%" cellpadding = "0" cellspacing = "0" border = "0" style = "background-color: #f1f5f9; width: 100%;" >
                <tr>
                <td align="center" style = "padding: 0;" >
                  <table role="presentation" width = "100%" cellpadding = "0" cellspacing = "0" border = "0" style = "max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(10,18,39,0.08); border: 1px solid #e2e8f0;" >
                    <!--Header -->
                      <tr>
                      <td style="background: linear-gradient(135deg, #061338 0%, #0052FF 100%); padding: 28px 30px 24px 30px; text-align: left;" >
                        <span style="display: inline-block; padding: 4px 14px; background-color: #ff5722; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.2px; border-radius: 14px; margin-bottom: 12px;" > ${ badge } </span>
                          < h1 style = "margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;" > BluePrint BuildCon </h1>
                            < p style = "margin: 6px 0 0; font-size: 13px; color: #cbd5e1; font-weight: 500;" > ${ title } </p>
                              </td>
                              </tr>
                              < !--Body -->
                                <tr>
                                <td style="padding: 26px 30px 30px 30px; background-color: #ffffff;" >
                                  ${ contentHtml }
  </td>
    </tr>
    < !--Footer -->
      <tr>
      <td style="background-color: #f8fafc; padding: 18px 24px; text-align: center; border-top: 1px solid #eef2f6;" >
        <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;" > This email was sent automatically from < strong > BluePrint BuildCon < /strong> Web Portal.</p >
          <p style="margin: 4px 0 0; font-size: 11px; color: #94a3b8;" > Recipient: <strong style="color: #0052FF;" > ${ RECEIVER_EMAIL } </strong> | Timestamp: ${timestamp} IST</p >
            </td>
            </tr>
            </table>
            </td>
            </tr>
            </table>
            </body>
            </html>`;
}

/**
 * 1. Modal Consultation Popup Enquiry Email
 */
export async function sendConsultationEmail(data: {
  name: string;
  phone: string;
  secondaryPhone?: string;
  email?: string;
  projectType: string;
  location: string;
  pincode?: string;
  propertyStatus?: string;
  budget?: string;
  service?: string;
  message?: string;
  joinReferralProgram?: string;
  projectFinance?: string;
  projectCash?: string;
  profession?: string;
  otherProfession?: string;
  marketingConsent?: boolean;
}) {
  try {
    const transporter = getMailTransporter();
    const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
    const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const professionValue = data.profession === 'Other' ? (data.otherProfession || 'Other') : (data.profession || 'Not specified');

    const content = `
      <!-- Section 1: Client Information -->
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 6px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;">
        CLIENT INFORMATION
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;">Client Name:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.name}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Contact Number:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${data.phone}" style="color: #0052FF; text-decoration: none; font-weight: 700;">${data.phone}</a>
          </td>
        </tr>
        ${data.secondaryPhone ? `
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Alternative Number:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${data.secondaryPhone}" style="color: #0052FF; text-decoration: none; font-weight: 700;">${data.secondaryPhone}</a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email Address:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">
            ${data.email ? `<a href="mailto:${data.email}" style="color: #0052FF; text-decoration: none; font-weight: 600;">${data.email}</a>` : '<span style="color: #94a3b8;">Not provided</span>'}
          </td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">City / Location:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.location}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Pincode:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.pincode || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Profession:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${professionValue}</td>
        </tr>
      </table>

      <!-- Section 2: Project & Requirement Details -->
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;">
        PROJECT &amp; REQUIREMENT DETAILS
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;">Project / Building Type:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.projectType || 'Not specified'}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Plot / Property Status:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.propertyStatus || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Estimated Budget:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.budget || 'Not specified'}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service Interested In:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 800; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.service || 'Not specified'}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Referral Program Partner:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.joinReferralProgram || 'No'}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Project Finance / Loan:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.projectFinance || 'No'}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Interested in Project Cash:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.projectCash || 'No'}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Marketing Updates Consent:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.marketingConsent ? 'Yes' : 'No'}</td>
        </tr>
      </table>

      ${data.message ? `
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 10px;">CLIENT REQUIREMENTS / NOTES</div>
        <div style="background-color: #f8fafc; border-left: 4px solid #0052FF; border-radius: 6px; padding: 12px 16px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
          ${data.message.replace(/\n/g, '<br/>')}
        </div>
      ` : ''}

    <!--Action Buttons-- >
      <table width="100%" cellpadding = "0" cellspacing = "0" border = "0" style = "margin-top: 24px; text-align: center;" >
        <tr>
        <td align="center" style = "padding: 0;" >
          <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20contacting%20BluePrint%20BuildCon%20regarding%20your%20${encodeURIComponent(data.projectType || 'construction')}%20project." style = "display: inline-block; padding: 12px 22px; background-color: #00c853; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;" > Chat on WhatsApp </a>
            < a href = "tel:${data.phone}" style = "display: inline-block; padding: 12px 22px; background-color: #061338; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;" > Call Client </a>
              </td>
              </tr>
              </table>
                `;

    const html = emailWrapper(
      'New Modal Consultation Enquiry',
      'MODAL CONSULTATION LEAD',
      content
    );

    const leadMailPromise = transporter.sendMail({
      from: `"${FROM_NAME}" < ${ FROM_EMAIL }> `,
      to: getEnquiryRecipients(),
      replyTo: data.email || undefined,
      subject: `🏗️ New Construction Enquiry: ${ data.name } (${ data.projectType || 'Consultation' }) - ${ data.location } `,
      html,
    });

    // Also send an instant confirmation email to the client if they provided their email
    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      try {
        const clientContent = `
              < p style = "font-size: 15px; color: #0f172a; line-height: 1.6; margin-top: 0;" >
                Dear < strong > ${ data.name } </strong>,
                  </p>
                  < p style = "font-size: 14px; color: #334155; line-height: 1.6;" >
                    Thank you for reaching out to < strong > BluePrint BuildCon < /strong>. We have successfully received your construction enquiry for <strong>${data.projectType || 'Construction'}</strong > in <strong>${ data.location } </strong>.
                      </p>
                      < p style = "font-size: 14px; color: #334155; line-height: 1.6;" >
                        One of our senior civil engineers and project architects will review your requirements and connect with you at < strong > ${ data.phone } </strong> shortly.
                          </p>
                                      < div style = "font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 18px; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;" >
                                        SUBMITTED DETAILS SUMMARY
                                          </div>
                                          < table width = "100%" cellpadding = "0" cellspacing = "0" border = "0" style = "width: 100%; border-collapse: collapse; margin-bottom: 20px;" >
                                            <tr><td style="padding: 8px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;" > Project Type: </td><td style="padding: 8px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.projectType || 'Not specified'}</td > </tr>
                                              < tr > <td style="padding: 8px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Location: </td><td style="padding: 8px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.location}</td > </tr>
                                                < tr > <td style="padding: 8px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Estimated Budget: </td><td style="padding: 8px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.budget || 'Not specified'}</td > </tr>
                                                  < tr > <td style="padding: 8px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Service Requested: </td><td style="padding: 8px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.service || 'Not specified'}</td > </tr>
                                                    </table>
                                                      <p style="font-size: 13px; color: #64748b; margin-top: 20px; line-height: 1.6;" >
                                                        For urgent queries, reach our project desk at < strong > +91 9028087659 < /strong> / < strong > +91 9028346900 < /strong> or write directly to <strong>project@blueprintbuildcon.homes</strong >.
          </p>
                                                            `;

        const clientHtml = emailWrapper('We Received Your Construction Enquiry', 'ENQUIRY CONFIRMATION', clientContent);

        await transporter.sendMail({
          from: `"${FROM_NAME}" < ${ FROM_EMAIL }> `,
          to: data.email,
          subject: `✅ Enquiry Received - BluePrint BuildCon(${ data.projectType || 'Construction' })`,
          html: clientHtml,
        });
      } catch (clientErr) {
        console.error('Failed sending client confirmation email:', clientErr);
      }
    }

    return await leadMailPromise;
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
    const waNumber = cleanPhone.length === 10 ? `91${ cleanPhone } ` : cleanPhone;

    const content = `
                    < div style = "font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 6px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;" >
                      CONTACT FORM DETAILS
                        </div>
                        < table width = "100%" cellpadding = "0" cellspacing = "0" border = "0" style = "width: 100%; border-collapse: collapse; margin-bottom: 22px;" >
                          <tr>
                          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;" > Client Name: </td>
                            < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;" > <strong>${ data.name } </strong></td >
                              </tr>
                              < tr >
                              <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Contact Number: </td>
                                < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;" >
                                  <a href="tel:${data.phone}" style = "color: #0052FF; text-decoration: none; font-weight: 700;" > ${ data.phone } </a>
                                    </td>
                                    </tr>
                                    < tr >
                                    <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Email Address: </td>
                                      < td style = "padding: 9px 4px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9;" >
                                        <a href="mailto:${data.email}" style = "color: #0052FF; text-decoration: none; font-weight: 600;" > ${ data.email } </a>
                                          </td>
                                          </tr>
                                          < tr >
                                          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > City / Location: </td>
                                            < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;" > ${ data.city } </td>
                                              </tr>
                                              < tr >
                                              <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Project Type: </td>
                                                < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;" > ${ data.projectType } </td>
                                                  </tr>
                                                  </table>

      ${
      data.message ? `
    <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 10px;" > MESSAGE / QUERY </div>
      < div style = "background-color: #f8fafc; border-left: 4px solid #0052FF; border-radius: 6px; padding: 12px 16px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 24px;" >
        ${ data.message.replace(/\n/g, '<br/>') }
    </div>
      ` : ''}

      <!-- Action Buttons -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px; text-align: center;">
        <tr>
          <td align="center" style="padding: 0;">
            <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20BluePrint%20BuildCon." style="display: inline-block; padding: 12px 22px; background-color: #00c853; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Chat on WhatsApp</a>
            <a href="tel:${data.phone}" style="display: inline-block; padding: 12px 22px; background-color: #061338; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Call Client</a>
          </td>
        </tr>
      </table>
    `;

    const html = emailWrapper('New Contact Form Submission', 'CONTACT ENQUIRY', content);

    const leadMailPromise = transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: getEnquiryRecipients(),
      replyTo: data.email,
      subject: `📩 Contact Form Lead: ${data.name} - ${data.projectType} (${data.city})`,
      html,
    });

    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      try {
        const clientContent = `
          < p style = "font-size: 15px; color: #0f172a; line-height: 1.6; margin-top: 0;" >
            Dear < strong > ${ data.name }</strong>,
              </p>
              < p style = "font-size: 14px; color: #334155; line-height: 1.6;" >
            Thank you for reaching out to < strong > BluePrint BuildCon < /strong>. We have received your inquiry regarding <strong>${data.projectType}</strong > in <strong>${ data.city } </strong>.
          </p>
          < p style = "font-size: 14px; color: #334155; line-height: 1.6;" >
          Our team is reviewing your message and will contact you directly at < strong > ${ data.phone } </strong>.
            </p>
          <p style="font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.6;">
            For immediate support, feel free to contact us at <strong>+91 9028087659</strong> / <strong>+91 9028346900</strong> or write to <strong>project@blueprintbuildcon.homes</strong>.
          </p>
        `;
        const clientHtml = emailWrapper('Thank You for Contacting BluePrint Build-Con', 'INQUIRY RECEIVED', clientContent);
        await transporter.sendMail({
          from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
          to: data.email,
          subject: `✅ We Have Received Your Inquiry - BluePrint BuildCon`,
          html: clientHtml,
        });
      } catch (clientErr) {
        console.error('Failed sending client contact confirmation email:', clientErr);
      }
    }

    return await leadMailPromise;
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
      < div style = "font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 6px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;" >
        SERVICE ENQUIRY DETAILS
    </div>
      < table width = "100%" cellpadding = "0" cellspacing = "0" border = "0" style = "width: 100%; border-collapse: collapse; margin-bottom: 22px;" >
        <tr>
        <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;" > Full Name: </td>
          < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;" > <strong>${ data.fullname } </strong></td >
            </tr>
            < tr >
            <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Mobile Number: </td>
              < td style = "padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;" >
                <a href="tel:${data.mobile}" style = "color: #0052FF; text-decoration: none; font-weight: 700;" > ${ data.mobile } </a>
                  </td>
                  </tr>
                  < tr >
                  <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Email Address: </td>
                    < td style = "padding: 9px 4px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9;" >
                      <a href="mailto:${data.email}" style = "color: #0052FF; text-decoration: none; font-weight: 600;" > ${ data.email } </a>
                        </td>
                        </tr>
                        < tr >
                        <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;" > Service Interested In: </td>
                          < td style = "padding: 9px 4px; font-size: 13px; font-weight: 800; color: #0f172a; border-bottom: 1px solid #f1f5f9;" > <strong>${ data.serviceInterestedIn } </strong></td >
                            </tr>
                            </table>

      ${
      data.notes ? `
        <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 10px;">ENQUIRY NOTES</div>
        <div style="background-color: #f8fafc; border-left: 4px solid #0052FF; border-radius: 6px; padding: 12px 16px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
          ${data.notes.replace(/\n/g, '<br/>')}
        </div>
      ` : ''
    }

      <!-- Action Buttons -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px; text-align: center;">
        <tr>
          <td align="center" style="padding: 0;">
            <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.fullname)}%2C%20thank%20you%20for%20your%20interest%20in%20BluePrint%20BuildCon's%20${encodeURIComponent(data.serviceInterestedIn)}." style="display: inline-block; padding: 12px 22px; background-color: #00c853; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Chat on WhatsApp</a>
            <a href="tel:${data.mobile}" style="display: inline-block; padding: 12px 22px; background-color: #061338; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Call Client</a>
          </td>
        </tr>
      </table>
    `;

    const html = emailWrapper('New Service Enquiry', 'SERVICE ENQUIRY LEAD', content);

    const leadMailPromise = transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: getEnquiryRecipients(),
      replyTo: data.email,
      subject: `🛠️ Service Lead: ${data.fullname} - ${data.serviceInterestedIn}`,
      html,
    });

    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      try {
        const clientContent = `
          <p style="font-size: 15px; color: #0f172a; line-height: 1.6; margin-top: 0;">
            Dear <strong>${data.fullname}</strong>,
          </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Thank you for your interest in <strong>${data.serviceInterestedIn}</strong> with <strong>BluePrint BuildCon</strong>.
          </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Our engineering team will get in touch with you shortly at <strong>${data.mobile}</strong> to discuss your scope and provide tailored estimates.
          </p>
          <p style="font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.6;">
            For urgent queries, call us at <strong>+91 9028087659</strong> / <strong>+91 9028346900</strong>.
          </p>
        `;
      const clientHtml = emailWrapper('Service Enquiry Received', 'ENQUIRY CONFIRMATION', clientContent);
      await transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: data.email,
        subject: `✅ BluePrint BuildCon: ${data.serviceInterestedIn} Enquiry Received`,
        html: clientHtml,
      });
    } catch (clientErr) {
      console.error('Failed sending client service confirmation email:', clientErr);
    }
  }

    return await leadMailPromise;
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
        const clientWaNumber = cleanClientPhone.length === 10 ? `91${cleanClientPhone}` : cleanClientPhone;

        const content = `
      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 6px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;">
        1. REFERRER INFORMATION (PARTNER)
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;">Partner Name:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.referrerName}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Partner Phone:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${data.referrerPhone}" style="color: #0052FF; text-decoration: none; font-weight: 700;">${data.referrerPhone}</a>
          </td>
        </tr>
        ${data.referrerEmail ? `
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Partner Email:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${data.referrerEmail}" style="color: #0052FF; text-decoration: none;">${data.referrerEmail}</a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Relationship:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.referrerRelation || 'Not specified'}</td>
        </tr>
        ${data.referrerUpi ? `
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Reward UPI ID:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><code>${data.referrerUpi}</code></td>
        </tr>` : ''}
      </table>

      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #edf2f7;">
        2. REFERRED CLIENT &amp; CONSTRUCTION DETAILS
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse; margin-bottom: 22px;">
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; width: 44%; border-bottom: 1px solid #f1f5f9;">Client Name:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.clientName}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Client Phone:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; border-bottom: 1px solid #f1f5f9;">
            <a href="tel:${data.clientPhone}" style="color: #0052FF; text-decoration: none; font-weight: 700;">${data.clientPhone}</a>
          </td>
        </tr>
        ${data.clientEmail ? `
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Client Email:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">
            <a href="mailto:${data.clientEmail}" style="color: #0052FF; text-decoration: none;">${data.clientEmail}</a>
          </td>
        </tr>` : ''}
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">City / Location:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.clientCity}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Service Required:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 800; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${data.serviceRequired}</strong></td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Plot / Property Status:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.propertyStatus || 'Not specified'}</td>
        </tr>
        ${data.estimatedArea ? `
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Estimated Area:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.estimatedArea}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Project Budget:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.projectBudget}</td>
        </tr>
        <tr>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Timeline:</td>
          <td style="padding: 9px 4px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${data.timeline || 'Immediate'}</td>
        </tr>
      </table>

      <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; color: #0052FF; margin-top: 14px; margin-bottom: 10px;">PROJECT REQUIREMENTS</div>
      <div style="background-color: #f8fafc; border-left: 4px solid #0052FF; border-radius: 6px; padding: 12px 16px; font-size: 13px; line-height: 1.6; color: #334155; margin-bottom: 24px;">
        ${data.requirements.replace(/\n/g, '<br/>')}
      </div>

      <!-- Action Buttons -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 24px; text-align: center;">
        <tr>
          <td align="center" style="padding: 0;">
            <a href="https://wa.me/${clientWaNumber}?text=Hello%20${encodeURIComponent(data.clientName)}%2C%20we%20received%20your%20construction%20project%20details%20at%20BluePrint%20BuildCon." style="display: inline-block; padding: 12px 22px; background-color: #00c853; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Chat with Client</a>
            <a href="tel:${data.clientPhone}" style="display: inline-block; padding: 12px 22px; background-color: #061338; color: #ffffff; font-size: 12px; font-weight: 800; text-decoration: none; border-radius: 8px; margin: 4px 6px;">Call Client</a>
          </td>
        </tr>
      </table>
    `;

        const html = emailWrapper(
          'New Construction Referral Lead',
          'PARTNER REFERRAL LEAD',
          content
        );

      return await transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: getEnquiryRecipients(),
        replyTo: data.referrerEmail || data.clientEmail || undefined,
        subject: `🎁 New Project Referral: ${data.clientName} referred by ${data.referrerName} (${data.clientCity})`,
        html,
      });
    } catch (error: any) {
      console.error('Failed to send referral email via Zoho SMTP:', error?.message || error);
      return null;
    }
  }
