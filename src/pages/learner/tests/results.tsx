import {
  faCheck,
  faCircleCheck,
  faCircleXmark,
  faList,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Text,
  Title
} from '@mantine/core';
import CommonHeader from 'components/Common/CommonHeader';
import ResultDetail from 'components/Result/ResultDetail';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetResultByIdQuery } from 'store/services/resultApi';
import { GroupQuestionProps, Question } from 'types';

const ResultExam = () => {
  const param = useParams();
  const { data: resultDetail } = useGetResultByIdQuery(param.idResult);

  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (resultDetail?.data) {
      const allQuestions = resultDetail.data.groupQuestions.flatMap(
        (groupQuestion: GroupQuestionProps) => groupQuestion.questions
      );
      const combinedQuestions = [...resultDetail.data.questions, ...allQuestions];
      const uniqueQuestions = Array.from(
        new Map(combinedQuestions.map((question) => [question.id, question])).values()
      );
      uniqueQuestions.sort((a, b) => a.order - b.order);

      setQuestions(uniqueQuestions);
    }
  }, [resultDetail]);

  return (
    <>
      <CommonHeader />
      <Container size="xxl" px="xl" pt={130} pb={32}>
        <Paper w="80%" shadow="lg" p={16} mx="auto">
          {!resultDetail?.data ? (
            <LoadingOverlay
              visible={!resultDetail?.data}
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
            />
          ) : (
            <>
              <Group justify="center">
                <Title order={2} ta="center">
                  {resultDetail && resultDetail.data.test.book_title}
                </Title>
                <Title order={2} ta="center">
                  {resultDetail && resultDetail.data.test.title}
                </Title>
                {resultDetail.data.parts !== '' && (
                  <>
                    {resultDetail.data.results.parts
                      ?.split(',')
                      .map((item: string, index: number) => (
                        <Badge key={index} size="sm" color="yellow">
                          Part {item}
                        </Badge>
                      ))}
                  </>
                )}
              </Group>
              <Group ta="center" justify="center">
                <Paper shadow="lg" p={48}>
                  <Text c="green">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </Text>
                  <Text c="green">Correct</Text>
                  <Text fw={700}>{resultDetail.data.results.total_correct}</Text>
                  <Text>Questions</Text>
                </Paper>
                <Paper shadow="lg" p={48}>
                  <Text c="red">
                    <FontAwesomeIcon icon={faCircleXmark} />
                  </Text>
                  <Text c="red">Incorrect</Text>
                  <Text fw={700}>
                    {resultDetail.data.results.total_questions -
                      resultDetail.data.results.total_correct}
                  </Text>
                  <Text>Questions</Text>
                </Paper>
                <Paper shadow="lg" p={48}>
                  <Text>
                    <FontAwesomeIcon icon={faList} />
                  </Text>
                  <Text>Total</Text>
                  <Text fw={700}>{resultDetail.data.results.total_questions}</Text>
                  <Text>Questions</Text>
                </Paper>
              </Group>
              <Group mt={32}>
                <Text>Answer : </Text>
                <Button variant="outline" onClick={() => setIsShowAnswer(!isShowAnswer)}>
                  See detail answer
                </Button>
              </Group>
              <Box>
                {!isShowAnswer && questions && resultDetail?.data?.answers && (
                  <Group w="50%" justify="space-between" align="start" mt={32}>
                    <Box>
                      {questions
                        .slice(0, questions.length / 2)
                        .map((question: Question, index: number) => (
                          <Group mb={8}>
                            <Text className="px-4 py-2 bg-cyan-200 text-cyan-700 rounded-full">
                              {question.order}
                            </Text>
                            <Text className="uppercase">{question.correct_answer} : </Text>
                            <Text className="uppercase">
                              {resultDetail.data.answers[index]?.option}
                            </Text>
                            {question.correct_answer ===
                            resultDetail.data.answers[index]?.option ? (
                              <Text c="green">
                                <FontAwesomeIcon icon={faCheck} />
                              </Text>
                            ) : (
                              <Text c="red">
                                <FontAwesomeIcon icon={faXmark} />
                              </Text>
                            )}
                          </Group>
                        ))}
                    </Box>
                    <Box>
                      {questions
                        .slice(questions.length / 2, questions.length)
                        .map((question: Question, index: number) => (
                          <Group mb={8}>
                            <Text className="px-4 py-2 bg-cyan-200 text-cyan-700 rounded-full">
                              {question.order}
                            </Text>
                            <Text className="uppercase">{question.correct_answer} : </Text>
                            <Text className="uppercase">
                              {resultDetail.data.answers[index]?.option}
                            </Text>
                            {!isEmpty(resultDetail.data.answers[index]?.option) &&
                            question.correct_answer === resultDetail.data.answers[index]?.option ? (
                              <Text c="green">
                                <FontAwesomeIcon icon={faCheck} />
                              </Text>
                            ) : (
                              <Text c="red">
                                <FontAwesomeIcon icon={faXmark} />
                              </Text>
                            )}
                          </Group>
                        ))}
                    </Box>
                  </Group>
                )}
              </Box>
              {isShowAnswer && <ResultDetail items={resultDetail?.data} />}
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default ResultExam;