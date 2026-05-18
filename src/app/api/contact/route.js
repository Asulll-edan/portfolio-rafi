// PATH: src/app/api/contact/route.js

import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Semua field wajib diisi' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio MSR" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: 'Segoe UI', sans-serif; background: #001D3D; color: #F0F4F8; padding: 0; margin: 0; }
              .wrapper { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .card { background: rgba(0,53,102,0.6); border: 1px solid rgba(255,195,0,0.3); border-radius: 16px; padding: 40px; }
              .logo { font-size: 32px; font-weight: 800; color: #FFC300; letter-spacing: 4px; margin-bottom: 8px; }
              .divider { height: 1px; background: linear-gradient(90deg, #FFC300, #219EBC); margin: 24px 0; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #219EBC; margin-bottom: 4px; }
              .value { font-size: 16px; color: #F0F4F8; margin-bottom: 20px; }
              .message-box { background: rgba(0,29,61,0.6); border: 1px solid rgba(255,195,0,0.1); border-radius: 8px; padding: 20px; }
              .footer { text-align: center; color: #8BA3C7; font-size: 12px; margin-top: 24px; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="card">
                <div class="logo">MSR</div>
                <p style="color:#8BA3C7;margin:0 0 4px">Muhammad Sultan Rafi — Portfolio</p>
                <div class="divider"></div>

                <div class="label">Nama</div>
                <div class="value">${name}</div>

                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color:#FFC300;text-decoration:none">${email}</a></div>

                <div class="label">Pesan</div>
                <div class="message-box" style="color:#F0F4F8;line-height:1.6">${message.replace(/\n/g, '<br>')}</div>

                <div class="footer">
                  <div class="divider"></div>
                  Diterima melalui portfolio MSR · ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: 'Gagal mengirim' }, { status: 500 });
  }
}