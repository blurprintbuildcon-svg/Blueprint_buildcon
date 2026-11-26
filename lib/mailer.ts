import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtppro.zoho.in';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER || 'project@blueprintbuildcon.homes';
const SMTP_PASS = process.env.SMTP_PASS || 'qn0UrqXk3YZs';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'BluePrint Build-Con';
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
  return `< !DOCTYPE html >
    <html lang="en" >
      <head>
      <meta charset="utf-8" >
        <meta name="viewport" content = "width=device-width, initial-scale=1.0" >
          <title>${ title } </title>
            <style>
    body { margin: 0; padding: 0; background - color: #f1f5f9; font - family: -apple - system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans - serif; color: #0f172a; }
    .wrapper { width: 100 %; max - width: 640px; margin: 30px auto; background - color: #ffffff; border - radius: 16px; overflow: hidden; box - shadow: 0 10px 30px rgba(10, 18, 39, 0.08); border: 1px solid #e2e8f0; }
    .header { background: linear - gradient(135deg, #0A1227 0 %, #0052FF 100 %); padding: 32px 30px; text - align: left; }
    .header h1 { margin: 0; font - size: 22px; font - weight: 800; color: #ffffff; letter - spacing: -0.5px; }
    .header p { margin: 6px 0 0; font - size: 13px; color: #cbd5e1; }
    .badge { display: inline - block; padding: 5px 14px; background: #0052FF; color: #ffffff; font - size: 11px; font - weight: 800; text - transform: uppercase; letter - spacing: 1.5px; border - radius: 20px; margin - bottom: 12px; border: 1px solid rgba(255, 255, 255, 0.25); }
    .body { padding: 32px 30px; }
    .section - title { font - size: 13px; font - weight: 800; text - transform: uppercase; letter - spacing: 1px; color: #0052FF; margin - top: 24px; margin - bottom: 12px; padding - bottom: 6px; border - bottom: 2px solid #e2e8f0; }
  table.data - table { width: 100 %; border - collapse: collapse; margin - top: 8px; }
  table.data - table td { padding: 10px 12px; font - size: 14px; border - bottom: 1px solid #f1f5f9; }
  table.data - table td.label { font - weight: 700; color: #64748b; width: 38 %; vertical - align: top; }
  table.data - table td.value { font - weight: 600; color: #0f172a; }
    .message - box { background - color: #f8fafc; border - left: 4px solid #0052FF; border - radius: 6px; padding: 14px 16px; font - size: 13px; line - height: 1.6; color: #334155; margin - top: 10px; }
    .btn - row { margin - top: 28px; text - align: center; }
    .btn { display: inline - block; padding: 12px 24px; font - size: 13px; font - weight: 700; text - decoration: none; border - radius: 8px; margin: 4px 6px; }
    .btn - whatsapp { background - color: #25D366; color: #ffffff; }
    .btn - call { background - color: #0A1227; color: #ffffff; }
    .footer { background - color: #f8fafc; padding: 20px 30px; text - align: center; font - size: 12px; color: #94a3b8; border - top: 1px solid #e2e8f0; }
  </style>
    </head>
    < body >
    <div class="wrapper" >
      <div class="header" >
        <div class="badge" > ${ badge } </div>
            < h1 > BluePrint Build - Con </h1>
              < p > ${ title } </p>
                </div>
                < div class="body" >
                  ${ contentHtml }
  </div>
    < div class="footer" >
        <p style="margin: 0;" > This email was sent automatically from < strong > BluePrint Build - Con < /strong> Web Portal.</p >
          <p style="margin: 4px 0 0;" > Recipient: <strong>${ RECEIVER_EMAIL } </strong> | Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div>
            </div>
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

    const content = `
      <div class="section-title">Client Information</div>
      <table class="data-table">
        <tr><td class="label">Client Name:</td><td class="value"><strong>${data.name}</strong></td></tr>
        <tr><td class="label">Primary Phone:</td><td class="value"><a href="tel:${data.phone}" style="color: #0052FF; text-decoration: none;"><strong>${data.phone}</strong></a></td></tr>
        ${data.secondaryPhone ? `<tr><td class="label">Alternative Phone:</td><td class="value"><a href="tel:${data.secondaryPhone}" style="color: #0052FF; text-decoration: none;">${data.secondaryPhone}</a></td></tr>` : ''}
        ${data.email ? `<tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${data.email}" style="color: #0052FF; text-decoration: none;">${data.email}</a></td></tr>` : ''}
        <tr><td class="label">City / Location:</td><td class="value"><strong>${data.location}</strong></td></tr>
        ${data.pincode ? `<tr><td class="label">Pincode:</td><td class="value">${data.pincode}</td></tr>` : ''}
        ${(data.profession || data.otherProfession) ? `<tr><td class="label">Profession:</td><td class="value">${data.profession === 'Other' ? data.otherProfession || 'Other' : data.profession}</td></tr>` : ''}
      </table>

      <div class="section-title">Project &amp; Requirement Details</div>
      <table class="data-table">
        <tr><td class="label">Project / Building Type:</td><td class="value"><strong>${data.projectType || 'Not specified'}</strong></td></tr>
        <tr><td class="label">Plot / Property Status:</td><td class="value">${data.propertyStatus || 'Not specified'}</td></tr>
        <tr><td class="label">Estimated Budget:</td><td class="value"><strong>${data.budget || 'Not specified'}</strong></td></tr>
        <tr><td class="label">Service Interested In:</td><td class="value"><strong>${data.service || 'Not specified'}</strong></td></tr>
        ${data.joinReferralProgram && data.joinReferralProgram !== 'No' ? `<tr><td class="label">Referral Program Partner:</td><td class="value">${data.joinReferralProgram}</td></tr>` : ''}
        <tr><td class="label">Project Finance / Loan:</td><td class="value"><strong>${data.projectFinance || 'No'}</strong></td></tr>
        ${data.projectCash && data.projectCash !== 'No' ? `<tr><td class="label">Interested in Project Cash:</td><td class="value"><strong>${data.projectCash}</strong></td></tr>` : ''}
        <tr><td class="label">Marketing Updates Consent:</td><td class="value">${data.marketingConsent ? 'Yes' : 'No'}</td></tr>
      </table>

      ${data.message ? `
        <div class="section-title">Client Requirements / Notes</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
      ` : ''}

    <div class="btn-row" >
      <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20contacting%20BluePrint%20Build-Con%20regarding%20your%20${encodeURIComponent(data.projectType || 'construction')}%20project." class="btn btn-whatsapp" target = "_blank" > Chat on WhatsApp </a>
        < a href = "tel:${data.phone}" class="btn btn-call" > Call Client Now </a>
          </div>
            `;

    const html = emailWrapper(
      'New Consultation Popup Lead',
      'Popup Enquiry Lead',
      content
    );

    const leadMailPromise = transporter.sendMail({
      from: `"${FROM_NAME}" < ${ FROM_EMAIL }> `,
      to: getEnquiryRecipients(),
      replyTo: data.email || undefined,
      subject: `🏗️ New Construction Lead: ${ data.name } (${ data.projectType || 'Consultation' }) - ${ data.location } `,
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
      Thank you for reaching out to < strong > BluePrint Build - Con < /strong>. We have successfully received your construction enquiry for <strong>${data.projectType || 'Construction'}</strong > in <strong>${ data.location } </strong>.
        </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            One of our senior civil engineers and project architects will review your requirements and connect with you at <strong>${data.phone}</strong> shortly.
          </p>
          <div class="section-title">Submitted Details Summary</div>
          <table class="data-table">
            <tr><td class="label">Project Type:</td><td class="value">${data.projectType || 'Not specified'}</td></tr>
            <tr><td class="label">Location:</td><td class="value">${data.location}</td></tr>
            <tr><td class="label">Estimated Budget:</td><td class="value">${data.budget || 'Not specified'}</td></tr>
            <tr><td class="label">Service Requested:</td><td class="value">${data.service || 'Not specified'}</td></tr>
          </table>
          <p style="font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.6;">
            For urgent queries, reach our project desk at <strong>+91 9028087659</strong> / <strong>+91 9028346900</strong> or write directly to <strong>project@blueprintbuildcon.homes</strong>.
          </p>
        `;

    const clientHtml = emailWrapper('We Received Your Construction Enquiry', 'Enquiry Confirmation', clientContent);

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: data.email,
    subject: `✅ Enquiry Received - BluePrint Build-Con (${data.projectType || 'Construction'})`,
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
        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const content = `
          < div class="section-title" > Contact Form Submission </div>
            < table class="data-table" >
              <tr><td class="label" > Client Name: </td><td class="value"><strong>${data.name}</strong > </td></tr >
                <tr><td class="label" > Contact Number: </td><td class="value"><a href="tel:${data.phone}" style="color: #0052FF; text-decoration: none;"><strong>${data.phone}</strong > </a></td > </tr>
                  < tr > <td class="label" > Email: </td><td class="value"><a href="mailto:${data.email}" style="color: #0052FF; text-decoration: none;">${data.email}</a > </td></tr >
                    <tr><td class="label" > City / Location: </td><td class="value"><strong>${data.city}</strong > </td></tr >
                      <tr><td class="label" > Project Type: </td><td class="value">${data.projectType}</td > </tr>
                        </table>

      ${data.message ? `
        <div class="section-title">Message / Query</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br/>')}</div>
      ` : ''
        }

      <div class="btn-row">
        <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20BluePrint%20Build-Con." class="btn btn-whatsapp" target="_blank">Chat on WhatsApp</a>
        <a href="tel:${data.phone}" class="btn btn-call">Call Client Now</a>
      </div>
    `;

        const html = emailWrapper('New Contact Form Submission', 'Contact Enquiry', content);

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
          <p style="font-size: 15px; color: #0f172a; line-height: 1.6; margin-top: 0;">
            Dear <strong>${data.name}</strong>,
          </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Thank you for reaching out to <strong>BluePrint Build-Con</strong>. We have received your inquiry regarding <strong>${data.projectType}</strong> in <strong>${data.city}</strong>.
          </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;" >
            Our team is reviewing your message and will contact you directly at < strong > ${ data.phone } </strong>.
              </p>
              < p style = "font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.6;" >
                For immediate support, feel free to contact us at < strong > +91 9028087659 < /strong> / < strong > +91 9028346900 < /strong> or write to <strong>project@blueprintbuildcon.homes</strong >.
          </p>
                    `;
        const clientHtml = emailWrapper('Thank You for Contacting BluePrint Build-Con', 'Inquiry Received', clientContent);
        await transporter.sendMail({
          from: `"${FROM_NAME}" < ${ FROM_EMAIL }> `,
          to: data.email,
          subject: `✅ We Have Received Your Inquiry - BluePrint Build - Con`,
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
    const waNumber = cleanPhone.length === 10 ? `91${ cleanPhone } ` : cleanPhone;

          const content = `
      <div class="section-title">Service Enquiry Details</div>
      <table class="data-table">
        <tr><td class="label">Full Name:</td><td class="value"><strong>${data.fullname}</strong></td></tr>
        <tr><td class="label">Mobile Number:</td><td class="value"><a href="tel:${data.mobile}" style="color: #0052FF; text-decoration: none;"><strong>${data.mobile}</strong></a></td></tr>
        <tr><td class="label">Email Address:</td><td class="value"><a href="mailto:${data.email}" style="color: #0052FF; text-decoration: none;">${data.email}</a></td></tr>
        <tr><td class="label">Service Interested In:</td><td class="value"><strong>${data.serviceInterestedIn}</strong></td></tr>
      </table>

      ${data.notes ? `
        <div class="section-title">Enquiry Notes</div>
        <div class="message-box">${data.notes.replace(/\n/g, '<br/>')}</div>
      ` : ''}

          <div class="btn-row" >
            <a href="https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(data.fullname)}%2C%20thank%20you%20for%20your%20interest%20in%20BluePrint%20Build-Con's%20${encodeURIComponent(data.serviceInterestedIn)}." class="btn btn-whatsapp" target = "_blank" > Chat on WhatsApp </a>
              < a href = "tel:${data.mobile}" class="btn btn-call" > Call Client Now </a>
                </div>
                  `;

    const html = emailWrapper('New Service Enquiry', 'Service Enquiry Lead', content);

    const leadMailPromise = transporter.sendMail({
      from: `"${FROM_NAME}" < ${ FROM_EMAIL }> `,
      to: getEnquiryRecipients(),
      replyTo: data.email,
      subject: `🛠️ Service Lead: ${ data.fullname } - ${ data.serviceInterestedIn } `,
      html,
    });

    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      try {
        const clientContent = `
                < p style = "font-size: 15px; color: #0f172a; line-height: 1.6; margin-top: 0;" >
                  Dear < strong > ${ data.fullname } </strong>,
                    </p>
          < p style = "font-size: 14px; color: #334155; line-height: 1.6;" >
              Thank you for your interest in <strong>${ data.serviceInterestedIn } < /strong> with <strong>BluePrint Build-Con</strong >.
          </p>
          <p style="font-size: 14px; color: #334155; line-height: 1.6;">
            Our engineering team will get in touch with you shortly at <strong>${data.mobile}</strong> to discuss your scope and provide tailored estimates.
          </p>
          <p style="font-size: 13px; color: #64748b; margin-top: 24px; line-height: 1.6;">
            For urgent queries, call us at <strong>+91 9028087659</strong> / <strong>+91 9028346900</strong>.
          </p>
        `;
          const clientHtml = emailWrapper('Service Enquiry Received', 'Enquiry Confirmation', clientContent);
          await transporter.sendMail({
            from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
            to: data.email,
            subject: `✅ BluePrint Build-Con: ${data.serviceInterestedIn} Enquiry Received`,
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
          < div class="section-title" > 1. Referrer Information(Partner) </div>
            < table class="data-table" >
              <tr><td class="label" > Partner Name: </td><td class="value"><strong>${data.referrerName}</strong > </td></tr >
                <tr><td class="label" > Partner Phone: </td><td class="value"><a href="tel:${data.referrerPhone}" style="color: #0052FF; text-decoration: none;"><strong>${data.referrerPhone}</strong > </a></td > </tr>
        ${ data.referrerEmail ? `<tr><td class="label">Partner Email:</td><td class="value">${data.referrerEmail}</td></tr>` : '' }
        <tr><td class="label" > Relationship: </td><td class="value">${data.referrerRelation || 'Not specified'}</td > </tr>
        ${ data.referrerUpi ? `<tr><td class="label">Reward UPI ID:</td><td class="value"><code>${data.referrerUpi}</code></td></tr>` : '' }
        </table>

            < div class="section-title" > 2. Referred Client & amp; Construction Details </div>
              < table class="data-table" >
                <tr><td class="label" > Client Name: </td><td class="value"><strong>${data.clientName}</strong > </td></tr >
                  <tr><td class="label" > Client Phone: </td><td class="value"><a href="tel:${data.clientPhone}" style="color: #0052FF; text-decoration: none;"><strong>${data.clientPhone}</strong > </a></td > </tr>
        ${ data.clientEmail ? `<tr><td class="label">Client Email:</td><td class="value">${data.clientEmail}</td></tr>` : '' }
        <tr><td class="label" > City / Location: </td><td class="value">${data.clientCity}</td > </tr>
          < tr > <td class="label" > Service Required: </td><td class="value"><strong>${data.serviceRequired}</strong > </td></tr >
            <tr><td class="label" > Plot / Property Status: </td><td class="value">${data.propertyStatus || 'Not specified'}</td > </tr>
        ${ data.estimatedArea ? `<tr><td class="label">Estimated Area:</td><td class="value">${data.estimatedArea}</td></tr>` : '' }
        <tr><td class="label" > Project Budget: </td><td class="value">${data.projectBudget}</td > </tr>
          < tr > <td class="label" > Timeline: </td><td class="value">${data.timeline || 'Immediate'}</td > </tr>
            </table>

                < div class="section-title" > Project Requirements </div>
                  < div class="message-box" > ${ data.requirements.replace(/\n/g, '<br/>') } </div>

      <div class="btn-row">
        <a href="https://wa.me/${clientWaNumber}?text=Hello%20${encodeURIComponent(data.clientName)}%2C%20we%20received%20your%20construction%20project%20details%20at%20BluePrint%20Build-Con." class="btn btn-whatsapp" target="_blank">Chat with Client</a>
        <a href="tel:${data.clientPhone}" class="btn btn-call">Call Client Now</a>
      </div>
    `;

        const html = emailWrapper(
          'New Construction Referral Lead',
          'Partner Referral Lead',
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
