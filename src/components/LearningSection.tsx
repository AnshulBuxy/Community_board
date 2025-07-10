Here's the fixed version with the missing closing brackets and parentheses:

The main issues were:

1. Missing closing bracket for the `handleQuizClick` function
2. Missing closing curly brace for the first `if` statement in `handleQuizClick`

Here are the fixes (adding closing characters):

```javascript
const handleQuizClick = (quiz: any) => {
    if (quiz.type === 'live' || quiz.type === 'completed') {
      if (quiz.type === 'live') {
        setSelectedQuiz(quiz);
        setShowLiveJoinPage(true);
      } else if (quiz.type === 'past') {
        setSelectedQuiz(quiz);
        setShowLeaderboard(true);
      } else if (quiz.type === 'past') {
        setSelectedQuiz(quiz);
        setShowLeaderboard(true);
      } else {
        // For upcoming quizzes (both registered and unregistered), show detail page
        setShowQuizDetail(true);
      }
    }
  };
```

The rest of the file remains unchanged. These additions complete the nested if statements and function definition properly.