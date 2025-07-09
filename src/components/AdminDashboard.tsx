import React, { useState } from 'react';
import UserProfilePage from './UserProfilePage';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Search, 
  Filter, 
  ChevronDown, 
  Mail, 
  Phone, 
  Calendar,
  TrendingUp,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Building,
  Award,
  Eye
} from 'lucide-react';

interface PendingUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  requestDate: Date;
  skills: string[];
  bio: string;
  avatar: string;
}

interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'student' | 'mentor';
  skills: string[];
  rating: number;
  joinedDate: Date;
  lastActive: Date;
  status: 'active' | 'inactive';
  completedSessions: number;
  posts: number;
  connections: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'mentor'>('all');

  // Mock data for pending requests
  const [pendingRequests, setPendingRequests] = useState<PendingUser[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@email.com',
      phone: '+91 9876543210',
      organization: 'sama',
      requestDate: new Date(Date.now() - 86400000), // 1 day ago
      skills: [],
      bio: '',
      avatar: ''
    },
    {
      id: '2',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 9876543211',
      organization: 'sama',
      requestDate: new Date(Date.now() - 172800000), // 2 days ago
      skills: [],
      bio: '',
      avatar: ''
    },
    {
      id: '3',
      name: 'Amit Kumar',
      email: 'amit.kumar@email.com',
      phone: '+91 9876543212',
      organization: 'sama',
      requestDate: new Date(Date.now() - 259200000), // 3 days ago
      skills: [],
      bio: '',
      avatar: ''
    }
  ]);

  // State for multi-select functionality
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  // Mock data for organization users
  const [organizationUsers, setOrganizationUsers] = useState<OrganizationUser[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@sama.org',
      phone: '+91 9876543213',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      skills: ['react', 'javascript', 'typescript'],
      rating: 4.8,
      joinedDate: new Date('2023-01-15'),
      lastActive: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'active',
      completedSessions: 45,
      posts: 23,
      connections: 67
    },
    {
      id: '2',
      name: 'Vikram Singh',
      email: 'vikram.singh@sama.org',
      phone: '+91 9876543214',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student',
      skills: ['python', 'data-science'],
      rating: 4.2,
      joinedDate: new Date('2023-03-20'),
      lastActive: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'active',
      completedSessions: 12,
      posts: 8,
      connections: 23
    },
    {
      id: '3',
      name: 'Anita Desai',
      email: 'anita.desai@sama.org',
      phone: '+91 9876543215',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'mentor',
      skills: ['python', 'machine-learning', 'data-science'],
      rating: 4.9,
      joinedDate: new Date('2022-11-10'),
      lastActive: new Date(Date.now() - 86400000), // 1 day ago
      status: 'inactive',
      completedSessions: 78,
      posts: 34,
      connections: 89
    }
  ]);

  const handleApproveRequest = (userId: string) => {
    // Find the user being approved
    const approvedUser = pendingRequests.find(user => user.id === userId);
    
    if (approvedUser) {
      // Add to organization users
      const newOrganizationUser: OrganizationUser = {
        id: approvedUser.id,
        name: approvedUser.name,
        email: approvedUser.email,
        phone: approvedUser.phone,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150', // Default avatar
        role: 'student', // Default role for new users
        skills: [],
        rating: 0,
        joinedDate: new Date(),
        lastActive: new Date(),
        status: 'active',
        completedSessions: 0,
        posts: 0,
        connections: 0
      };
      
      // Add to organization users list (in a real app, this would be an API call)
      setOrganizationUsers(prev => [...prev, newOrganizationUser]);
    }
    
    // Remove from pending requests
    setPendingRequests(prev => prev.filter(user => user.id !== userId));
    console.log('Approved user:', userId);
  };

  const handleRejectRequest = (userId: string) => {
    setPendingRequests(prev => prev.filter(user => user.id !== userId));
    // In real app, this would make an API call to reject the user
    console.log('Rejected user:', userId);
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleBackToUserManagement = () => {
    setSelectedUserId(null);
  };

  // Handle selecting/deselecting individual requests
  const handleSelectRequest = (userId: string) => {
    setSelectedRequests(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  // Handle select all / deselect all
  const handleSelectAllRequests = () => {
    if (selectedRequests.length === pendingRequests.length) {
      // If all are selected, deselect all
      setSelectedRequests([]);
    } else {
      // Select all pending requests
      setSelectedRequests(pendingRequests.map(user => user.id));
    }
  };

  // Handle approving selected requests
  const handleApproveSelectedRequests = () => {
    const approvedUsers = pendingRequests.filter(user => selectedRequests.includes(user.id));
    
    // Add all approved users to organization users
    const newOrganizationUsers: OrganizationUser[] = approvedUsers.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      role: 'student' as const,
      skills: [],
      rating: 0,
      joinedDate: new Date(),
      lastActive: new Date(),
      status: 'active' as const,
      completedSessions: 0,
      posts: 0,
      connections: 0
    }));
    
    // Add to organization users list
    setOrganizationUsers(prev => [...prev, ...newOrganizationUsers]);
    
    // Remove approved users from pending requests
    setPendingRequests(prev => prev.filter(user => !selectedRequests.includes(user.id)));
    
    // Clear selection
    setSelectedRequests([]);
    
    console.log('Approved users:', selectedRequests);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const filteredUsers = organizationUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{organizationUsers.length}</p>
              <p className="text-sm text-green-600 mt-1">↗ +12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">{pendingRequests.length}</p>
              <p className="text-sm text-orange-600 mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {organizationUsers.filter(u => u.status === 'active').length}
              </p>
              <p className="text-sm text-green-600 mt-1">↗ +8% from last week</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
              <p className="text-3xl font-bold text-gray-900">4.6</p>
              <p className="text-sm text-green-600 mt-1">↗ +0.2 from last month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">New user approved: Rahul Sharma</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Sarah Wilson completed mentoring session</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">3 new registration requests pending</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPendingRequests = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pending Registration Requests</h2>
        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
          {pendingRequests.length} pending
        </span>
      </div>

      {pendingRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No pending requests</p>
          <p className="text-gray-400 text-sm mt-2">All registration requests have been processed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Multi-select controls */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRequests.length === pendingRequests.length && pendingRequests.length > 0}
                    onChange={handleSelectAllRequests}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Select All ({pendingRequests.length})
                  </span>
                </label>
                
                {selectedRequests.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {selectedRequests.length} selected
                  </span>
                )}
              </div>
              
              <button
                onClick={handleApproveSelectedRequests}
                disabled={selectedRequests.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <CheckCircle className="h-4 w-4" />
                Approve Selected ({selectedRequests.length})
              </button>
            </div>
          </div>

          {pendingRequests.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(user.id)}
                    onChange={() => handleSelectRequest(user.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                </label>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-semibold text-gray-900">{user.name}</h3>
                    <span className="text-xs text-gray-500">{formatTimeAgo(user.requestDate)}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      <span>{user.organization}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApproveRequest(user.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600 transition-colors duration-200"
                    >
                      <CheckCircle className="h-3 w-3" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectRequest(user.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors duration-200"
                    >
                      <XCircle className="h-3 w-3" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="mentor">Mentors</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Rating</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Last Active</th>
                <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'mentor' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{user.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-gray-600">
                      {formatTimeAgo(user.lastActive)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                      <Eye className="h-4 w-4" />
                      <span 
                        className="text-sm cursor-pointer"
                        onClick={() => handleViewUser(user.id)}
                      >
                        View
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      
      {/* Placeholder for Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">User Growth</h3>
          <p className="text-gray-600">Track user registration and engagement trends</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <PieChart className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Skill Distribution</h3>
          <p className="text-gray-600">Analyze skill distribution across users</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <LineChart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity Metrics</h3>
          <p className="text-gray-600">Monitor user activity and engagement</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Detailed analytics and reporting features will be available here. 
          Track user engagement, skill development, and organizational metrics.
        </p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'pending', label: 'Pending Requests', icon: Clock, badge: pendingRequests.length },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  // Show user profile page if a user is selected
  if (selectedUserId) {
    return <UserProfilePage userId={selectedUserId} onBack={handleBackToUserManagement} />;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sama Organization Dashboard</h1>
        <p className="text-gray-600">Manage Sama organization users and monitor platform activity</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex space-x-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center ${
                    activeTab === tab.id ? 'bg-white text-blue-500' : 'bg-red-500 text-white'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'pending' && renderPendingRequests()}
      {activeTab === 'users' && renderUserManagement()}
      {activeTab === 'analytics' && renderAnalytics()}
    </div>
  );
};

export default AdminDashboard;