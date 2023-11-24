"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DateField, DatePicker } from "@/components/ui/date-picker";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { AppState } from "@/context/appContext";

const courses = [
  {
    id: "singing",
    label: "Singing",
  },
  {
    id: "guitar",
    label: "Guitar",
  },
  {
    id: "piano",
    label: "Piano",
  },
  {
    id: "trumpet",
    label: "Trumpet",
  },
  {
    id: "violin",
    label: "Violin",
  },
] as const;

const formSchema = z.object({
  name: z
    .string()
    .min(2, "name must be at least 2 characters long")
    .max(50, "name must have a maximum of 50 characters"),
  ID: z.coerce
    .number({ invalid_type_error: "ID must be a number" })
    .positive("ID must be a positive number"),
  address: z.string(),
  email: z.string().email("example@example.com"),
  maritalStatus: z.string(),
  spouseName: z.string().optional(),
  spouseID: z.coerce
    .number({ invalid_type_error: "ID must be a number" })
    .optional(),
  hasAJob: z.coerce.boolean(),
  jobType: z.string().optional(),
  noJobDescription: z.string().optional(),
  childName: z
    .string()
    .min(2, "name must be at least 2 characters long")
    .max(50, "name must have a maximum of 50 characters"),
  childID: z.coerce
    .number({ invalid_type_error: "ID must be a number" })
    .positive("ID must be a positive number"),
  childBirthDate: z.date(),
  authorization: z.coerce.boolean().optional(),
  courses: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one course.",
  }),
});

const Update = () => {
  const [maritalStatus, setMaritalStatus] = useState("");
  const [hasAJob, setHasAJob] = useState("true");
  const [childAge, setChildAge] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  const { child, setChildState } = AppState();

  useEffect(() => {
    setChildState(JSON.parse(localStorage.getItem("child") || "{}"));
    form.setValue("ID", child?.Parent.ID);
    form.setValue("name", child?.Parent.name);
    form.setValue("address", child?.Parent.address);
    form.setValue("email", child?.Parent.email);
    form.setValue("maritalStatus", child?.Parent.maritalStatus || "single");
    form.setValue("spouseName", child?.Parent.spouseName || "");
    form.setValue("spouseID", child?.Parent.spouseID);
    form.setValue("hasAJob", child?.Parent.hasAJob);
    form.setValue("jobType", child?.Parent.jobType || "private");
    form.setValue("noJobDescription", child?.Parent.noJobDescription);
    form.setValue("childName", child?.name);
    form.setValue("childID", parseInt(child?.ID));
    form.setValue("authorization", child?.authorization);
    form.setValue("courses", child?.courses);
    form.setValue("childBirthDate", new Date(child?.birthDate));
  }, [child]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courses: child?.courses,
      maritalStatus: child?.Parent.maritalStatus,
      hasAJob: child?.Parent.hasAJob,
      jobType: child?.Parent.jobType || "private",
      noJobDescription: child?.Parent.noJobDescription || "",
      authorization: child?.authorization,
      childID: parseInt(child.ID),
      childName: child?.name,
      spouseID: child.Parent.spouseID || 0,
      spouseName: child?.Parent.spouseName || "",
      email: child?.Parent.email,
      address: child?.Parent.address,
      ID: child?.Parent.ID,
      name: child?.Parent.name,
    },
  });

  useEffect(() => {
    console.log(form.formState.errors);
  }, [form.formState.errors]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`${import.meta.env.VITE_API_URL}parent/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          fetch(`${import.meta.env.VITE_API_URL}child/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID: values.childID,
              name: values.childName,
              authorization: values.authorization,
              birthDate: values.childBirthDate,
              parentID: values.ID,
              courses: values.courses,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status == "success") {
                localStorage.setItem("child", JSON.stringify(data.child));
                return toast({
                  title: "Success",
                  description: "Update completed successfully.",
                  duration: 3000,
                });
              }

              toast({
                title: "Error",
                description: data.message,
                duration: 3000,
              });
            })
            .catch(() => {
              toast({
                title: "Error",
                description: "Something went wrong.",
                duration: 3000,
              });
            });

          return toast({
            title: "Success",
            description: "Update completed successfully.",
            duration: 3000,
          });
        }

        toast({
          title: "Error",
          description: data.message,
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Something went wrong.",
          duration: 3000,
        });
      });
  }

  useEffect(() => {
    if (!hasAJob && childAge >= 6 && childAge <= 12) {
      toast({
        title: "Sponsor Opportunity",
        description: "Your child is a candidate to be sponsored.",
        variant: "default",
        duration: 5000,
      });
    }
  }, [hasAJob, childAge]);

  return (
    <div id="register" className="flex justify-center min-h-screen pt-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 border-0 border-secondary rounded-lg p-5 w-2/5 max-w-xl min-w-fit"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    placeholder="Enter your ID number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            defaultValue="single"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onValueChange={(value) => setMaritalStatus(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Marital status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="common-law marriage">
                        common-law marriage
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {["married", "common-law marriage"].includes(maritalStatus) && (
            <>
              <FormField
                control={form.control}
                name="spouseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spouse Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your spouse's name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spouseID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spouse ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your spouse's ID number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          <FormField
            control={form.control}
            name="hasAJob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Do you have a Job?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) => {
                      field.onChange(e);
                      setHasAJob(e);
                    }}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {hasAJob && (
            <FormField
              control={form.control}
              defaultValue="public"
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!hasAJob && (
            <FormField
              control={form.control}
              name="noJobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why don't you have a job?</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="childName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your child's name" {...field} />
                </FormControl>
                <FormDescription>
                  This is theirs public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Child ID</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    placeholder="Enter your child's ID number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="childBirthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Child birth date</FormLabel>
                <DatePicker
                  onChange={(e) => {
                    const date = new Date(e.year, e.month, e.day);
                    setDate(date);
                    field.onChange(date);
                    setChildAge(new Date().getFullYear() - date.getFullYear());
                  }}
                  label={`${child.birthDate}` || "Pick a date"}
                >
                  {!date ? null : <DateField />}
                </DatePicker>
                <FormDescription>
                  The date of birth is used to calculate the child's age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {!hasAJob && childAge >= 6 && childAge <= 12 && (
            <FormField
              control={form.control}
              name="authorization"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I authorize Art Foundation</FormLabel>
                    <FormDescription>
                      To publish data and photographs of the child on the page
                      to find someone to sponsor him.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="courses"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Courses</FormLabel>
                  <FormDescription>
                    Select the courses you want your child to take.
                  </FormDescription>
                </div>
                {courses.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="courses"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Toaster />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default Update;
