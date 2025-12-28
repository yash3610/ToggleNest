# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to the project maintainers. You will receive a response within 48 hours. If the issue is confirmed, we will release a patch as soon as possible depending on complexity.

**Please do not report security vulnerabilities through public GitHub issues.**

## Security Best Practices

When deploying ToggleNest:

1. **Environment Variables**: Never commit `.env` files. Use `.env.example` as a template.
2. **JWT Secret**: Use a strong, random JWT secret in production.
3. **MongoDB**: Use strong passwords and enable authentication.
4. **HTTPS**: Always use HTTPS in production.
5. **CORS**: Configure CORS properly to allow only trusted origins.
6. **Dependencies**: Keep dependencies up to date.
7. **Rate Limiting**: Implement rate limiting on API endpoints.
8. **Input Validation**: All user inputs are validated on both client and server.

## Known Security Considerations

- Ensure MongoDB is not publicly accessible
- Use environment-specific `.env` files
- Rotate JWT secrets periodically
- Implement proper session management
- Use HTTPS for all production deployments
