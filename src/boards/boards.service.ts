import {  Injectable, NotFoundException } from '@nestjs/common';
import {  BoardStatus } from './board-status.enum';
import {v1 as uuid} from 'uuid';    // uuid의 v1버전을 uuid로 사용
import { CreateboardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';


@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository) 
        private boardRepository : BoardRepository,
    ){}

    

    // 아이디를 통해서 게시물 가져오기
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // 게시물 생성하기
    createBoard(createboardDto: CreateboardDto, user: User) :Promise<Board>{
        return this.boardRepository.createBoard(createboardDto, user);
    }

    // 게시물 삭제하기
    async deleteBoard(id: number, user:User): Promise<void>{
        const result = await this.boardRepository.delete({id, user});
        // 아이디가 없는경우
        // affected => 영향을 받은 개수
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // 게시물 수정하기
    async updateBoardStatus(id:number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // 모든 게시물 가져오기
    async getAllBoards(user: User): Promise<Board[]>{
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', {userId: user.id});

        const boards = await query.getMany();
        return boards;
    }


    // // 모든 board가져오기
    // getAllBoards(): Board[] {   // 리턴값 타입설정
    //     return this.boards;
    // };

    // // board 등록
    // createBoard(createboardDto : CreateboardDto){
    //     const {title, description} = createboardDto;
    //     const board : Board = {
    //         id : uuid(),
    //         title,  // title = title과 같음
    //         description,
    //         status : BoardStatus.PUBLIC,
    //     }

    //     this.boards.push(board)
    //     return board;
    // };

    // // id를 통해서 board 한개 가져오기
    // getBoardById(id : string) : Board{
    //     const found = this.boards.find((board)=>board.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    // // id를 통해서 board 한개 삭제
    // deleteBoard(id : string) : void{
    //     const found = this.getBoardById(id);
    //     // filter를 사용해서 같지 않은것만 남기고 같은 것은 삭제
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id : string, status : BoardStatus) : Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }


}
