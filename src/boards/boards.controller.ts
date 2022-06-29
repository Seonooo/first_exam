import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatusValidationPipe } from 'src/pipes/board-status-validation.pipe';
import {  BoardStatus } from './board-status.enum'
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateboardDto } from './dto/create-board.dto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService){}

    // 해당 유저의 게시물만 가져오기
    @Get()
    getAllBoards(
        @GetUser() user: User,
    ): Promise<Board[]>{
        return this.boardsService.getAllBoards(user);
    }

    // 아이디를 통해서 게시물 가져오기
    @Get('/:id')
    getBoardById(@Param('id') id:number) : Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    // 게시물 등록하기
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateboardDto: CreateboardDto,
    @GetUser() user: User) : Promise<Board>{
        return this.boardsService.createBoard(CreateboardDto, user);
    }

    // 게시물 삭제하기
    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user:User,
    ):Promise<void>{
        return this.boardsService.deleteBoard(id, user);
    }

    // 게시물 수정하기
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id : number,
        @Body('status', BoardStatusValidationPipe) status : BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id, status);
    }

    // 모든 게시물 가져오기
    // @Get()
    // getAllBoards(): Promise<Board[]>{
    //     return this.boardsService.getAllBoards();
    // }

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
