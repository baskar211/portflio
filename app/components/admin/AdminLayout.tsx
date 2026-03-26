"use client";
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <aside className="w-fit  md:w-64 bg-slate-200 p-4">
        <ul className="space-y-3">
          <li><Link href="">Dashboard</Link></li>
          <li><Link href="orders">Orders</Link></li>
          <li><Link href="forms">Forms</Link></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
