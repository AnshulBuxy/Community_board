import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Flag, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  selectedAnswer?: number;
}

interface LiveQuizPageProps {
  quiz: any;
  onBack: () => void;
}

const LiveQuizPage: React.FC<LiveQuizPageProps> = ({ quiz, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [showEndModal, setShowEndModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is the correct way to create a functional component in React?",
      options: [
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = () => { return <div>Hello</div>; }",
        "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
        "Both A and B are correct"
      ]
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ]
    },
    {
      id: 3,
      question: "What is the purpose of the useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create context providers",
        "To optimize component rendering"
      ]
    },
    {
      id: 4,
      question: "How do you pass data from parent to child component?",
      options: [
        "Using state",
        "Using props",
        "Using context",
        "Using refs"
      ]
    },
    {
      id: 5,
      question: "What is JSX?",
      options: [
        "A JavaScript library",
        "A syntax extension for JavaScript",
        "A CSS framework",
        "A testing framework"
      ]
    }
  ]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmitQuiz();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === questions[currentQuestion].id 
        ? { ...q, selectedAnswer: answerIndex }
        : q
    ));
  };

  const handleQuestionNavigation = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    // In real app, submit answers to backend
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const getQuestionStatus = (question: Question) => {
    return question.selectedAnswer !== undefined ? 'answered' : 'unanswered';
  };

  const answeredCount = questions.filter(q => q.selectedAnswer !== undefined).length;

  const EndQuizModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">End Quiz</h3>
            <p className="text-sm text-gray-600">Are you sure you want to submit?</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Answered:</span>
                <span className="font-medium ml-2">{answeredCount}/{questions.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Time Left:</span>
                <span className="font-medium ml-2">{formatTime(timeRemaining)}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Once submitted, you cannot change your answers.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowEndModal(false)}
            className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Continue Quiz
          </button>
          <button
            onClick={handleSubmitQuiz}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flag className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your answers have been recorded successfully. Results will be available shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600">
              <div>Questions Answered: <span className="font-medium">{answeredCount}/{questions.length}</span></div>
              <div>Time Taken: <span className="font-medium">{formatTime(30 * 60 - timeRemaining)}</span></div>
            </div>
          </div>
          <p className="text-sm text-gray-500">Redirecting to quiz results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Exit Quiz
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
            </div>
            
            <button
              onClick={() => setShowEndModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <Flag className="h-4 w-4" />
              End Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Quiz Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{answeredCount}/{questions.length} answered</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    Question {currentQuestion + 1}
                  </span>
                  {getQuestionStatus(questions[currentQuestion]) === 'answered' && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      Answered
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      questions[currentQuestion].selectedAnswer === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        questions[currentQuestion].selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {questions[currentQuestion].selectedAnswer === index && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                
                <button
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Question Panel */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions</h3>
          
          <div className="grid grid-cols-5 gap-2 mb-6">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => handleQuestionNavigation(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                  index === currentQuestion
                    ? 'bg-blue-500 text-white'
                    : getQuestionStatus(question) === 'answered'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 rounded border border-green-300"></div>
              <span className="text-gray-600">Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 rounded border border-gray-300"></div>
              <span className="text-gray-600">Not Answered ({questions.length - answeredCount})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Current Question</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Quiz Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-medium">{questions.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Answered:</span>
                <span className="font-medium">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className="font-medium">{questions.length - answeredCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* End Quiz Modal */}
      {showEndModal && <EndQuizModal />}
    </div>
  );
};

export default LiveQuizPage;