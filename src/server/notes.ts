import { createServerFn } from "@tanstack/react-start";
import { eq, and, desc, inArray } from "drizzle-orm";

import { db } from "../db";
import { notes } from "../db/schema";