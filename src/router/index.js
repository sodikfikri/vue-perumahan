import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Recident from "../views/recident/Recident.vue";
import RecidentCreate from "../views/recident/Create.vue";
import RecidentUpdate from "../views/recident/Update.vue";
import House from "../views/house/House.vue";
import HouseCreate from "../views/house/Create.vue";
import HouseUpdate from "../views/house/Update.vue";
import HouseHistory from "../views/history/History.vue";
import Transaction from "../views/trx/PaymentList.vue";
import PaymentTrx from "../views/trx/PaymentTrx.vue";
import ExpendTrx from "../views/trx/ExpendTrx.vue";
// import Billing from "../views/Billing.vue";
// import VirtualReality from "../views/VirtualReality.vue";
// import RTL from "../views/Rtl.vue";
// import Profile from "../views/Profile.vue";
// import Signup from "../views/Signup.vue";
// import Signin from "../views/Signin.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/recident",
    name: "Recident",
    component: Recident,
  },
  {
    path: "/recident/create",
    name: "RecidentCreate",
    component: RecidentCreate,
  },
  {
    path: "/recident/update/:id",
    name: "RecidentUpdate",
    component: RecidentUpdate,
  },
  {
    path: "/house",
    name: "House",
    component: House,
  },
  {
    path: "/house/create",
    name: "HouseCreate",
    component: HouseCreate,
  },
  {
    path: "/house/update/:id",
    name: "HouseUpdate",
    component: HouseUpdate,
  },
  {
    path: "/house/history/:id",
    name: "HouseHistory",
    component: HouseHistory,
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
  },
  {
    path: "/payment/trx",
    name: "PaymentTrx",
    component: PaymentTrx,
  },
  {
    path: "/expend/trx",
    name: "ExpendTrx",
    component: ExpendTrx,
  },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   component: Billing,
  // },
  // {
  //   path: "/virtual-reality",
  //   name: "Virtual Reality",
  //   component: VirtualReality,
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL",
  //   component: RTL,
  // },
  // {
  //   path: "/profile",
  //   name: "Profile",
  //   component: Profile,
  // },
  // {
  //   path: "/signin",
  //   name: "Signin",
  //   component: Signin,
  // },
  // {
  //   path: "/signup",
  //   name: "Signup",
  //   component: Signup,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
