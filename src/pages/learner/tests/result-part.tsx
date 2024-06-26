import { Box, Button, Container, Flex, Group, Loader, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ModalConfirm from 'components/Modal/ModalConfirmExit';
import QuestionListPart3 from 'components/Question/QuestionListPart3';
import QuestionListPart6 from 'components/Question/QuestionListPart6';
import QuestionListPart7 from 'components/Question/QuestionListPart7';
import QuestionPart1 from 'components/Question/QuestionPart1';
import QuestionPart2 from 'components/Question/QuestionPart2';
import QuestionPart5 from 'components/Question/QuestionPart5';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetGroupQuestionsQuery } from 'store/services/groupQuestionApi';
import { useGetQuestionsQuery } from 'store/services/questionApi';
import { GroupQuestionProps, Question } from 'types';
import { getGroupQuestions, getQuestions } from 'utils/parse.util';

const ResultPart = () => {
  const navigate = useNavigate();

  const { testId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedParts = searchParams.getAll('part');
  const { data: listQuestion } = useGetQuestionsQuery({
    id: testId,
    type: '',
    part: selectedParts
  });
  const { data: listGroupQuestions } = useGetGroupQuestionsQuery({
    id: testId,
    type: '',
    part: selectedParts
  });

  const [openedModalExit, { open: openModalExit, close: closeModalExit }] = useDisclosure(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [groupQuestions, setGroupQuestions] = useState<GroupQuestionProps[]>([]);

  useEffect(() => {
    if (listQuestion?.data.questions) {
      const questionsCopy = [...listQuestion?.data.questions];
      const sortedQuestions = questionsCopy.sort((a, b) => {
        const partNumA = parseInt(a.part_num, 10);
        const partNumB = parseInt(b.part_num, 10);
        return partNumA - partNumB;
      });
      const updatedQuestions = sortedQuestions.map((question) => ({
        ...question,
        user_answer: { questionId: question.id, option: '' }
      }));
      setQuestions(updatedQuestions);
    }
  }, [listQuestion, setQuestions]);

  useEffect(() => {
    if (listGroupQuestions?.data.group_questions) {
      const groupQuestionsCopy = [...listGroupQuestions?.data.group_questions];
      setGroupQuestions(groupQuestionsCopy);
    }
  }, [listGroupQuestions]);

  const handleConfirmExit = () => {
    navigate(`/learner/tests/${testId}`);
  };

  return (
    <>
      <Container size="xxl" px="xl" pt={50} pb={32}>
        <Title order={2} ta="center" mb={16}>
          Answer / Transcript : Part {listQuestion?.data.questions[0].part_num}
        </Title>
        <Group justify="center" align="center" mb={64}>
          <Title order={2} ta="center">
            {listQuestion?.data.book_title} {listQuestion?.data.test_title}
          </Title>
          <Button variant="outline" onClick={openModalExit}>
            Exit
          </Button>
        </Group>
        {questions.length === 0 && groupQuestions.length === 0 && (
          <Flex w="100%" h={600} justify="center" align="center">
            <Loader size={30} ta="center" />
          </Flex>
        )}
        <Box>
          {getQuestions(1, questions).map((question) => (
            <QuestionPart1
              question={question}
              updateQuestion={() => {}}
              isDisable={true}
              isShowAnswer={true}
              isShowAudio={true}
            />
          ))}
          {getQuestions(2, questions).map((question) => (
            <QuestionPart2
              question={question}
              updateQuestion={() => {}}
              isDisable={true}
              isShowAnswer={true}
              isShowAudio={true}
            />
          ))}
          <QuestionListPart3
            groupQuestions={getGroupQuestions(3, groupQuestions)}
            isDisable={true}
            isShowAnswer={true}
            updateQuestion={() => {}}
            isShowAudio={true}
          />
          <QuestionListPart3
            groupQuestions={getGroupQuestions(4, groupQuestions)}
            isDisable={true}
            isShowAnswer={true}
            updateQuestion={() => {}}
            isShowAudio={true}
          />
          {getQuestions(5, questions).map((question) => (
            <QuestionPart5
              question={question}
              updateQuestion={() => {}}
              isDisable={true}
              isShowAnswer={true}
            />
          ))}
          <QuestionListPart6
            groupQuestions={getGroupQuestions(6, groupQuestions)}
            isDisable={true}
            isShowAnswer={true}
            updateQuestion={() => {}}
          />
          <QuestionListPart7
            groupQuestions={getGroupQuestions(7, groupQuestions)}
            isDisable={true}
            isShowAnswer={true}
            updateQuestion={() => {}}
          />
        </Box>
      </Container>
      <ModalConfirm
        text="Do you sure you want to exit? "
        open={openedModalExit}
        onClose={closeModalExit}
        handleConfirm={handleConfirmExit}
      />
    </>
  );
};

export default ResultPart;
