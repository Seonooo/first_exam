import { EntityRepository, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateboardDto } from "./dto/create-board.dto";

@EntityRepository(Board)
export class BoardRepository extends Repository<Board>{
    
    // 게시물 생성하기
    async createBoard(createboardDto: CreateboardDto) :Promise<Board>{
        const {title, description} = createboardDto;

        const board = this.create({
            title,
            description,
            status : BoardStatus.PUBLIC,
        });

        await this.save(board);
        return board;
    }
}