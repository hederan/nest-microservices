import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BooksService } from '../service/books.service';
import { CreateBookDto, UpdateBookDto } from '../interface/books.dto';

@Controller('books')
export class BooksController {
   constructor(private readonly booksService: BooksService) {}

   @Post()
   create(@Body() createBookDto: CreateBookDto) {
       return this.booksService.create(createBookDto);
   }

   @Get()
   findAll() {
       return this.booksService.findAll();
   }

   @Get(':id')
   findOne(@Param('id') id: string) {
       const book = this.booksService.findOne(id);
       if (!book) {
           return { message: 'Book not found' };
       }
       return book;
   }

   @Put(':id')
   update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
       const updatedBook = this.booksService.update(id, updateBookDto);
       if (!updatedBook) {
           return { message: 'Book not found' };
       }
       return updatedBook;
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
       const deleted = this.booksService.remove(id);
       if (!deleted) {
           return { message: 'Book not found' };
       }
       return { message: 'Book deleted successfully' };
   }
}
