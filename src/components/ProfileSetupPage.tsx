import React, { useState } from 'react';
import { User, Camera, Plus, X, Save, ArrowRight, Upload, MapPin, Calendar, Award, Target, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: '',
    location: '',
    dateOfBirth: '',
    education: '',
    experience: '',
    skills: [] as string[],
    interests: [] as string[],
    goals: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim().toLowerCase())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim().toLowerCase()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleSkip = () => {
    localStorage.setItem('loginType', 'user');
    navigate('/dashboard');
  };

  const handleComplete = () => {
    localStorage.setItem('loginType', 'user');
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getStepProgress = () => {
    return (currentStep / 3) * 100;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      {/* Avatar Upload */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <button className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
          <Upload className="h-4 w-4" />
          Upload Photo
        </button>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bio <span className="text-gray-400">(Tell us about yourself)</span>
        </label>
        <textarea
          value={profileData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder="I'm a passionate learner interested in..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="h-4 w-4 inline mr-1" />
          Location
        </label>
        <input
          type="text"
          value={profileData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="City, Country"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="h-4 w-4 inline mr-1" />
          Date of Birth
        </label>
        <input
          type="date"
          value={profileData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Experience</h2>
        <p className="text-gray-600">Share your background and expertise</p>
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Award className="h-4 w-4 inline mr-1" />
          Education
        </label>
        <textarea
          value={profileData.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          placeholder="Bachelor's in Computer Science, XYZ University (2020-2024)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <BookOpen className="h-4 w-4 inline mr-1" />
          Experience
        </label>
        <textarea
          value={profileData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="Frontend Developer Intern at ABC Company (6 months)"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {profileData.skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill (e.g., React, Python)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {profileData.interests.map((interest) => (
            <span
              key={interest}
              className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
            >
              {interest}
              <button
                onClick={() => removeInterest(interest)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            placeholder="Add an interest (e.g., Web Development, AI)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addInterest}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Goals & Links</h2>
        <p className="text-gray-600">What are you looking to achieve?</p>
      </div>

      {/* Goals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Target className="h-4 w-4 inline mr-1" />
          Learning Goals
        </label>
        <textarea
          value={profileData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          placeholder="I want to become a full-stack developer and learn about machine learning..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Social Links (Optional)</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={profileData.linkedinUrl}
            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
          <input
            type="url"
            value={profileData.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
            placeholder="https://github.com/yourusername"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
          <input
            type="url"
            value={profileData.portfolioUrl}
            onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
            placeholder="https://yourportfolio.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help others get to know you better</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
            <span className="text-sm text-gray-500">{Math.round(getStepProgress())}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium border border-gray-200"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={handleSkip}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium border border-gray-200"
              >
                Skip for Testing
              </button>
            </div>

            <div className="flex gap-3">
              {currentStep < 3 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all duration-200"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all duration-200"
                >
                  <Save className="h-4 w-4" />
                  Complete Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;