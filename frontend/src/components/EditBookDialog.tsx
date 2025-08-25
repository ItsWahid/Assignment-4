import { useState } from "react";
import { useUpdateBookMutation, type IBook } from "@/services/books";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import type { IBook } from "../../../shared/types/book";

export default function UpdateBookForm({ book }: { book: IBook }) {
  const [form, setForm] = useState<IBook>({ ...book });
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "copies" ? parseInt(value) : value, // convert number
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleGenreChange = (value: string) => {
    setForm({ ...form, genre: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(form).unwrap();
    navigate("/"); // go home after update
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500 hover:text-white text-white hover:bg-blue-600"
        >
          Edit Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Title */}
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Author */}
            <div className="grid gap-3">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={form.author}
                onChange={handleChange}
              />
            </div>

            {/* Genre */}
            <div className="grid gap-3">
              <Label>Genre</Label>
              <Select value={form.genre} onValueChange={handleGenreChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genre</SelectLabel>
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* ISBN */}
            <div className="grid gap-3">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={form.isbn}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Copies */}
            <div className="grid gap-3">
              <Label htmlFor="copies">Copies</Label>
              <Input
                id="copies"
                name="copies"
                type="number"
                value={form.copies}
                onChange={handleChange}
              />
            </div>

            {/* Available */}
            <div className="flex items-center">
              <Input
                type="checkbox"
                id="available"
                name="available"
                checked={form.available}
                onChange={handleCheckbox}
                className="mr-2"
              />
              <label htmlFor="available">Available</label>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
