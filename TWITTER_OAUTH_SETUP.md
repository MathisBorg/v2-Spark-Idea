# Twitter OAuth 2.0 Setup Guide

This guide explains how to configure Twitter OAuth for the "Share My Idea" feature.

## Prerequisites

- A Twitter/X Developer Account
- Node.js and npm installed

## Step 1: Create a Twitter App

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Click on "Create App" or select an existing app
3. Navigate to your app settings

## Step 2: Configure OAuth 2.0

1. In your app settings, go to "User authentication settings"
2. Click "Set up" or "Edit"
3. Configure the following:
   - **App permissions**: Read
   - **Type of App**: Web App
   - **App info**:
     - Callback URI: `http://localhost:5174/auth/twitter/callback`
     - Website URL: `http://localhost:5174`
4. Save your settings

## Step 3: Get Your Client ID

1. After saving, you'll see your **Client ID**
2. Copy this Client ID - you'll need it for the `.env` file

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Twitter Client ID:
   ```env
   VITE_TWITTER_CLIENT_ID=your_actual_client_id_here
   VITE_TWITTER_REDIRECT_URI=http://localhost:5174/auth/twitter/callback
   ```

## Step 5: Restart the Development Server

```bash
npm run dev
```

## How It Works

1. User clicks "Share My Idea" button on the Ideas page
2. If not authenticated, they see "Connect with Twitter" button
3. Clicking it redirects to Twitter for authorization (OAuth 2.0 with PKCE)
4. After authorization, Twitter redirects back to `/auth/twitter/callback`
5. The app exchanges the authorization code for an access token
6. User info is fetched and stored in localStorage
7. User is redirected back to Ideas page with the form open
8. Their Twitter name, username, and avatar are automatically filled

## Security Notes

- We use OAuth 2.0 with PKCE (Proof Key for Code Exchange) for enhanced security
- No client secret is required or exposed in the frontend
- Tokens are stored in localStorage (consider using httpOnly cookies in production)
- The state parameter prevents CSRF attacks

## Production Deployment

For production, update your Twitter App settings:

1. Add your production callback URI: `https://yourdomain.com/auth/twitter/callback`
2. Update `VITE_TWITTER_REDIRECT_URI` in your production environment variables
3. Consider implementing:
   - Backend token exchange for better security
   - Token refresh mechanism
   - Secure token storage (httpOnly cookies)

## Troubleshooting

### "Callback URL mismatch" error
- Make sure the callback URI in your Twitter App settings exactly matches `VITE_TWITTER_REDIRECT_URI`
- Check for trailing slashes

### "Client ID not found" error
- Verify `VITE_TWITTER_CLIENT_ID` is set in your `.env` file
- Restart the dev server after changing `.env`

### Tokens expire quickly
- Access tokens expire after 2 hours by default
- Implement token refresh using the refresh_token (requires offline.access scope)

## API Reference

The Twitter OAuth implementation is in:
- `src/services/twitterService.ts` - OAuth flow logic
- `src/hooks/useTwitterAuth.tsx` - React context for auth state
- `src/pages/TwitterCallback.tsx` - OAuth callback handler
- `src/pages/Ideas.tsx` - Share My Idea modal with Twitter integration
