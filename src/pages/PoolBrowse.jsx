import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Users, TrendingUp, ChevronDown, Star, Bookmark } from 'lucide-react';

const PoolBrowse = () => {
  const navigate = useNavigate();
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('ending_soon');
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    location: '',
    moqRange: { min: '', max: '' },
    status: 'active'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', count: 156 },
    { id: 'electronics', name: 'Electronics', count: 42 },
    { id: 'home_garden', name: 'Home & Garden', count: 38 },
    { id: 'fashion', name: 'Fashion & Apparel', count: 29 },
    { id: 'sports', name: 'Sports & Outdoors', count: 24 },
    { id: 'business', name: 'Business & Industrial', count: 23 }
  ];

  const sortOptions = [
    { id: 'ending_soon', name: 'Ending Soon' },
    { id: 'newest', name: 'Newest First' },
    { id: 'price_low', name: 'Price: Low to High' },
    { id: 'price_high', name: 'Price: High to Low' },
    { id: 'most_joined', name: 'Most Popular' },
    { id: 'highest_savings', name: 'Best Savings' }
  ];

  // Sample pool data - replace with Firebase data
  const samplePools = [
    {
      id: 'pool1',
      title: 'Premium Wireless Headphones - Sony WH-1000XM5',
      supplier: 'TechWorld Electronics',
      supplierRating: 4.8,
      category: 'electronics',
      image: '/api/placeholder/300/200',
      currentPrice: 279,
      originalPrice: 399,
      savings: 120,
      savingsPercent: 30,
      moqRequired: 50,
      currentParticipants: 34,
      timeLeft: '2 days',
      location: 'Los Angeles, CA',
      shippingIncluded: true,
      featured: true,
      tags: ['Fast Shipping', 'Verified Supplier', 'Popular'],
      description: 'Industry-leading noise cancellation with premium comfort and exceptional sound quality.'
    },
    {
      id: 'pool2',
      title: 'Smart Home Security Camera System (4-Pack)',
      supplier: 'SecureHome Solutions',
      supplierRating: 4.6,
      category: 'electronics',
      image: '/api/placeholder/300/200',
      currentPrice: 189,
      originalPrice: 299,
      savings: 110,
      savingsPercent: 37,
      moqRequired: 25,
      currentParticipants: 18,
      timeLeft: '5 days',
      location: 'Austin, TX',
      shippingIncluded: true,
      featured: false,
      tags: ['New Supplier', 'Limited Time'],
      description: '1080p HD cameras with night vision, motion detection, and mobile app control.'
    },
    {
      id: 'pool3',
      title: 'Ergonomic Office Chair - Executive Series',
      supplier: 'WorkSpace Pro',
      supplierRating: 4.9,
      category: 'business',
      image: '/api/placeholder/300/200',
      currentPrice: 245,
      originalPrice: 399,
      savings: 154,
      savingsPercent: 39,
      moqRequired: 30,
      currentParticipants: 22,
      timeLeft: '1 week',
      location: 'Chicago, IL',
      shippingIncluded: false,
      featured: true,
      tags: ['Top Rated', 'Bulk Discount'],
      description: 'Premium ergonomic design with lumbar support and adjustable height.'
    },
    {
      id: 'pool4',
      title: 'Organic Cotton Bed Sheet Set - Queen Size',
      supplier: 'Comfort Living',
      supplierRating: 4.7,
      category: 'home_garden',
      image: '/api/placeholder/300/200',
      currentPrice: 89,
      originalPrice: 149,
      savings: 60,
      savingsPercent: 40,
      moqRequired: 40,
      currentParticipants: 31,
      timeLeft: '3 days',
      location: 'Portland, OR',
      shippingIncluded: true,
      featured: false,
      tags: ['Organic', 'Free Shipping'],
      description: 'Luxury 400 thread count organic cotton sheets with deep pocket design.'
    },
    {
      id: 'pool5',
      title: 'Professional Kitchen Knife Set (8-Piece)',
      supplier: 'Chef\'s Choice',
      supplierRating: 4.8,
      category: 'home_garden',
      image: '/api/placeholder/300/200',
      currentPrice: 156,
      originalPrice: 249,
      savings: 93,
      savingsPercent: 37,
      moqRequired: 35,
      currentParticipants: 28,
      timeLeft: '4 days',
      location: 'Denver, CO',
      shippingIncluded: true,
      featured: false,
      tags: ['Professional Grade', 'Limited Edition'],
      description: 'High-carbon stainless steel knives with ergonomic handles and wooden block.'
    },
    {
      id: 'pool6',
      title: 'Fitness Resistance Bands Set with Accessories',
      supplier: 'FitGear Pro',
      supplierRating: 4.5,
      category: 'sports',
      image: '/api/placeholder/300/200',
      currentPrice: 34,
      originalPrice: 59,
      savings: 25,
      savingsPercent: 42,
      moqRequired: 60,
      currentParticipants: 45,
      timeLeft: '6 days',
      location: 'Miami, FL',
      shippingIncluded: true,
      featured: false,
      tags: ['Best Value', 'Complete Set'],
      description: 'Complete resistance training system with bands, handles, door anchor, and workout guide.'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPools(samplePools);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPools = pools.filter(pool => {
    if (searchTerm && !pool.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !pool.supplier.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && pool.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const sortedPools = [...filteredPools].sort((a, b) => {
    switch (sortBy) {
      case 'ending_soon':
        return a.timeLeft.localeCompare(b.timeLeft);
      case 'newest':
        return b.id.localeCompare(a.id);
      case 'price_low':
        return a.currentPrice - b.currentPrice;
      case 'price_high':
        return b.currentPrice - a.currentPrice;
      case 'most_joined':
        return b.currentParticipants - a.currentParticipants;
      case 'highest_savings':
        return b.savingsPercent - a.savingsPercent;
      default:
        return 0;
    }
  });

  const PoolCard = ({ pool }) => {
    const progressPercentage = (pool.currentParticipants / pool.moqRequired) * 100;
    
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
           onClick={() => navigate(`/pool/${pool.id}`)}>
        {/* Image Section */}
        <div className="relative">
          <img 
            src={pool.image} 
            alt={pool.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {pool.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Featured
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
            <Bookmark className="h-4 w-4 text-gray-600" />
          </div>
          <div className="absolute bottom-3 left-3">
            <div className="flex flex-wrap gap-1">
              {pool.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Header */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {pool.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{pool.supplier}</p>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{pool.supplierRating}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-green-600">${pool.currentPrice}</span>
              <span className="text-sm text-gray-500 line-through">${pool.originalPrice}</span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium">
                {pool.savingsPercent}% off
              </span>
            </div>
            <p className="text-sm text-gray-600">Save ${pool.savings} per unit</p>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                {pool.currentParticipants} / {pool.moqRequired} joined
              </span>
              <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{pool.timeLeft} left</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{pool.location}</span>
            </div>
          </div>

          {pool.shippingIncluded && (
            <div className="mt-2 text-sm text-green-600 font-medium">
              ✓ Free shipping included
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pools...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Group Buying Pools</h1>
              <p className="text-gray-600">Join others to unlock wholesale prices and exclusive deals</p>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{pools.length}</div>
                <div className="text-sm text-gray-600">Active Pools</div>
              </div>
              <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">$2.4M</div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search pools, products, or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, min: e.target.value}})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => setFilters({...filters, priceRange: {...filters.priceRange, max: e.target.value}})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="City, State"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* MOQ Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order Quantity</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min MOQ"
                      value={filters.moqRange.min}
                      onChange={(e) => setFilters({...filters, moqRange: {...filters.moqRange, min: e.target.value}})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max MOQ"
                      value={filters.moqRange.max}
                      onChange={(e) => setFilters({...filters, moqRange: {...filters.moqRange, max: e.target.value}})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {sortedPools.length} pools found
                  {selectedCategory !== 'all' && (
                    <span className="text-gray-600 font-normal">
                      {' '}in {categories.find(c => c.id === selectedCategory)?.name}
                    </span>
                  )}
                </h2>
                {searchTerm && (
                  <p className="text-gray-600 mt-1">Results for "{searchTerm}"</p>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button className="px-3 py-1 bg-white rounded shadow-sm text-sm font-medium">
                  Grid
                </button>
                <button className="px-3 py-1 text-sm font-medium text-gray-600">
                  List
                </button>
              </div>
            </div>

            {/* Pool Grid */}
            {sortedPools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedPools.map(pool => (
                  <PoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pools found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setFilters({
                      priceRange: { min: '', max: '' },
                      location: '',
                      moqRange: { min: '', max: '' },
                      status: 'active'
                    });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {sortedPools.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  Load More Pools
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolBrowse;
