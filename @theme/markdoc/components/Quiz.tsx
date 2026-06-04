import * as React from 'react';
import styled from 'styled-components';

const { useState, useEffect, Fragment } = React;

function Question({ question, setAnswerStatus }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  useEffect(() => {
    if (selectedAnswerIndex != null) {
      setAnswerStatus(selectedAnswerIndex === question.correctAnswerIndex);
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
  }, [question]);

  const getClasses = (index) => {
    let classes = [];
    if (selectedAnswerIndex != null) {
      if (selectedAnswerIndex === index) {
        classes.push('selected');
      }
      if (index === question.correctAnswerIndex) {
        if (selectedAnswerIndex === index) {
          classes.push('correct');
        } else {
          classes.push('incorrect');
        }
      }
    }

    return classes.join(' ');
  };

  return (
    <QuestionEl>
      <QuestionText>{question.question}</QuestionText>
      <Answers>
        {question.answers.map((answer, index) => {
          return (
            <AnswerElement
              key={index}
              className={getClasses(index)}
              onClick={() => selectedAnswerIndex == null && setSelectedAnswerIndex(index)}
            >
              {answer}
            </AnswerElement>
          );
        })}
      </Answers>
    </QuestionEl>
  );
}

function ProgressBar({ currentQuestionIndex, totalQuestionsCount }) {
  const progressPercentage = (currentQuestionIndex / totalQuestionsCount) * 100;

  return (
    <ProgressBarEl>
      <ProgressBarText>
        {currentQuestionIndex} answered ({totalQuestionsCount - currentQuestionIndex} remaining)
      </ProgressBarText>
      <ProgressBarInner style={{ width: `${progressPercentage}%` }} />
    </ProgressBarEl>
  );
}

export function Quiz({ title, summary, questions, children }) {
  const [questionIndex, setQuestionIndex] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    setAnswerStatus(null);
  }, [questionIndex]);

  useEffect(() => {
    if (answerStatus) {
      setCorrectAnswerCount((count) => count + 1);
    }
  }, [answerStatus]);

  const onNextClick = () => {
    if (questionIndex === questions.length - 1) {
      setQuizComplete(true);
    } else {
      setQuestionIndex(questionIndex == null ? 0 : questionIndex + 1);
    }
  };

  const onRestartClick = () => {
    setQuizComplete(false);
    setQuestionIndex(null);
    setCorrectAnswerCount(0);
  };

  if (questionIndex == null) {
    return (
      <Wrapper>
        {title ? <h1>{title}</h1> : null}
        {summary ? <Summary>{summary}</Summary> : null}
        {children}
        <Button className="start" onClick={onNextClick}>
          Start
        </Button>
      </Wrapper>
    );
  }

  return (
    <QuizWrapper>
      {quizComplete ? (
        <Fragment>
          <h1>Quiz complete!</h1>
          <p>
            You answered {correctAnswerCount} questions correctly (out of a total {questions.length}{' '}
            questions)
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <ProgressBar
            currentQuestionIndex={questionIndex}
            totalQuestionsCount={questions.length}
          />
          <Question question={questions[questionIndex]} setAnswerStatus={setAnswerStatus} />
          {answerStatus != null && (
            <div>
              <AnswerStatusEl>
                {!!answerStatus ? 'Correct! :)' : 'Your answer was incorrect :('}
              </AnswerStatusEl>
              <Button className="next" onClick={onNextClick}>
                {questionIndex === questions.length - 1
                  ? 'See results of this quiz'
                  : 'Next Question ->'}
              </Button>
            </div>
          )}
        </Fragment>
      )}

      {questionIndex != null && (
        <Button className="restart" onClick={onRestartClick}>
          Restart quiz
        </Button>
      )}
    </QuizWrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 600px;
  margin: auto;
`;

const Summary = styled.p`
  margin: 0 0 1rem;
`;

const QuizWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 600px;
  margin: auto;
`;

const Button = styled.button`
  background: #e8e8e8;
  border: 0;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 3px solid #c9c9c9;
  border-radius: 3px;
  &.next {
    background: #6ad85c;
    border-bottom: 3px solid #5abc4e;
  }
  &.start {
    margin-top: 20px;
  }
  &.restart {
    margin-top: 20px;
  }
`;

const QuestionEl = styled.div`
  width: 100%;
`;

const QuestionText = styled.div`
  font-size: 1.2em;
  margin: 20px 0;
`;

const Answers = styled.div`
  margin-bottom: 20px;
`;

const AnswerElement = styled.div`
  padding: 4px;
  text-align: center;
  background: #f3f3f3;
  margin-bottom: 5px;
  border-radius: 3px;
  cursor: pointer;

  &.selected {
    background: gainsboro;
  }

  &.correct {
    background: #6ad85c;
    font-weight: bold;
  }

  &.incorrect {
    background: #df3636;
    font-weight: bold;
  }
`;

const AnswerStatusEl = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProgressBarEl = styled.div`
  width: 100%;
  background: #f3f3f3;
  height: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const ProgressBarInner = styled.div`
  background: #6ad85c;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  transition: ease all 0.5s;
  border-radius: 3px;
`;

const ProgressBarText = styled.div`
  font-size: 0.7em;
  position: absolute;
  z-index: 10;
`;