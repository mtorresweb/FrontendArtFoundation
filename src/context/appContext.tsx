/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { ReactNode, createContext, useContext, useState } from "react";

interface Parent {
  ID: number;
  name: string;
  email: string;
  address: string;
  maritalStatus: string;
  spouseID: number;
  spouseName: string;
  hasAJob: boolean;
  jobType: string;
  noJobDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Child {
  ID: string;
  name: string;
  birthDate: Date;
  courses: string[];
  authorization: boolean;
  parentID: string;
  Parent: Parent;
}

interface User {
  ID: number;
  name: string;
  email: string;
  token?: string;
}

type ContextType = {
  child: Child;
  setChildState: (child: Child) => void;
  user: User;
  setUserState: (user: User) => void;
  updateChildren: () => void;
  childrenUpdated: boolean;
};

export const AppContext = createContext<ContextType>({
  child: {
    ID: "8456686867",
    name: "azure",
    birthDate: new Date("2023-12-30T05:00:00.000Z"),
    courses: ["singing"],
    authorization: false,
    parentID: "2222222222",
    Parent: {
      ID: 2222222222,
      name: "rice",
      email: "rice6546@gmail.com",
      address: "calle 3",
      maritalStatus: "single",
      spouseID: 2222211121,
      spouseName: "null",
      hasAJob: true,
      jobType: "public",
      noJobDescription: "",
      createdAt: new Date("2023-11-24T00:29:48.014Z"),
      updatedAt: new Date("2023-11-24T00:29:48.014Z"),
    },
  },
  setChildState: () => {},
  user: {
    ID: 0,
    name: "",
    email: "",
  },
  setUserState: () => {},
  updateChildren: () => {},
  childrenUpdated: false,
});

type Props = {
  children: ReactNode;
};

const AppProvider = (props: Props) => {
  const [childrenUpdated, setChildrenUpdated] = useState(false);
  const updateChildren = () => {
    setChildrenUpdated(!childrenUpdated);
  };
  const [child, setChild] = useState<Child>({
    ID: "8456686867",
    name: "azure",
    birthDate: new Date("2023-12-30T05:00:00.000Z"),
    courses: ["singing"],
    authorization: false,
    parentID: "2222222222",
    Parent: {
      ID: 2222222222,
      name: "rice",
      email: "rice6546@gmail.com",
      address: "calle 3",
      maritalStatus: "single",
      spouseID: 4567657435,
      spouseName: "null",
      hasAJob: true,
      jobType: "public",
      noJobDescription: "",
      createdAt: new Date("2023-11-24T00:29:48.014Z"),
      updatedAt: new Date("2023-11-24T00:29:48.014Z"),
    },
  });

  const [user, setUser] = useState<User>({
    ID: 0,
    name: "",
    email: "",
  });

  const setUserState = (user: User) => {
    setUser(user);
  };

  const setChildState = (child: Child) => {
    setChild(child);
  };

  return (
    <AppContext.Provider
      value={{
        child,
        setChildState,
        user,
        setUserState,
        updateChildren,
        childrenUpdated,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
