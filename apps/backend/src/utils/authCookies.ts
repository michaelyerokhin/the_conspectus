import type { CookieOptions, Response } from 'express';
import type { Session } from '@supabase/supabase-js';

const isProduction = process.env.NODE_ENV === 'production';

const BASE_COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	sameSite: 'lax',
	path: '/',
	secure: isProduction,
};

const ACCESS_COOKIE_NAME = 'supabase-access-token';
const REFRESH_COOKIE_NAME = 'supabase-refresh-token';

const ACCESS_DEFAULT_MAX_AGE_SECONDS = 60 * 60;
const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const setAuthCookies = (res: Response, session: Session): void => {
	const accessMaxAge = (session.expires_in ?? ACCESS_DEFAULT_MAX_AGE_SECONDS) * 1000;

	res.cookie(ACCESS_COOKIE_NAME, session.access_token, {
		...BASE_COOKIE_OPTIONS,
		maxAge: accessMaxAge,
	});

	if (session.refresh_token) {
		res.cookie(REFRESH_COOKIE_NAME, session.refresh_token, {
			...BASE_COOKIE_OPTIONS,
			maxAge: REFRESH_MAX_AGE_SECONDS * 1000,
		});
	}
};

export const clearAuthCookies = (res: Response): void => {
	console.log('Attempting to clear auth cookies!');
	res.clearCookie(ACCESS_COOKIE_NAME, { path: '/', httpOnly: true, sameSite: 'lax' });
	res.clearCookie(REFRESH_COOKIE_NAME, { path: '/', httpOnly: true, sameSite: 'lax' });
};

/**
 * Returns the access token in the cookie header
 * @param cookieHeader: (eg. { "sb-access-token": "AAA.BBB.CCC", "sb-refresh-token": "RRR", "theme": "dark" })
 * @returns the access token parsed from the header
 */
export const getAccessTokenFromCookies = (cookieHeader?: string): string | undefined => {
	if (!cookieHeader) {
		return undefined;
	}

	const cookies = cookieHeader.split(';').reduce<Record<string, string>>((acc, cookie) => {
		const [rawName, ...rest] = cookie.trim().split('=');
		if (!rawName) {
			return acc;
		}

		const value = rest.join('=');
		acc[rawName] = decodeURIComponent(value);
		return acc;
	}, {});

	return cookies[ACCESS_COOKIE_NAME];
};
