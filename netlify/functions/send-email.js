const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { name, email, message, type } = JSON.parse(event.body);

    // Basic spam honeypot
    if (event.body.includes('"company":')) {
      return { statusCode: 200, body: 'OK' };
    }

    const subject =
      type === 'audit'
        ? `New Audit Request from ${name}`
        : `New Website Query from ${name}`;

    await sgMail.send({
      to: 'admin@vishnyxlabs.com',
      from: 'admin@vishnyxlabs.com',
      subject,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email failed' })
    };
  }
};
