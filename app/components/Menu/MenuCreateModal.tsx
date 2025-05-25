import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import {
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { SelectExercise } from "~/db/schema";

export const schema = z.object({
  exerciseId: z
    .string({ required_error: "必須です" })
    .min(1, "種目を選択してください"),
  menuName: z
    .string({ required_error: "必須です" })
    .min(3, "3文字以上で入力してください"),
  sets: z
    .number({ required_error: "必須です" })
    .min(1, "1以上の数値を入力してください"),
  reps: z
    .number({ required_error: "必須です" })
    .min(1, "1以上の数値を入力してください"),
  time: z
    .number({ required_error: "必須です" })
    .min(1, "1以上の数値を入力してください")
    .optional(),
});

type MenuCreateModalProps = {
  exercises: SelectExercise[];
};

export const MenuCreateModal: React.FC<MenuCreateModalProps> = ({
  exercises,
}) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const fetcher = useFetcher();

  const selectedExerciseUnit = exercises.find(
    (e) => e.id === selectedExerciseId,
  )?.unit;

  const [form, fields] = useForm({
    lastResult: fetcher.data,
    constraint: getZodConstraint(schema),
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    defaultValue: {
      exerciseId: "",
      menuName: "",
      sets: 1,
      reps: 1,
      time: 1,
    },
  });

  // フォーム送信後のリセット処理
  useEffect(() => {
    console.log("fetcher.state:", fetcher.state);
    if (fetcher.state === "idle" && fetcher.data != null) {
      form.reset();
      setSelectedExerciseId("");
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          // モーダルが閉じられたときにフォームをリセット
          form.reset();
          setSelectedExerciseId("");
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="default" variant="outline">
          <PlusIcon size={8} aria-hidden="true" />
          新規作成
        </Button>
      </DialogTrigger>
      <DialogContent
        // モーダルの外側をクリックしても閉じないように設定
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="sm:max-w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>新しいメニューを作成</DialogTitle>
          <DialogDescription>
            作成するメニューの情報を入力してください
          </DialogDescription>
        </DialogHeader>

        {/* メニュー登録フォーム */}
        <fetcher.Form {...getFormProps(form)} method="POST">
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.exerciseId.id}>
                種目名<span className="text-destructive">*</span>
              </Label>
              <Select
                {...getSelectProps(fields.exerciseId)}
                defaultValue={fields.exerciseId.value || ""}
                value={selectedExerciseId}
                onValueChange={(value) => {
                  setSelectedExerciseId(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="ベースとなる種目を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div
                id={fields.exerciseId.errorId}
                className="text-destructive text-xs"
              >
                {fields.exerciseId.errors}
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.menuName.id}>
                メニュー名<span className="text-destructive">*</span>
              </Label>
              <Input
                {...getInputProps(fields.menuName, { type: "text" })}
                placeholder="お気に入りの名前を付けてください"
              />
              <div
                id={fields.menuName.errorId}
                className="text-destructive text-xs"
              >
                {fields.menuName.errors}
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor={fields.sets.id}>
                セット数<span className="text-destructive">*</span>
              </Label>
              <Input {...getInputProps(fields.sets, { type: "number" })} />
              <div
                id={fields.sets.errorId}
                className="text-destructive text-xs"
              >
                {fields.sets.errors}
              </div>
            </div>

            {selectedExerciseUnit === "rep" && (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor={fields.reps.id}>
                  レップ数<span className="text-destructive">*</span>
                </Label>
                <Input
                  {...getInputProps(fields.reps, { type: "number" })}
                  className="col-span-3"
                />
                <div
                  id={fields.reps.errorId}
                  className="text-destructive text-xs"
                >
                  {fields.reps.errors}
                </div>
              </div>
            )}
            {selectedExerciseUnit === "min" && (
              <div className="flex flex-col gap-y-2">
                <Label htmlFor={fields.time.id}>
                  時間 (分)<span className="text-destructive">*</span>
                </Label>
                <Input
                  {...getInputProps(fields.time, { type: "number" })}
                  className="col-span-3"
                />
                <div
                  id={fields.time.errorId}
                  className="text-destructive text-xs"
                >
                  {fields.time.errors}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" name="intent" value="create">
              作成する
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
};
