import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with actual data from your backend
  const stats = {
    totalSales: 12500,
    totalOrders: 156,
    totalProducts: 89,
    totalUsers: 234,
    salesTrend: 12.5,
    orderTrend: -2.3
  };

  const overviewCards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      trend: stats.salesTrend,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      trend: stats.orderTrend,
      color: 'bg-green-500'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      trend: 5.2,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      trend: 8.1,
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp size={16} />
          <span>Last 30 days</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewCards.map((card, index) => {
          const Icon = card.icon;
          const isPositive = card.trend >= 0;
          
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${card.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {isPositive ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(card.trend)}%
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-sm font-medium text-gray-500">{card.title}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((order) => (
              <div key={order} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Order #{1000 + order}</p>
                    <p className="text-sm text-gray-500">2 items • $150.00</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full">
                  Completed
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((user) => (
              <div key={user} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">U{user}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">User {user}</p>
                    <p className="text-sm text-gray-500">user{user}@example.com</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 