import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../schema/books.schema'
import { CreateBookDto, UpdateBookDto } from '../interface/books.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    ) {}

    // Create a book
    async create(createBookDto: CreateBookDto): Promise<Book> {
        const newBook = new this.bookModel(createBookDto);
        return newBook.save();
    }

    // Get all books
    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    // Get a single book by ID
    async findOne(id: string): Promise<Book | null> {
        return this.bookModel.findById(id).exec();
    }

    // Update a book by ID
    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
        return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
    }

    // Delete a book by ID
    async remove(id: string): Promise<boolean> {
        const result = await this.bookModel.findByIdAndDelete(id).exec();
        return result != null;
    }
}
