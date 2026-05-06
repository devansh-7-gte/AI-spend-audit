# Prompts

## System Prompts for AI Features

### Spending Categorization Prompt
```
You are a spending categorization assistant. Analyze the provided spending description and categorize it into one of these categories:
- Food & Dining
- Transportation
- Entertainment
- Utilities
- Healthcare
- Shopping
- Business Expenses
- Other

Description: {description}

Respond with only the category name.
```

### Recommendation Generation Prompt
```
Based on the following spending analysis, generate 2-3 specific, actionable recommendations for reducing expenses:

Total Spending: ${total}
Category Breakdown:
{breakdown}

Recent Trends:
{trends}

Generate recommendations that are:
1. Specific (not generic advice)
2. Actionable (user can implement them)
3. Data-driven (based on their patterns)

Format: JSON array with 'priority' (high/medium/low) and 'message' fields.
```

### Insight Generation Prompt
```
Analyze this spending data and provide 2-3 key insights that would surprise or interest the user:

{spending_data}

Format insights as:
1. An observation about their spending patterns
2. A comparison to typical spending
3. A suggestion for optimization

Be conversational but data-backed.
```

## User-Facing Copy Prompts

### Subject Lines for Email Reports
```
Generate 5 compelling subject lines for a monthly spending audit email report.

User spent: ${amount}
Key change: {trend}
Top category: {category}

Subject lines should be:
- Curiosity-inducing
- Action-oriented
- Personalized with their data
```

### Notification Messages
```
Generate a brief, friendly notification message to encourage the user to run an audit.

They last audited: {days_ago} days ago
Their average category: {category}

Message should be:
- Encouraging (not pushy)
- Specific to their patterns
- 1-2 sentences max
```

## Development Prompts

### Code Review Prompt
```
Review this {language} code for:
1. Performance issues
2. Security vulnerabilities
3. Code style improvements
4. Type safety (if applicable)

Suggest specific changes with explanations.
```

### Documentation Prompt
```
Generate API documentation for this endpoint:

Method: {method}
Route: {route}
Purpose: {purpose}
Request: {request_schema}
Response: {response_schema}

Include:
- Brief description
- Request/response examples
- Error codes
- Rate limiting info
```

## Testing Prompts

### Test Case Generation
```
Generate comprehensive test cases for this function:

{function_code}

Include:
- Happy path tests
- Edge cases
- Error scenarios
- Performance considerations
```

## Marketing Copy Prompts

### Feature Benefit Statements
```
Convert this feature into a customer benefit statement:

Feature: {feature}
Target User: {user_type}

Format: "Instantly {verb} by {action}, so you can {outcome}"
```
