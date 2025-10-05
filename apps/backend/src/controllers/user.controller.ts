import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

/**
 * Get a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *
 * Success (200): { user }
 * Errors:
 * - 400: missing id
 * - 404: user not found
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: 'User id is required' });
			return;
		}

		const { data, error } = await supabaseAdmin.auth.admin.getUserById(id);
		if (error || !data || !data.user) {
			const message = error?.message || 'User not found';
			res.status(404).json({ error: message });
			return;
		}

		res.status(200).json({ user: data.user });
	} catch (err) {
		console.error('getUser error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Update a user's attributes (admin).
 *
 * Params:
 * - req.params.id: string
 * - req.body: partial user attributes accepted by Supabase admin.updateUserById
 *
 * Success (200): { user }
 * Errors:
 * - 400: missing id or update failure
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const updates = req.body;
		if (!id) {
			res.status(400).json({ error: 'User id is required' });
			return;
		}

		const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, updates);
		if (error || !data || !data.user) {
			const message = error?.message || 'Failed to update user';
			res.status(400).json({ error: message });
			return;
		}

		res.status(200).json({ user: data.user });
	} catch (err) {
		console.error('updateUser error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * Delete a user by id (admin).
 *
 * Params:
 * - req.params.id: string
 *
 * Success (204): no content
 * Errors:
 * - 400: missing id or deletion failure
 * - 500: internal server error
 *
 * Requires service role privileges (server-side only).
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ error: 'User id is required' });
			return;
		}

		const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
		if (error) {
			res.status(400).json({ error: error.message });
			return;
		}

		res.status(204).send();
	} catch (err) {
		console.error('deleteUser error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * List users via Supabase Admin REST API.
 *
 * Query params supported:
 * - limit: page size (max 500, default 100)
 * - offset: zero-based offset
 *
 * Returns: { users: Array, page, per_page }
 *
 * Requires SUPABASE_SERVICE_KEY and SUPABASE_URL in server environment.
 */
export const listUsers = async (req: Request, res: Response): Promise<void> => {
	const limit = Math.min(parseInt((req.query.limit as string) || '100', 10), 500);
	const offset = Math.max(parseInt((req.query.offset as string) || '0', 10), 0);

	try {
		const serviceKey = process.env.SUPABASE_SERVICE_KEY;
		const baseUrl = process.env.SUPABASE_URL;

		if (!serviceKey || !baseUrl) {
			res.status(500).json({ error: 'Server misconfigured: SUPABASE_SERVICE_KEY or SUPABASE_URL missing' });
			return;
		}

		// Admin v1 supports pagination via page/per_page
		const page = Math.floor(offset / limit) + 1;
		const per_page = limit;
		const adminUrl = `${baseUrl.replace(/\/+$/, '')}/admin/v1/users?page=${page}&per_page=${per_page}`;

		const resp = await fetch(adminUrl, {
			headers: {
				apikey: serviceKey,
				Authorization: `Bearer ${serviceKey}`,
			},
		});

		if (!resp.ok) {
			const text = await resp.text();
			res.status(resp.status).json({ error: `Admin API error: ${text}` });
			return;
		}

		const users = await resp.json();
		// Admin REST returns an array of users; return with pagination metadata
		res.status(200).json({ users, page, per_page });
	} catch (err) {
		console.error('listUsers error:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

