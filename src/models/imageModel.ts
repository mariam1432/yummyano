export interface Image {
    imageUrl: string;
    type: "recipe" | "user";
    referenceId: string;
    createdAt: string;
}