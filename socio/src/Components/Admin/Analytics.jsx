import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Analytics = () => {
  // Mock data - replace with actual data from your backend
  const stats = {
    totalRevenue: 12500,
    totalOrders: 156,
    totalUsers: 234,
    totalProducts: 89,
    revenueChange: 12.5,
    ordersChange: -2.3,
    usersChange: 8.1,
    productsChange: 5.2
  };

  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 }
  ];

  const topProducts = [
    { name: 'Product A', sales: 120, revenue: 2400 },
    { name: 'Product B', sales: 98, revenue: 1960 },
    { name: 'Product C', sales: 75, revenue: 1500 },
    { name: 'Product D', sales: 60, revenue: 1200 },
    { name: 'Product E', sales: 45, revenue: 900 }
  ];

  const StatCard = ({ title, value, icon: Icon, change, color }) => {
    const isPositive = change >= 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <div className="flex items-center space-x-1">
            {isPositive ? (
              <ArrowUp className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(change)}%
            </span>
          </div>
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-1 text-2xl font-semibold text-gray-900">
          {title.includes('Revenue') ? `$${value.toLocaleString()}` : value}
        </p>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={DollarSign}
          change={stats.revenueChange}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          change={stats.ordersChange}
          color="bg-green-500"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          change={stats.usersChange}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={Package}
          change={stats.productsChange}
          color="bg-pink-500"
        />
      </div>

      {/* Sales Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <div className="h-64">
            {/* Replace with actual chart component */}
            <div className="flex items-end h-full space-x-2">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex-1">
                  <div
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${(data.sales / 6000) * 100}%` }}
                  />
                  <div className="text-center text-xs text-gray-500 mt-2">
                    {data.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <span className="ml-3 text-sm font-medium text-gray-900">
                    {product.name}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    ${product.revenue}
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.sales} sales
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">New order #100{item}</p>
                  <p className="text-sm text-gray-500">2 items • $150.00</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics; 