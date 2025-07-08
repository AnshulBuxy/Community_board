import React from 'react';
import { Clock, CheckCircle, Mail, Phone, Building, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApprovalWaitingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSkip = () => {
    localStorage.setItem('loginType', 'user');
    navigate('/profile-setup');
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Created!</h1>
          <p className="text-gray-600">Your registration is pending approval</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Waiting for Approval</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Thank you for registering with Sama! Your account has been created successfully. 
              Your organization admin will review and approve your request shortly.
            </p>
          </div>

          {/* Status Steps */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">Account Created</p>
                <p className="text-xs text-green-600">Your registration details have been submitted</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-orange-800">Pending Admin Approval</p>
                <p className="text-xs text-orange-600">Your organization admin is reviewing your request</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="h-5 w-5 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">Account Activation</p>
                <p className="text-xs text-gray-500">You'll receive access once approved</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">What happens next?</h3>
            <div className="space-y-2 text-xs text-blue-800">
              <div className="flex items-center gap-2">
                <Mail className="h-3 w-3" />
                <span>You'll receive an email notification once approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>Admin may contact you for additional verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-3 w-3" />
                <span>Approval typically takes 1-2 business days</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSkip}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              <span>Skip for Testing</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleGoToLogin}
              className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 text-sm font-medium border border-gray-200"
            >
              Back to Login
            </button>
          </div>

          {/* Help Section */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Need help or have questions?</p>
            <button className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalWaitingPage;