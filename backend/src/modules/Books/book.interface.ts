// export interface IBook {
//   title: string;
//   author: string;
//   genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
//   isbn: string;
//   description: string;
//   copies: number;
//   available: boolean;
//   image?: string; // ✅ optional image URL
// }


// import { IBook } from "../../../../shared/types/book";

// export type { IBook };
// For creating a book (no _id yet)
export interface ICreateBook {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  image: string;
}

// For a book that comes back from DB
export interface IBook extends ICreateBook {
  _id: string; // now always required
}