import { PartialType } from "@nestjs/swagger";
import { ReviewDto } from "./create-review.dto";


export class EditReviewDto extends PartialType(ReviewDto){}