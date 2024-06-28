import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseModel } from 'src/models/response-model';
import { SupplierModel } from 'src/models/suplier-model';
import { Supplier } from 'src/schemas/supplier.schema';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private readonly supplierModel: Model<Supplier>,
  ) {}

  //create new supplier
  async createNewSupplier(
    userId: string,
    supplierDetails: SupplierModel,
  ): Promise<ResponseModel> {
    try {
      await this.supplierModel.create({
        user: userId,
        name: supplierDetails.name,
        phone: supplierDetails.phone,
        companyName: supplierDetails.companyName,
        address: supplierDetails.address,
      });
      return {
        message: 'New supplier created',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  //get all suppliers by user with search and pagination
  async getSuppliers(
    searchQuery?: string,
    page: number = 1,
    userId?: string,
  ): Promise<any> {
    const query: any = {};

    if (searchQuery) {
      const searchKeyRegex = new RegExp(searchQuery, 'i');
      query['name'] = searchKeyRegex;
    }

    if (userId) {
      query['user'] = userId;
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const suppliers = await this.supplierModel
      .find(query)
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await this.supplierModel.countDocuments(query);

    return {
      data: suppliers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  //delete a supplier
  async deleteSingleSupplier(supplierId: string): Promise<ResponseModel> {
    try {
      await this.supplierModel.findByIdAndDelete(supplierId);
      return {
        message: 'Supplier deleted',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
  }

  //get a single supplier
  async getSingleSupplier(suipplierId: string): Promise<SupplierModel> {
    try {
      return await this.supplierModel.findById(suipplierId);
    } catch (error) {
      console.log(error);
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
  }

  //update a supplier
  async updateSingleSupplier(
    supplierId: string,
    supplierDetails: SupplierModel,
  ): Promise<ResponseModel> {
    try {
      await this.supplierModel.findByIdAndUpdate(supplierId, supplierDetails, {
        new: true,
      });

      return {
        message: 'Supplier updated',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
  }

  //get all suppliers
  async getAllSuppliers(userId: string): Promise<SupplierModel[]> {
    try {
      return await this.supplierModel.find({
        user: userId,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }
  }
}
