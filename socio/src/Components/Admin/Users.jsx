import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Shield,
  MoreVertical,
  Edit2,
  Trash2,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      joinDate: '2024-01-15',
      role: 'customer',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 891',
      joinDate: '2024-02-01',
      role: 'admin',
      status: 'active'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+1 234 567 892',
      joinDate: '2024-02-15',
      role: 'customer',
      status: 'inactive'
    }
  ]);

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleStatusChange = (userId, newStatus) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast.success(`User status updated to ${newStatus}`);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <UserPlus size={20} className="mr-2" />
          Add User
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <div className="relative">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit2 size={16} className="mr-2" />
                    Edit User
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete User
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm">Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield size={16} className="mr-2" />
                <span className="text-sm capitalize">{user.role}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  user.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
                <button
                  onClick={() => handleStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users; 