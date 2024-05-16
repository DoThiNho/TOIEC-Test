import Home from 'pages/home';
import SignIn from 'pages/login';
import SignUp from 'pages/register';
import Account from 'pages/account';
import Tests from 'pages/tests';
import TestDetail from 'pages/tests/detail';
import TestQuestions from 'pages/tests/questions';
import ResultExam from 'pages/tests/results';

const routes = [
  {
    path: '/login',
    component: SignIn
  },
  {
    path: '/register',
    component: SignUp
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/tests',
    component: Tests
  },
  {
    path: '/tests/:id',
    component: TestDetail
  },
  {
    path: '/tests/:id/:type',
    component: TestQuestions
  },
  {
    path: '/tests/:id/results/:idResult',
    component: ResultExam
  }
];

export default routes;
