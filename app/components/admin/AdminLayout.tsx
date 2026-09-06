"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/routes/ProtectedRoute';

export default function AdminLayout({ children }) {
  const router = useRouter();

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.replace('/admin-login');
  }

  return (
    <ProtectedRoute>
      <div className="flex">
      
      {/* Sidebar */}
      <aside className="w-fit  md:w-64 bg-slate-200 p-4">
        <ul className="space-y-3">
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/blogs/new">Create blog</Link></li>
          <li><Link href="/admin/projects/new">Create project</Link></li>
          <li><Link href="/admin/orders">Orders</Link></li>
          <li><Link href="/admin/forms">Contact forms</Link></li>
          <li><button type="button" onClick={logout}>Log out</button></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
      </div>
    </ProtectedRoute>
  );
}
