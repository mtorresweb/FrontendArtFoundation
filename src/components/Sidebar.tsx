/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import CustomDialog from "./CustomDialog";
import { useState } from "react";
import { AppState } from "@/context/appContext";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Sidebar = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { setUserState, updateChildren } = AppState();
  const { toast } = useToast();

  const { setChildState } = AppState();

  const removeStudent = (ID: number) => {
    fetch(`${import.meta.env.VITE_API_URL}child/remove/${ID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast({
          title: "Success",
          description: data.message,
          duration: 3000,
        });
        updateChildren();
      });
  };

  const getStudent = (ID: number) => {
    fetch(`${import.meta.env.VITE_API_URL}child/find/${ID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChildState(data.child);
        localStorage.setItem("child", JSON.stringify(data.child));
      });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline" size="icon">
          <Menu className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Query Options</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3">
          <Button variant={"ghost"}>
            <Link className="w-full h-full" to={"/register"}>
              Register
            </Link>
          </Button>
          <Button variant={"ghost"}>
            <Link className="w-full h-full" to={"/search"}>
              Search
            </Link>
          </Button>
          <CustomDialog
            open={openUpdate}
            buttonLabel="Update"
            title="Update Student"
            description="Change student information."
            to="/update"
            handleSubmit={getStudent}
            handleClose={() => setOpenUpdate(false)}
            handleOpen={() => setOpenUpdate(true)}
          />

          <CustomDialog
            handleSubmit={removeStudent}
            handleClose={() => setOpenDelete(false)}
            handleOpen={() => setOpenDelete(true)}
            open={openDelete}
            buttonLabel="Delete"
            title="Delete Student"
            description="Remove a student from the database."
          />
          <Button
            variant={"ghost"}
            onClick={() => {
              setUserState({
                ID: 0,
                name: "",
                email: "",
                token: "",
              });

              localStorage.removeItem("user");
            }}
          >
            <Link className="w-full h-full" to={"/auth"}>
              Log Out
            </Link>
          </Button>
        </div>

        <Toaster />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
