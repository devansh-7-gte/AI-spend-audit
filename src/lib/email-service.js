import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendAuditConfirmationEmail(
  email,
  auditData,
  savings
) {
  try {
    const { companyName, role } = auditData;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
            }
            .container {
              background-color: #f9fafb;
              padding: 40px 20px;
              border-radius: 8px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 8px 8px;
              margin-bottom: 20px;
            }
            .highlight {
              background-color: #ecf0f1;
              padding: 20px;
              border-left: 4px solid #667eea;
              border-radius: 4px;
              margin: 20px 0;
            }
            .savings-box {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 25px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .savings-box .amount {
              font-size: 36px;
              font-weight: bold;
              margin: 10px 0;
            }
            .savings-box .period {
              font-size: 14px;
              opacity: 0.9;
            }
            .cta-button {
              display: inline-block;
              background-color: #667eea;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              color: #666;
              font-size: 12px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              text-align: center;
            }
            .info-item {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your AI Spend Audit is Complete!</h1>
            </div>
            
            <div class="content">
              <p>Hi ${role ? `${role.split(',')[0]}` : 'there'},</p>
              
              <p>Thank you for using the AI Spend Audit. We've analyzed your AI tooling costs and found some significant opportunities to save.</p>
              
              <div class="savings-box">
                <div>Monthly Savings Potential</div>
                <div class="amount">$${savings.toLocaleString()}</div>
                <div class="period">That's $${(savings * 12).toLocaleString()} per year!</div>
              </div>

              <div class="highlight">
                <p><strong>What's Next?</strong></p>
                <p>We've identified specific ways you can optimize your AI stack. Your detailed audit results are waiting for you, including:</p>
                <ul>
                  <li>Tool-by-tool recommendations</li>
                  <li>Potential downgrades without losing functionality</li>
                  <li>Consolidation opportunities</li>
                  <li>Annual savings projections</li>
                </ul>
              </div>

              ${
                savings > 1000
                  ? `
                <div class="highlight">
                  <p><strong>🚀 High-Impact Opportunity</strong></p>
                  <p>Based on your audit results, you're in our "high-savings" category. Our team at CreditFunk will reach out soon to discuss how we can help you implement these recommendations and unlock your full savings potential.</p>
                </div>
              `
                  : `
                <div class="highlight">
                  <p><strong>Need Help?</strong></p>
                  <p>If you'd like personalized guidance on implementing these recommendations, our team would be happy to help. Reply to this email or visit our site to learn more.</p>
                </div>
              `
              }

              <p style="text-align: center; margin-top: 30px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://creditfunk.app'}" class="cta-button">View Your Full Audit Report</a>
              </p>

              <p>Best regards,<br>The CreditFunk Team</p>
            </div>
            
            <div class="footer">
              <p>© 2026 CreditFunk. All rights reserved.</p>
              <p>This is an automated message. Please don't reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: "CreditFunk Audits <onboarding@resend.dev>",
      to: email,
      subject: `Your AI Spend Audit Results - Save $${savings}/month`,
      html: emailHtml,
    });

    const messageId =
      response?.id || response?.data?.id;

    if (!messageId) {
      throw new Error(
        "Failed to send email: Missing Resend message id"
      );
    }

    return {
      success: true,
      messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
