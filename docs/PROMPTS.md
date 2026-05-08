# AI Prompt Library

## Overview

This document contains the core prompts powering the AI capabilities of the platform.

The prompts are organized into:
- AI audit prompts
- Recommendation generation
- Insight extraction
- Marketing copy generation
- Notification systems
- Testing utilities
- Documentation tooling

---

# 🧠 Core AI Audit Prompts

## AI Spend Categorization Prompt

```txt
You are an AI spend categorization assistant.

Analyze the provided AI tool or SaaS expense and categorize it into one of these categories:

- AI Writing Tools
- AI Coding Tools
- AI Design Tools
- AI Productivity Tools
- AI Research Tools
- Infrastructure & APIs
- Team Collaboration
- Marketing & Automation
- Business Operations
- Other

Description:
{description}

Tool Name:
{tool_name}

Respond with only the category name.
```

---

# 💰 Recommendation Generation Prompt

```txt
You are an AI cost optimization consultant.

Analyze the following AI spending report and generate 3-5 highly actionable recommendations to reduce unnecessary AI expenses.

Current Monthly Spend:
${total_spend}

Tool Breakdown:
{tool_breakdown}

Detected Patterns:
{patterns}

Team Size:
{team_size}

Generate recommendations that are:
1. Specific
2. Actionable
3. ROI-focused
4. Prioritized by impact
5. Realistic for teams

For each recommendation include:
- priority (high/medium/low)
- recommendation
- estimated_monthly_savings
- reasoning

Return response in JSON format.
```

---

# 📊 AI Insight Generation Prompt

```txt
You are an AI business analyst.

Analyze the following AI tooling data and generate surprising, high-value insights for the company.

Audit Data:
{audit_data}

Generate:
1. Key overspending observations
2. Hidden inefficiencies
3. Duplicate tool detection
4. Potential consolidation opportunities
5. Productivity vs spend observations

The tone should be:
- Professional
- Insightful
- Concise
- Data-backed

Keep responses highly actionable.
```

---

# 🧾 AI Summary Prompt

```txt
You are generating an executive AI spend audit summary.

Create a concise but high-impact summary for the company leadership team.

Input:
{audit_results}

Requirements:
- Focus on financial impact
- Mention optimization opportunities
- Mention risk areas
- Mention efficiency gains
- Keep under 200 words
- Professional SaaS consulting tone
```

---

# 📬 Email Subject Line Prompt

```txt
Generate 5 compelling email subject lines for an AI spend audit report.

Monthly Savings:
${savings}

Primary Optimization:
{optimization}

Company Type:
{company_type}

Subject lines should be:
- Personalized
- Curiosity-driven
- Professional
- High CTR optimized
- Short and impactful
```

---

# 🔔 Notification Prompt

```txt
Generate a short notification encouraging a company to rerun their AI audit.

Last Audit:
{days_ago} days ago

Primary AI Category:
{top_category}

Requirements:
- Friendly tone
- Not aggressive
- Mention optimization potential
- Maximum 2 sentences
```

---

# 🏗️ Development Prompts

## Code Review Prompt

```txt
Review this {language} code for:

1. Performance bottlenecks
2. Security vulnerabilities
3. Scalability concerns
4. Code quality
5. Maintainability
6. Type safety

Provide:
- Clear explanations
- Suggested improvements
- Refactored examples where useful

Code:
{code}
```

---

# 📘 Documentation Generation Prompt

```txt
Generate API documentation for this endpoint.

Method:
{method}

Route:
{route}

Purpose:
{purpose}

Request Schema:
{request_schema}

Response Schema:
{response_schema}

Include:
- Overview
- Request example
- Response example
- Validation rules
- Error handling
- Rate limits
- Authentication requirements
```

---

# 🧪 Testing Prompts

## Test Case Generator

```txt
Generate comprehensive test cases for this function.

Function:
{function_code}

Requirements:
- Happy path tests
- Edge cases
- Invalid inputs
- Failure scenarios
- Performance considerations
- Security considerations

Return structured test descriptions with expected outputs.
```

---

# 📈 Marketing Prompt Library

## Feature-to-Benefit Prompt

```txt
Convert the following feature into a customer-focused benefit statement.

Feature:
{feature}

Target User:
{user_type}

Format:
"Instantly {verb} by {action}, so you can {outcome}"

Keep it concise and persuasive.
```

---

# 🚀 Landing Page Headline Prompt

```txt
Generate 10 SaaS landing page headlines for an AI spend optimization platform.

Platform Name:
{platform_name}

Core Benefit:
{benefit}

Tone:
- Modern
- Premium
- Technical
- High-conversion

Focus on:
- Saving money
- AI optimization
- Efficiency
- Enterprise productivity
```

---

# 🧠 Future AI Expansion Prompts

## AI Tool Consolidation Agent

```txt
Analyze the company's AI stack and identify tools with overlapping functionality.

Tools:
{tools}

Team Usage:
{usage_patterns}

Identify:
- Redundant subscriptions
- Underused tools
- Better bundled alternatives
- Enterprise consolidation opportunities

Return:
- Tool to remove
- Suggested replacement
- Estimated savings
- Justification
```

---

# 📊 Pricing Optimization Prompt

```txt
Analyze current AI subscriptions and identify downgrade opportunities.

Subscriptions:
{subscriptions}

Usage Metrics:
{usage_metrics}

Detect:
- Unused premium plans
- Over-provisioned seats
- Low utilization
- Better pricing tiers

Provide estimated savings for each suggestion.
```

---

# 🔒 Security Review Prompt

```txt
Review the following AI tooling stack for security and compliance risks.

Stack:
{stack}

Check for:
- Data privacy concerns
- Vendor risks
- Shadow AI usage
- Compliance issues
- Missing governance

Return:
- Risk severity
- Explanation
- Recommended mitigation
```

---

# 📌 Notes

## AI Provider Compatibility

These prompts are designed to work with:
- Gemini
- OpenAI GPT models
- Claude
- Local LLMs

---

# ⚡ Prompt Engineering Principles Used

- Structured outputs
- Explicit constraints
- Context injection
- Role prompting
- Action-oriented instructions
- JSON formatting enforcement
- Business-focused reasoning

---

# 🎯 Current Prompt Usage

The platform currently uses prompts for:
- AI summaries
- Cost optimization recommendations
- Email generation
- Audit insights
- Tool categorization
- Business intelligence extraction

---

# 🚀 Planned Prompt Additions

Future prompt systems may include:
- AI forecasting
- Budget prediction
- Team efficiency scoring
- SaaS ROI estimation
- Procurement optimization
- Vendor comparison agents
- AI governance recommendations
- Autonomous audit agents