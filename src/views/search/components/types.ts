import { UnicornInfo } from "types/UnicornInfo";

export type SortType = "relevance" | "newest" | "oldest";

export interface ExtendedTag {
	tag: string;
	displayName?: string;
	numPosts: number;
	image?: string;
	emoji?: string;
}

export interface ExtendedUnicorn extends UnicornInfo {
	numPosts: number;
}
