import AboutPage from "../pages/AboutPage";
import DashboardPage from "../pages/DashboardPage";
import TransactionPage from "../pages/TransactionPage";
import NotFoundPage from "../pages/NotFoundPage";

export default {
  default: [
    {
      exact: true,
      path: "/",
      component: DashboardPage,
    },
    {
      exact: true,
      path: "/about",
      component: AboutPage,
    },
    {
      exact: true,
      path: "/transactions",
      component: TransactionPage,
    },
    {
      path: "*",
      component: NotFoundPage,
    },
  ],
};
