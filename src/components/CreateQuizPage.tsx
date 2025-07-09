import React, { useState } from 'react';
import { ArrowLeft, Plus, X, Save, Rocket, Users, Building } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CreateQuizPageProps {
  onBack: () => void;
}

const CreateQuizPage: React.FC<CreateQuizPageProps> = ({ onBack }) => {
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    duration: 30,
    startDate: '',
    startTime: ''
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const [newTag, setNewTag] = useState('');
  const [showLaunchModal, setShowLaunchModal] = useState(false);
  const [launchType, setLaunchType] = useState<'draft' | 'launch'>('draft');

  const handleInputChange = (field: string, value: any) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !quizData.tags.includes(newTag.trim())) {
      setQuizData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setQuizData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const addQuestion = () => {
    if (currentQuestion.question.trim() && currentQuestion.options.every(opt => opt.trim())) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion.question,
        options: [...currentQuestion.options],
        correctAnswer: currentQuestion.correctAnswer
      };
      
      setQuestions(prev => [...prev, newQuestion]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      });
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleSave = (type: 'draft' | 'launch') => {
    setLaunchType(type);
    if (type === 'launch') {
      setShowLaunchModal(true);
    } else {
      // Save as draft
      console.log('Saving as draft:', { quizData, questions });
      onBack();
    }
  };

  const handleLaunch = (audience: 'all' | 'organization') => {
    console.log('Launching quiz:', { quizData, questions, audience });
    setShowLaunchModal(false);
    onBack();
  };

  const LaunchModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Rocket className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Launch Quiz</h3>
            <p className="text-sm text-gray-600">Choose your target audience</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-6">
          Who should have access to this quiz?
        </p>
        
        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleLaunch('all')}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Users className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">All Students</div>
              <div className="text-sm text-gray-600">Available to all registered students</div>
            </div>
          </button>
          
          <button
            onClick={() => handleLaunch('organization')}
            className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Building className="h-5 w-5 text-purple-600" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Organization Students</div>
              <div className="text-sm text-gray-600">Available only to your organization students</div>
            </div>
          </button>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowLaunchModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quizzes
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Quiz</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quiz Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter quiz title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={quizData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe what this quiz covers"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {quizData.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Add a tag"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={quizData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={quizData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                    min="5"
                    max="180"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={quizData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={quizData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Questions ({questions.length})</h2>
            
            {/* Add Question Form */}
            <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => handleQuestionChange('question', e.target.value)}
                  placeholder="Enter your question"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={currentQuestion.correctAnswer === index}
                        onChange={() => handleQuestionChange('correctAnswer', index)}
                        className="text-green-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="text-sm text-gray-500 w-16">
                        {currentQuestion.correctAnswer === index ? 'Correct' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={addQuestion}
                disabled={!currentQuestion.question.trim() || !currentQuestion.options.every(opt => opt.trim())}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Question
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Q{index + 1}: {question.question}</h4>
                    <button
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-100 text-green-800 font-medium'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{quizData.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium capitalize">{quizData.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tags:</span>
                <span className="font-medium">{quizData.tags.length}</span>
              </div>
            </div>
          </div>

          {/* Save Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Options</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSave('draft')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </button>
              
              <button
                onClick={() => handleSave('launch')}
                disabled={questions.length === 0 || !quizData.title.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Rocket className="h-4 w-4" />
                Launch Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Modal */}
      {showLaunchModal && <LaunchModal />}
    </div>
  );
};

export default CreateQuizPage;