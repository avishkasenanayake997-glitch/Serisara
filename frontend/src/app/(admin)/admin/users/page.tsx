'use client';

import React, { useState, useEffect } from 'react';
import { adminUserService } from '../../../../services/admin-user.service';
import { Button, Input, Badge } from '../../../../components/ui';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import type { Profile, UserRole } from '@serisara/shared';

const fallbackDemoUsers: Profile[] = [
  {
    id: 'user-001',
    full_name: 'Avishka Senanayake',
    avatar_url: null,
    bio: 'Platform Lead & Architect',
    phone: '+94 77 123 4567',
    country: 'Sri Lanka',
    role: 'admin',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-002',
    full_name: 'Chamari Silva',
    avatar_url: null,
    bio: 'Southern Province Tour Curator',
    phone: '+94 71 987 6543',
    country: 'Sri Lanka',
    role: 'manager',
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-003',
    full_name: 'David Wilson',
    avatar_url: null,
    bio: 'Wildlife enthusiast from the UK',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    role: 'user',
    is_active: true,
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-004',
    full_name: 'Spam Account Sample',
    avatar_url: null,
    bio: null,
    phone: null,
    country: 'Unknown',
    role: 'user',
    is_active: false,
    created_at: new Date(Date.now() - 86400000 * 25).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let isMounted = true;

    adminUserService
      .listUsers({
        search: search || undefined,
        role: roleFilter !== 'all' ? (roleFilter as UserRole) : undefined,
        isActive: statusFilter === 'all' ? undefined : statusFilter === 'active',
      })
      .then((res) => {
        if (isMounted) {
          setUsers(res.users);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUsers(fallbackDemoUsers);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [search, roleFilter, statusFilter, refreshIndex]);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    setUpdatingId(userId);
    try {
      await adminUserService.updateRole(userId, newRole);
      setNotice({ type: 'success', message: `User role successfully updated to ${newRole}` });
      setRefreshIndex((prev) => prev + 1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update role';
      setNotice({ type: 'error', message: msg });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
    setUpdatingId(userId);
    const newStatus = !currentStatus;
    try {
      await adminUserService.updateStatus(userId, newStatus);
      setNotice({
        type: 'success',
        message: `User account ${newStatus ? 'activated' : 'deactivated'} successfully`,
      });
      setRefreshIndex((prev) => prev + 1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to toggle account status';
      setNotice({ type: 'error', message: msg });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-emerald-400" />
            <span>Platform User Directory</span>
          </h1>
          <p className="text-xs text-stone-400">
            Control member privileges, assign content manager roles, and manage account statuses.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setIsLoading(true);
            setRefreshIndex((prev) => prev + 1);
          }}
          isLoading={isLoading}
          className="border-stone-700 text-stone-300 hover:bg-stone-800 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          <span>Refresh</span>
        </Button>
      </div>

      {notice && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
            notice.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
          }`}
        >
          {notice.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notice.message}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        <div className="sm:col-span-6">
          <Input
            id="user-search"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="bg-stone-800/80 border-stone-700 text-white placeholder:text-stone-500"
          />
        </div>

        <div className="sm:col-span-3 flex items-center gap-2">
          <Filter className="w-4 h-4 text-stone-400 shrink-0 hidden sm:block" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full rounded-xl border border-stone-700 bg-stone-800/80 px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Roles</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-stone-700 bg-stone-800/80 px-3 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-2xl border border-stone-800 bg-stone-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-800/60 border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-3.5 font-bold">User</th>
                <th className="px-6 py-3.5 font-bold">Country / Contact</th>
                <th className="px-6 py-3.5 font-bold">Role</th>
                <th className="px-6 py-3.5 font-bold">Status</th>
                <th className="px-6 py-3.5 font-bold">Joined</th>
                <th className="px-6 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isUpdating = updatingId === u.id;
                  return (
                    <tr key={u.id} className="hover:bg-stone-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {u.full_name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-bold text-stone-100">{u.full_name}</p>
                            <p className="text-[11px] text-stone-400">{u.id.slice(0, 8)}...</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-stone-300">
                        <p>{u.country || 'Not specified'}</p>
                        <p className="text-[11px] text-stone-500">{u.phone || 'No phone'}</p>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <select
                            disabled={isUpdating}
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                            aria-label={`Change role for ${u.full_name}`}
                            className="rounded-lg border border-stone-700 bg-stone-800 px-2 py-1 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
                          >
                            <option value="user">User</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {u.is_active ? (
                          <Badge variant="success" className="bg-emerald-950/40 text-emerald-300 border-emerald-500/30">
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="danger" className="bg-rose-950/40 text-rose-300 border-rose-500/30">
                            Suspended
                          </Badge>
                        )}
                      </td>

                      <td className="px-6 py-4 text-stone-400">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={isUpdating}
                          onClick={() => handleStatusToggle(u.id, u.is_active)}
                          className={
                            u.is_active
                              ? 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 text-xs'
                              : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/20 text-xs'
                          }
                        >
                          {u.is_active ? (
                            <>
                              <XCircle className="w-3.5 h-3.5 mr-1" />
                              <span>Suspend</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                              <span>Activate</span>
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
