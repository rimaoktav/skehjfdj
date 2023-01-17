import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto {
    @IsString()
    name: string;
}