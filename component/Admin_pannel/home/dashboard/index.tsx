'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Users, DollarSign, ShoppingCart, MessageCircle } from 'lucide-react';

const stats = [
  { title: 'Users', value: 1240, icon: <Users size={28} />, color: 'from-purple-500 to-indigo-500' },
  { title: 'Revenue', value: '$8,450', icon: <DollarSign size={28} />, color: 'from-green-400 to-teal-500' },
  { title: 'Orders', value: 320, icon: <ShoppingCart size={28} />, color: 'from-yellow-400 to-orange-500' },
  { title: 'Feedbacks', value: 89, icon: <MessageCircle size={28} />, color: 'from-pink-500 to-red-500' },
];

const lineData = [
  { name: 'Jan', uv: 400 },
  { name: 'Feb', uv: 300 },
  { name: 'Mar', uv: 500 },
  { name: 'Apr', uv: 200 },
  { name: 'May', uv: 350 },
];

const barData = [
  { name: 'Product A', sales: 240 },
  { name: 'Product B', sales: 300 },
  { name: 'Product C', sales: 200 },
];

export default function DashboardPage() {
  return (
    <div className=" min-h-screen">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-4 p-6 rounded-xl shadow-lg bg-gradient-to-r ${stat.color} text-white hover:scale-105 transition-transform`}
          >
            <div className="p-4 bg-white/20 rounded-full">{stat.icon}</div>
            <div>
              <p className="text-sm font-medium opacity-90">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="font-bold mb-4 text-gray-700">Monthly Users</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#7c3aed" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="font-bold mb-4 text-gray-700">Product Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="sales" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
