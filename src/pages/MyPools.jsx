import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, Package, Clock, Users, TrendingUp, Eye, Edit, Share2, MoreVertical, CheckCircle, AlertCircle, XCircle, Truck, CreditCard } from 'lucide-react';

const MyPools = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('joined');
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tabs = [
    { id: 'joined', name: 'Pools I\'ve Joined', count: 5 },
    { id: 'created', name: 'Pools I Created', count: 2 },
    { id: 'saved', name: 'Saved Pools', count: 8 },
    { id: 'completed', name: 'Completed', count: 12 }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'ending_soon', name: 'Ending Soon' },
    { id: 'completed', name: 'Completed' },
    { id: 'shipped', name: 'Shipped' },
    { id: 'delivered', name: 'Delivered' }
  ];

  // Sample pool data - replace with Firebase data
  const samplePools = {
    joined: [
      {
        id: 'pool1',
        title: 'Premium Wireless Headphones - Sony WH-1000XM5',
        supplier: 'TechWorld Electronics',
        image: '/api/placeholder/120/120',
        status: 'active',
        joinedDate: '2025-01-10',
        myQuantity: 2,
        pricePerUnit: 279,
        totalPaid: 558,
        currentParticipants: 34,
        moqRequired: 50,
        timeLeft: '2 days',
        progressPercent: 68,
        estimatedShipping: '2025-02-15',
        orderNumber: 'ORD-001234',
        paymentStatus: 'paid'
      },
      {
        id: 'pool2',
        title: 'Smart Home Security Camera System (4-Pack)',
        supplier: 'SecureHome Solutions',
        image: '/api/placeholder/120/120',
        status: 'ending_soon',
        joinedDate: '2025-01-08',
        myQuantity: 1,
        pricePerUnit: 189,
        totalPaid: 189,
        currentParticipants: 18,
        moqRequired: 25,
        timeLeft: '6 hours',
        progressPercent: 72,
        estimatedShipping: '2025-02-20',
        orderNumber: 'ORD-001235',
        paymentStatus: 'paid'
      },
      {
        id: 'pool3',
        title: 'Ergonomic Office Chair - Executive Series',
        supplier: 'WorkSpace Pro',
        image: '/api/placeholder/120/120',
        status: 'completed',
        joinedDate: '2024-12-15',
        myQuantity: 1,
        pricePerUnit: 245,
        totalPaid: 245,
        currentParticipants: 30,
        moqRequired: 30,
        timeLeft: 'Completed',
        progressPercent: 100,
        estimatedShipping: '2025-01-20',
        orderNumber: 'ORD-001200',
        paymentStatus: 'paid',
        trackingNumber: 'TRK-9876543210'
      },
      {
        id: 'pool4',
        title: 'Organic Cotton Bed Sheet Set - Queen Size',
        supplier: 'Comfort Living',
        image: '/api/placeholder/120/120',
        status: 'shipped',
        joinedDate: '2024-12-20',
        myQuantity: 2,
        pricePerUnit: 89,
        totalPaid: 178,
        currentParticipants: 40,
        moqRequired: 40,
        timeLeft: 'Shipped',
        progressPercent: 100,
        estimatedShipping: '2025-01-25',
        orderNumber: 'ORD-001210',
        paymentStatus: 'paid',
        trackingNumber: 'TRK-1234567890'
      },
      {
        id: 'pool5',
        title: 'Professional Kitchen Knife Set (8-Piece)',
        supplier: 'Chef\'s Choice',
        image: '/api/placeholder/120/120',
        status: 'delivered',
        joinedDate: '2024-11-10',
        myQuantity: 1,
        pricePerUnit: 156,
        totalPaid: 156,
        currentParticipants: 35,
        moqRequired: 35,
        timeLeft: 'Delivered',
        progressPercent: 100,
        estimatedShipping: '2024-12-15',
        orderNumber: 'ORD-001150',
        paymentStatus: 'paid',
        trackingNumber: 'TRK-5555555555',
        deliveredDate: '2024-12-12'
      }
    ],
    created: [
      {
        id: 'created1',
        title: 'Wireless Gaming Mouse - Pro Edition',
        supplier: 'My Store',
        image: '/api/placeholder/120/120',
        status: 'active',
        createdDate: '2025-01-05',
        pricePerUnit: 89,
        currentParticipants: 15,
        moqRequired: 25,
        timeLeft: '5 days',
        progressPercent: 60,
        totalRevenue: 1335,
        views: 245,
        inquiries: 8
      },
      {
        id: 'created2',
        title: 'Bluetooth Speaker Set - Waterproof',
        supplier: 'My Store',
        image: '/api/placeholder/120/120',
        status: 'completed',
        createdDate: '2024-12-01',
        pricePerUnit: 65,
        currentParticipants: 40,
        moqRequired: 40,
        timeLeft: 'Completed',
        progressPercent: 100,
        totalRevenue: 2600,
        views: 520,
        inquiries: 15
      }
    ],
    saved: [
      // Sample saved pools with bookmark functionality
    ],
    completed: [
      // Sample completed pools
    ]
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPools(samplePools);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'ending_soon':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: 'bg-blue-100 text-blue-800',
      ending_soon: 'bg-orange-100 text-orange-800',
      completed: 'bg-green-100 text-green-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status] || 'bg-gray-100 text-gray-800'}`}>
        {getStatusIcon(status)}
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const JoinedPoolCard = ({ pool }) => (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 p-6">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <img 
          src={pool.image} 
          alt={pool.title}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{pool.title}</h3>
              <p className="text-sm text-gray-600">{pool.supplier}</p>
            </div>
            {getStatusBadge(pool.status)}
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600">Quantity:</span>
              <div className="font-semibold">{pool.myQuantity} units</div>
            </div>
            <div>
              <span className="text-gray-600">Total Paid:</span>
              <div className="font-semibold text-green-600">${pool.totalPaid}</div>
            </div>
            <div>
              <span className="text-gray-600">Order #:</span>
              <div className="font-semibold">{pool.orderNumber}</div>
            </div>
            <div>
              <span className="text-gray-600">Joined:</span>
              <div className="font-semibold">{new Date(pool.joinedDate).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Progress Bar */}
          {pool.status === 'active' || pool.status === 'ending_soon' ? (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">
                  {pool.currentParticipants} / {pool.moqRequired} joined
                </span>
                <span className="text-sm font-medium text-gray-700">{pool.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pool.progressPercent}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Time left: <span className="font-medium">{pool.timeLeft}</span>
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/pool/${pool.id}`)}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View Details
            </button>
            {pool.trackingNumber && (
              <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                Track Package
              </button>
            )}
            {pool.status === 'delivered' && (
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                Leave Review
              </button>
            )}
            <button className="text-gray-600 hover:text-gray-700">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CreatedPoolCard = ({ pool }) => (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 p-6">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <img 
          src={pool.image} 
          alt={pool.title}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{pool.title}</h3>
              <p className="text-sm text-gray-600">Created {new Date(pool.createdDate).toLocaleDateString()}</p>
            </div>
            {getStatusBadge(pool.status)}
          </div>

          {/* Pool Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-600">Progress:</span>
              <div className="font-semibold">{pool.currentParticipants} / {pool.moqRequired}</div>
            </div>
            <div>
              <span className="text-gray-600">Revenue:</span>
              <div className="font-semibold text-green-600">${pool.totalRevenue.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-600">Views:</span>
              <div className="font-semibold">{pool.views}</div>
            </div>
            <div>
              <span className="text-gray-600">Inquiries:</span>
              <div className="font-semibold">{pool.inquiries}</div>
            </div>
          </div>

          {/* Progress Bar */}
          {pool.status === 'active' && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Pool Progress</span>
                <span className="text-sm font-medium text-gray-700">{pool.progressPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pool.progressPercent}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Time left: <span className="font-medium">{pool.timeLeft}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(`/pool/${pool.id}`)}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              <Eye className="h-4 w-4" />
              View Pool
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 font-medium text-sm">
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 font-medium text-sm">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-gray-700 font-medium text-sm">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const currentPools = pools[activeTab] || [];
  const filteredPools = currentPools.filter(pool => {
    if (searchTerm && !pool.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (statusFilter !== 'all' && pool.status !== statusFilter) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your pools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Pools</h1>
              <p className="text-gray-600">Manage your group buying activities and orders</p>
            </div>
            <button 
              onClick={() => navigate('/pool/create')}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Create New Pool
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search your pools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
          >
            {statusOptions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        {/* Pool List */}
        {filteredPools.length > 0 ? (
          <div className="space-y-4">
            {filteredPools.map(pool => (
              <div key={pool.id}>
                {activeTab === 'joined' || activeTab === 'saved' || activeTab === 'completed' ? (
                  <JoinedPoolCard pool={pool} />
                ) : (
                  <CreatedPoolCard pool={pool} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'joined' && 'No pools joined yet'}
              {activeTab === 'created' && 'No pools created yet'}
              {activeTab === 'saved' && 'No saved pools'}
              {activeTab === 'completed' && 'No completed orders'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'joined' && 'Start browsing pools to join group buying opportunities'}
              {activeTab === 'created' && 'Create your first pool to start selling with group MOQs'}
              {activeTab === 'saved' && 'Save pools you\'re interested in to keep track of them'}
              {activeTab === 'completed' && 'Your completed orders will appear here'}
            </p>
            <button
              onClick={() => {
                if (activeTab === 'created') {
                  navigate('/pool/create');
                } else {
                  navigate('/pools');
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {activeTab === 'created' ? 'Create Your First Pool' : 'Browse Pools'}
            </button>
          </div>
        )}

        {/* Summary Stats */}
        {filteredPools.length > 0 && activeTab === 'joined' && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Pool Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Active Pools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">$1,326</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">$485</div>
                <div className="text-sm text-gray-600">Total Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-gray-600">Orders Completed</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPools;
