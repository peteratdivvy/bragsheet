import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import { TextField } from "./TextField";

const mapping = [
  [z.string(), TextField], // Title
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const Form = createTsForm(mapping);
