import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';    // uuid의 v1버전을 uuid로 사용
import { CreateboardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = [];  // boards 변수 타입설정

    // 모든 board가져오기
    getAllBoards(): Board[] {   // 리턴값 타입설정
        return this.boards;
    };

    // board 등록
    createBoard(createboardDto : CreateboardDto){
        const {title, description} = createboardDto;
        const board : Board = {
            id : uuid(),
            title,  // title = title과 같음
            description,
            status : BoardStatus.PUBLIC,
        }

        this.boards.push(board)
        return board;
    };

    // id를 통해서 board 한개 가져오기
    getBoardById(id : string) : Board{
        const found = this.boards.find((board)=>board.id === id);

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // id를 통해서 board 한개 삭제
    deleteBoard(id : string) : void{
        const found = this.getBoardById(id);
        // filter를 사용해서 같지 않은것만 남기고 같은 것은 삭제
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id : string, status : BoardStatus) : Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }


}
