import { isNotEmpty, IsNotEmpty } from "class-validator";

// dto를 통해서 하나하나 바꾸지않고 한번에 바꿀수 있게 만들어줌
export class CreateboardDto{
    @IsNotEmpty()
    title : string;

    @IsNotEmpty()
    description : string;
}