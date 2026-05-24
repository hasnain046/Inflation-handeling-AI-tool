'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Users, Database, RefreshCw, FileText, Key } from 'lucide-react'

const users = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'ANALYST', status: 'Active' },
  { id: '2', name: 'Marcus Webb', email: 'marcus@example.com', role: 'RESEARCHER', status: 'Active' },
  { id: '3', name: 'Dr. Priya Nair', email: 'priya@example.com', role: 'ADMIN', status: 'Active' },
  { id: '4', name: 'James Okafor', email: 'james@example.com', role: 'GUEST', status: 'Inactive' },
]

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage users, models, and system configuration</p>
      </motion.div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: RefreshCw, label: 'Retrain Models', color: 'from-indigo-500 to-purple-600' },
          { icon: Database, label: 'Data Sources', color: 'from-cyan-500 to-blue-600' },
          { icon: Key, label: 'API Keys', color: 'from-green-500 to-teal-600' },
          { icon: FileText, label: 'Audit Logs', color: 'from-orange-500 to-red-600' },
        ].map(({ icon: Icon, label, color }) => (
          <Card key={label} className="flex flex-col items-center justify-center py-6 cursor-pointer hover:border-white/20 transition-all group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-white">{label}</span>
          </Card>
        ))}
      </div>

      {/* Users table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>User Management</CardTitle>
          <Button variant="gradient" size="sm" className="gap-2">
            <Users className="w-4 h-4" /> Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Name', 'Email', 'Role', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2.5 px-3 font-medium text-white">{u.name}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{u.email}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant={u.role === 'ADMIN' ? 'danger' : u.role === 'ANALYST' ? 'info' : 'default'} className="text-[10px]">
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3">
                      <Badge variant={u.status === 'Active' ? 'success' : 'default'} className="text-[10px]">{u.status}</Badge>
                    </td>
                    <td className="py-2.5 px-3">
                      <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
