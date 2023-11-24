/* eslint-disable @typescript-eslint/ban-types */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  buttonLabel: string;
  title: string;
  description: string;
  to?: string;
  handleSubmit: Function;
  open: boolean;
  handleClose: Function;
  handleOpen: Function;
};

const CustomDialog = (props: Props) => {
  const [ID, setID] = useState("");

  return (
    <Dialog
      open={props.open}
      onOpenChange={(open) => {
        if (!open) props.handleClose();
      }}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            props.handleOpen();
          }}
          variant="ghost"
        >
          {props.buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Student ID
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setID(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              props.handleSubmit(ID);
              props.handleClose();
            }}
            type="submit"
          >
            {props.to ? <Link to={`${props.to}`}>Confirm</Link> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
