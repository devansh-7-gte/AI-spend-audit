'use client';

import SpendForm from '@/components/SpendForm';

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Spending Audit</h1>
        <SpendForm />
      </div>
    </main>
  );
}
