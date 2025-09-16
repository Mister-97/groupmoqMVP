import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Shield, Calendar, ArrowRight, Download, Share2 } from 'lucide-react';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, pool, quantity, totals } = location.state || {};

  useEffect(() => {
    // If no order data, redirect to pools
    if (!orderNumber) {
      navigate('/pools');
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">
            Thank you for joining the pool. Your payment is secured in escrow.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <span className="text-sm text-gray-600">Order #{orderNumber}</span>
            </div>
            
            <div className="flex items-start gap-4">
              <img 
                src={pool.image} 
                alt={pool.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{pool.title}</h3>
                <p className="text-gray-600 mb-2">{pool.supplier}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600">Quantity: <strong>{quantity}</strong></span>
                  <span className="text-gray-600">Price: <strong>${pool.poolPrice} each</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({quantity} units)</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.shipping > 0 ? (
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${totals.shipping.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              )}
              {totals.promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo discount</span>
                  <span>-${totals.promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Paid</span>
                  <span className="text-lg font-semibold">${totals.total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  You saved ${totals.totalSavings.toFixed(2)} vs. retail!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What Happens Next?</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Payment Secured</h4>
                  <p className="text-gray-600 text-sm">
                    Your payment of ${totals.total.toFixed(2)} is safely held in escrow until the pool reaches its minimum order quantity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Pool Progress</h4>
                  <p className="text-gray-600 text-sm">
                    We'll notify you when more people join. The pool needs {pool.moqRequired - pool.currentParticipants} more participants to reach the minimum order quantity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Order Processing</h4>
                  <p className="text-gray-600 text-sm">
                    Once the pool is complete, the supplier will begin preparing your order. You'll receive tracking information via email.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Delivery</h4>
                  <p className="text-gray-600 text-sm">
                    Your order will be shipped directly to you. Estimated delivery: <strong>{pool.estimatedDelivery}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Protection Features */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="h-6 w-6 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Your Order is Protected</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Escrow protection - your money is safe until delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Full refund if pool doesn't reach minimum quantity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>30-day return policy and 2-year warranty included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>24/7 customer support available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => navigate('/my-pools')}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Package className="h-5 w-5" />
            View My Pools
          </button>
          
          <button 
            onClick={() => navigate(`/pool/${pool.id}`)}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            <Clock className="h-5 w-5" />
            Track Pool Progress
          </button>
          
          <button 
            onClick={() => navigate('/pools')}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <ArrowRight className="h-5 w-5" />
            Browse More Pools
          </button>
        </div>

        {/* Additional Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Order Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Download className="h-4 w-4" />
              Download Receipt
            </button>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Share2 className="h-4 w-4" />
              Share Pool with Friends
            </button>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <Calendar className="h-4 w-4" />
              Add to Calendar
            </button>
          </div>
        </div>

        {/* Confirmation Email Notice */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>A confirmation email has been sent to your email address with all the details above.</p>
          <p className="mt-1">
            Questions? Contact our support team at{' '}
            <a href="mailto:support@groupmoq.com" className="text-blue-600 hover:underline">
              support@groupmoq.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
