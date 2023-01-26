import {
  Controller,
  Query,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dtos/create-book';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(@Query() query) {
    console.log("usaoooo")
    const { rows, count } = await this.bookService.getBooks(query);
    return {
      success: true,
      data: {
        books: rows,
        totalCount: count,
      },
      message: 'List of books fetch successfully',
    };
  }

  @Post('new')
  async createBook(@Body() body: CreateBookDto) {
    const book = await this.bookService.createBook(body);
    return {
      success: true,
      book: book,
      message: 'Book is created successfully',
    };
  }

  @Delete("delete/:id")
  async deleteBook(@Param('id') id: number) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException("Book doesn't exists");
    }
    //   const userData: TokenUserPayload = req.user;
    //   if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
    //     return res.status(400).json({
    //       success: false,
    //       message: 'Author Role can delete only own books',
    //     });
    //   }
    await this.bookService.deleteBook(id);
    return {
      success: true,
      message: 'Book is deleted successfully',
    };
  }

  @Put("update/:id")
  async updateBook(@Param('id') id: number, @Body() body: Partial<Book>) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException("Book doesn't exists");
    }
    //   const userData: TokenUserPayload = req.user;
    //   if (userData.role === RoleType.Author && book.userUid !== userData.uuid) {
    //     return res.status(400).json({
    //       success: false,
    //       message: 'Author Role can delete only own books',
    //     });
    //   }
    const updatedBook = await this.bookService.updateBook(id, body);
    return {
      success: true,
      data: {
        book: updatedBook,
      },
      message: 'Book is updated successfully',
    };
  }
}
