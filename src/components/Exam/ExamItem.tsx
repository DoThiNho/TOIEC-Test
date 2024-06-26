import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Button, Card, CardProps, Group, Text, Title } from '@mantine/core';
import styled from '@emotion/styled';
import { ExamCardProps } from 'types';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)<CardProps>`
  cursor: pointer;
  border: 1px solid #e0e0e0;

  &:hover {
    transform: translateY(-2px);
    transition: all 0.4s;
  }
`;

const ExamItem = (props: ExamCardProps) => {
  const { exam } = props;

  const navigate = useNavigate();

  const handleShowDetail = () => {
    navigate(`/learner/tests/${exam.id}`);
  };

  return (
    <StyledCard shadow="md" bg="gray.0">
      <Title order={3}>
        {exam.book_title} - {exam.title}
      </Title>
      <Group display="block" c="grey">
        <Group>
          <FontAwesomeIcon icon={faClock} />
          <Text>120 minutes</Text>
        </Group>
        <Group my="xs">
          <Text>7 Part</Text>|<Text>120 minutes</Text>
        </Group>
        <Group c="blue">
          <Badge size="md">#Reading</Badge>
          <Badge size="md">#Listening</Badge>
        </Group>
      </Group>
      <Button
        color="blue"
        fullWidth
        mt="md"
        radius="md"
        variant="outline"
        onClick={handleShowDetail}>
        Detail
      </Button>
    </StyledCard>
  );
};

export default ExamItem;
