export type Student = {
  name: string;
  ID: string;
  birthDate: string;
  courses: string;
};

const data: Student[] = [
  {
    name: "Juan",
    ID: "1003456976",
    birthDate: new Date(2017, 1, 1).toDateString(),
    courses: ["singing", "violin"].toString(),
  },
  {
    name: "Maria",
    ID: "1007834542",
    birthDate: new Date(2015, 1, 1).toDateString(),
    courses: ["singing", "piano"].toString(),
  },
  {
    name: "Alexandra",
    ID: "1001357424",
    birthDate: new Date(2012, 7, 7).toDateString(),
    courses: ["guitar", "violin"].toString(),
  },
  {
    name: "Sofia",
    ID: "1003546854",
    birthDate: new Date(2016, 1, 7).toDateString(),
    courses: ["singing", "guitar"].toString(),
  },
  {
    name: "Pedro",
    ID: "1005834567",
    birthDate: new Date(2019, 2, 1).toDateString(),
    courses: ["piano", "guitar"].toString(),
  },
];

export default data;
