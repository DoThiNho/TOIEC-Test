import { Box, Divider } from '@mantine/core';
import { QuestionListPart34Props } from 'types';
import QuestionPart3 from './QuestionPart3';
import { getAudioUrl } from 'utils/parse.util';

const QuestionListPart3 = (props: QuestionListPart34Props) => {
  const { groupQuestions, isDisable, isShowAnswer, updateQuestion, isShowAudio, answers } = props;
  return (
    <Box>
      {groupQuestions.map((groupQuestion) => (
        <Box>
          {isShowAudio && (
            <Box mt={32}>
              <audio controls className="w-full">
                <source src={getAudioUrl(groupQuestion.group_audio)} type="audio/mpeg" />
              </audio>
            </Box>
          )}
          {groupQuestion.group_image && (
            <img
              width="100%"
              height="100%"
              className="mb-4"
              src={groupQuestion.group_image}
              alt="image question"
            />
          )}
          {[...groupQuestion.questions]
            .sort((a, b) => a.order - b.order)
            .map((question) => (
              <QuestionPart3
                key={question.id}
                question={question}
                isDisable={isDisable}
                isShowAnswer={isShowAnswer}
                updateQuestion={updateQuestion}
                optionUser={answers?.find((item) => item.question_id === question.id)?.option}
              />
            ))}
          <Divider my={16} />
        </Box>
      ))}
    </Box>
  );
};

export default QuestionListPart3;
