import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatusValidationPipe } from 'src/pipes/board-status-validation.pipe';
import {  BoardStatus } from './board-status.enum'
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateboardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    // @Get('/')
    // getAllBoard() : Board[]{  // 리턴값 타입설정
    //     return this.boardsService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)   // 파이프를 통해서 유효성체크
    // createBoard(
    //     @Body() CreateboardDto : CreateboardDto,
    // ) : Board {
    //     return this.boardsService.createBoard(CreateboardDto);
    // }


    // 아이디를 통해서 게시물 가져오기
    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateboardDto: CreateboardDto) : Promise<Board>{
        return this.boardsService.createBoard(CreateboardDto);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id : string) : Board{
    //     return this.boardsService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoardById(@Param('id') id : string) : void {
    //     return this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(@Param('id') id : string, @Body('status', BoardStatusValidationPipe) status : BoardStatus){
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
    
}
